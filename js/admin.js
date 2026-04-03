const admin = checkAuth('admin');

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('admin-city-badge').textContent = admin.city;
    document.querySelectorAll('.admin-city-label').forEach(el => el.textContent = admin.city);
    loadComplaints();
});

function showAdminSection(section) {
    document.getElementById('complaints-section').style.display = 'none';
    document.getElementById('registerCol-section').style.display = 'none';
    document.getElementById('collectors-section').style.display = 'none';
    document.getElementById('colPerformance-section').style.display = 'none';
    document.getElementById('leave-section').style.display = 'none';

    document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');

    document.getElementById(`${section}-section`).style.display = 'block';

    if (section === 'complaints') {
        clearNotification('admin_complaints');
        loadComplaints();
    }
    if (section === 'collectors') loadCollectors();
    if (section === 'leave') {
        clearNotification('admin_leave');
        loadLeaveRequests();
    }
}

function loadComplaints() {
    const complaints = getDB('complaints').filter(c => c.city === admin.city);
    const tbody = document.querySelector('#admin-complaints-table tbody');
    tbody.innerHTML = '';

    if (complaints.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">No complaints in your city yet.</td></tr>';
        return;
    }

    complaints.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(c => {
        let statusClass = 'pending';
        if (c.status === 'Assigned') statusClass = 'assigned';
        if (c.status === 'In Progress') statusClass = 'progress';
        if (c.status === 'Completed') statusClass = 'completed';

        let actionBtn = '-';
        if (c.status === 'Pending') {
            actionBtn = `<button class="btn btn-primary" style="padding:0.5rem 1rem; width:auto; border-radius:8px;" onclick="openAssign('${c.id}')">Assign Task</button>`;
        }

        const imgStr = c.beforeImage ? `<img src="${c.beforeImage}" style="width:60px; height:60px; object-fit:cover; border-radius:8px;">` : 'No Image';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${imgStr}</td>
            <td>
                <strong style="display:block; margin-bottom:0.2rem;">${c.location}</strong>
                <span class="text-sm text-muted">ID: #${c.id.substring(5, 10).toUpperCase()}</span>
            </td>
            <td><span class="badge ${statusClass}">${c.status}</span></td>
            <td>${actionBtn}</td>
        `;
        tbody.appendChild(tr);
    });
}

function handleRegisterCollector(e) {
    e.preventDefault();
    const name = document.getElementById('reg-col-name').value;
    const email = document.getElementById('reg-col-email').value;
    const phone = document.getElementById('reg-col-phone').value;
    const shiftStart = document.getElementById('reg-col-time-start').value;
    const shiftEnd = document.getElementById('reg-col-time-end').value;
    const pwd = document.getElementById('reg-col-pwd').value;
    const confirm = document.getElementById('reg-col-confirm').value;

    if (pwd !== confirm) return alert("Passwords do not match!");

    const collectors = getDB('collectors');
    if (collectors.find(c => c.email === email)) return alert("Email already registered!");

    const cityAccro = admin.city.substring(0, 3).toUpperCase();
    const code = `COL-${cityAccro}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCollector = {
        id: 'col_' + generateId(),
        code,
        name,
        email,
        phone,
        city: admin.city,
        shiftStart,
        shiftEnd,
        password: pwd,
        taskStatus: 'Idle', // Can be Idle or Busy
        role: 'collector',
        createdBy: admin.email
    };

    collectors.push(newCollector);
    setDB('collectors', collectors);

    showToast(`Registered successfully! Unique Login Code: <strong>${code}</strong>`);
    e.target.reset();
}

function getSystemStatus(collector) {
    if (collector.taskStatus === 'Busy') return 'Busy';

    // Verify leave status first
    const leaveReqs = getDB('leaveRequests');
    const todayStr = new Date().toISOString().split('T')[0];
    const isOnLeave = leaveReqs.find(r => r.collectorId === collector.id && r.date === todayStr && r.status === 'Approved');
    if (isOnLeave) return 'On Leave';

    // Verify time status logic
    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();

    // Parse times
    if (!collector.shiftStart || !collector.shiftEnd) return 'Offline';

    const [startH, startM] = collector.shiftStart.split(':').map(Number);
    const startMins = startH * 60 + startM;

    const [endH, endM] = collector.shiftEnd.split(':').map(Number);
    let endMins = endH * 60 + endM;

    if (endMins < startMins) {
        // Handles overnight shift (e.g. 22:00 to 06:00)
        if (currentMins >= startMins || currentMins <= endMins) return 'Available';
    } else {
        if (currentMins >= startMins && currentMins <= endMins) return 'Available';
    }

    return 'Offline';
}

function loadCollectors() {
    const collectors = getDB('collectors').filter(c => c.city === admin.city);
    const tbody = document.querySelector('#admin-collectors-table tbody');
    tbody.innerHTML = '';

    if (collectors.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No collectors registered yet.</td></tr>';
        return;
    }

    collectors.forEach(c => {
        const sysStatus = getSystemStatus(c);
        let sc = 'offline';
        if (sysStatus === 'Available') sc = 'available';
        if (sysStatus === 'Busy') sc = 'busy';
        if (sysStatus === 'On Leave') sc = 'leave';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><code style="background:#f3f4f6; padding:0.2rem 0.4rem; border-radius:4px; color:var(--text-dark);">${c.code}</code></td>
            <td><strong>${c.name}</strong></td>
            <td>${c.shiftStart} - ${c.shiftEnd}</td>
            <td><span class="badge ${sc}">${sysStatus}</span></td>
            <td>
                <button class="btn" style="background:#dbeafe; color:#1d4ed8; padding:0.4rem 0.8rem; border-radius:6px; font-size:0.85rem;" onclick="openColPerformance('${c.id}', '${c.name}')">Performance</button>
                <button class="btn" style="background:#fef3c7; color:#b45309; padding:0.4rem 0.8rem; border-radius:6px; font-size:0.85rem;" onclick="openEditCollector('${c.id}')">Edit</button>
                <button class="btn" style="background:#fee2e2; color:#b91c1c; padding:0.4rem 0.8rem; border-radius:6px; font-size:0.85rem;" onclick="removeCollector('${c.id}')">Remove</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
    
function removeCollector(colId) {
    if (!confirm("Are you sure you want to remove this collector? This action cannot be undone.")) return;
    
    let collectors = getDB('collectors');
    collectors = collectors.filter(c => c.id !== colId);
    setDB('collectors', collectors);
    
    showToast("Collector removed from the system.");
    loadCollectors();
}

function openColPerformance(colId, colName) {
    document.getElementById('perf-col-name').innerText = colName;
    
    // Switch section
    document.getElementById('collectors-section').style.display = 'none';
    document.getElementById('colPerformance-section').style.display = 'block';
    
    const complaints = getDB('complaints').filter(c => c.collectorAssigned && c.collectorAssigned.id === colId && c.status === 'Completed');
    const feedbacks = getDB('feedback').filter(f => f.collectorId === colId);
    
    document.getElementById('perf-total-jobs').innerText = complaints.length;
    
    let totalRating = 0;
    feedbacks.forEach(f => totalRating += Number(f.rating));
    const avg = feedbacks.length > 0 ? (totalRating / feedbacks.length).toFixed(1) : '-';
    document.getElementById('perf-avg-rating').innerText = avg;
    
    const container = document.getElementById('perf-jobs-container');
    container.innerHTML = '';
    
    if (complaints.length === 0) {
        container.innerHTML = '<div class="text-muted text-center" style="padding:1rem;">No completed jobs yet.</div>';
        return;
    }
    
    complaints.forEach(c => {
        const review = feedbacks.find(f => f.complaintId === c.id);
        const reviewHtml = review ? `
            <div style="background:#fef3c7; padding:0.5rem; border-radius:6px; margin-top:0.5rem;">
                <strong>⭐ ${review.rating}/5</strong> - <em>"${review.comment}"</em>
            </div>
        ` : '<div class="text-xs mt-2 text-muted">No review provided</div>';
        
        const div = document.createElement('div');
        div.style.border = '1px solid var(--border-light)';
        div.style.padding = '1rem';
        div.style.borderRadius = '8px';
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between;">
                <strong>${c.location} (#${c.id.substring(5, 10).toUpperCase()})</strong>
                <span class="text-xs text-muted">${formatDate(c.date)}</span>
            </div>
            ${reviewHtml}
        `;
        container.appendChild(div);
    });
}

function openAssign(compId) {
    const collectors = getDB('collectors').filter(c => c.city === admin.city);
    const select = document.getElementById('assign-collector-select');
    select.innerHTML = '<option value="">Select Collector</option>';

    let availableCount = 0;
    collectors.forEach(c => {
        if (getSystemStatus(c) === 'Available') {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.textContent = `${c.name} (${c.code})`;
            select.appendChild(opt);
            availableCount++;
        }
    });

    if (availableCount === 0) {
        alert("No AVAILABLE collectors in your city! They are either offline or busy.");
        return;
    }

    document.getElementById('assign-comp-id').value = compId;
    document.getElementById('assign-task-id').innerText = compId.substring(5, 10).toUpperCase();
    document.getElementById('assign-modal').style.display = 'flex';
}

function closeAssign() {
    document.getElementById('assign-modal').style.display = 'none';
}

function submitAssign(e) {
    e.preventDefault();
    const compId = document.getElementById('assign-comp-id').value;
    const colId = document.getElementById('assign-collector-select').value;
    const eta = document.getElementById('assign-eta').value;

    const complaints = getDB('complaints');
    const collectors = getDB('collectors');

    const complaint = complaints.find(c => c.id === compId);
    const collector = collectors.find(c => c.id === colId);

    if (complaint && collector) {
        complaint.status = 'Assigned';
        complaint.collectorAssigned = { id: collector.id, name: collector.name, code: collector.code };
        complaint.estimatedTime = eta;

        collector.taskStatus = 'Busy';

        setDB('complaints', complaints);
        setDB('collectors', collectors);

        showToast("Task dispatched with estimated time restrictions!");
        
        // Trigger notifications
        addNotification(`collector_tasks_${collector.id}`);
        addNotification(`user_track_${complaint.userId}`);

        closeAssign();
        loadComplaints();
    }
}

// Edit Collector Logic
function openEditCollector(colId) {
    const col = getDB('collectors').find(c => c.id === colId);
    if (!col) return;

    document.getElementById('edit-col-id').value = col.id;
    document.getElementById('edit-col-email').value = col.email;
    document.getElementById('edit-col-phone').value = col.phone;
    document.getElementById('edit-col-time-start').value = col.shiftStart;
    document.getElementById('edit-col-time-end').value = col.shiftEnd;

    document.getElementById('edit-col-modal').style.display = 'flex';
}

function closeEditCollector() {
    document.getElementById('edit-col-modal').style.display = 'none';
}

function submitEditCollector(e) {
    e.preventDefault();
    const colId = document.getElementById('edit-col-id').value;
    const email = document.getElementById('edit-col-email').value;
    const phone = document.getElementById('edit-col-phone').value;
    const shiftStart = document.getElementById('edit-col-time-start').value;
    const shiftEnd = document.getElementById('edit-col-time-end').value;

    let collectors = getDB('collectors');
    const idx = collectors.findIndex(c => c.id === colId);
    if (idx > -1) {
        collectors[idx].email = email;
        collectors[idx].phone = phone;
        collectors[idx].shiftStart = shiftStart;
        collectors[idx].shiftEnd = shiftEnd;
        setDB('collectors', collectors);
        showToast("Collector details updated successfully.");
        closeEditCollector();
        loadCollectors();
    }
}

// Leave Management
function loadLeaveRequests() {
    const allReqs = getDB('leaveRequests');
    // Filter reqs for collectors in this admin's city
    const collectorsInCity = getDB('collectors').filter(c => c.city === admin.city).map(c => c.id);
    const leaves = allReqs.filter(r => collectorsInCity.includes(r.collectorId));
    
    const tbody = document.querySelector('#admin-leave-table tbody');
    tbody.innerHTML = '';

    if (leaves.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No leave requests found.</td></tr>';
        return;
    }

    leaves.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(r => {
        let sc = 'pending';
        if (r.status === 'Approved') sc = 'completed';
        else if (r.status === 'Rejected') sc = 'leave';

        let actionHtml = '-';
        if (r.status === 'Pending') {
            actionHtml = `
                <button class="btn" style="background:#dcfce7; color:#15803d; padding:0.3rem 0.6rem; font-size:0.8rem;" onclick="processLeave('${r.id}', 'Approved')">Approve</button>
                <button class="btn" style="background:#fee2e2; color:#b91c1c; padding:0.3rem 0.6rem; font-size:0.8rem; margin-left:0.5rem;" onclick="processLeave('${r.id}', 'Rejected')">Reject</button>
            `;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><code style="background:#f3f4f6; padding:0.2rem 0.4rem; border-radius:4px;">${r.collectorCode}</code></td>
            <td><strong>${r.collectorName}</strong></td>
            <td>${r.date}</td>
            <td>${r.reason}</td>
            <td><span class="badge ${sc}">${r.status}</span></td>
            <td>${actionHtml}</td>
        `;
        tbody.appendChild(tr);
    });
}

function processLeave(reqId, newStatus) {
    let reqs = getDB('leaveRequests');
    const idx = reqs.findIndex(r => r.id === reqId);
    if (idx > -1) {
        reqs[idx].status = newStatus;
        setDB('leaveRequests', reqs);
        showToast(`Leave request ${newStatus.toLowerCase()}.`);
        loadLeaveRequests();
    }
}
