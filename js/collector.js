const collector = checkAuth('collector');

document.addEventListener('DOMContentLoaded', () => {
    updateBadge();

    // Re-check status every minute
    setInterval(updateBadge, 60000);

    loadTasks();
    loadPerformance();
});

function getSystemStatus(col) {
    if (col.taskStatus === 'Busy') return 'Busy';

    // Verify leave status first
    const leaveReqs = getDB('leaveRequests');
    const todayStr = new Date().toISOString().split('T')[0];
    const isOnLeave = leaveReqs.find(r => r.collectorId === col.id && r.date === todayStr && r.status === 'Approved');
    if (isOnLeave) return 'On Leave';

    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();

    if (!col.shiftStart || !col.shiftEnd) return 'Offline';

    const [startH, startM] = col.shiftStart.split(':').map(Number);
    const startMins = startH * 60 + startM;
    const [endH, endM] = col.shiftEnd.split(':').map(Number);
    let endMins = endH * 60 + endM;

    if (endMins < startMins) {
        if (currentMins >= startMins || currentMins <= endMins) return 'Available';
    } else {
        if (currentMins >= startMins && currentMins <= endMins) return 'Available';
    }
    return 'Offline';
}

function showColSection(section) {
    document.getElementById('tasks-section').style.display = 'none';
    document.getElementById('performance-section').style.display = 'none';
    document.getElementById('calendar-section').style.display = 'none';
    document.getElementById('leave-section').style.display = 'none';

    document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');

    document.getElementById(`${section}-section`).style.display = 'block';

    if (section === 'tasks') {
        clearNotification(`collector_tasks_${collector.id}`);
        loadTasks();
    }
    if (section === 'performance') loadPerformance();
    if (section === 'calendar') loadCalendar();
    if (section === 'leave') loadLeaveHistory();
}

function updateBadge() {
    const collectors = getDB('collectors');
    const me = collectors.find(c => c.id === collector.id);
    if (me) {
        const sysStatus = getSystemStatus(me);
        const span = document.getElementById('col-status-badge');
        span.textContent = sysStatus;

        let sc = 'offline';
        if (sysStatus === 'Available') sc = 'available';
        if (sysStatus === 'Busy') sc = 'busy';
        if (sysStatus === 'On Leave') sc = 'leave';
        span.className = `badge ${sc}`;
    }
}

function loadTasks() {
    const complaints = getDB('complaints').filter(c =>
        c.collectorAssigned &&
        c.collectorAssigned.id === collector.id &&
        (c.status === 'Assigned' || c.status === 'In Progress')
    );

    const container = document.getElementById('tasks-container');
    container.innerHTML = '';

    if (complaints.length === 0) {
        container.innerHTML = '<div class="card text-center text-muted">No active tasks assigned. Take a break!</div>';
        return;
    }

    complaints.forEach(c => {
        let actionBtn = '';
        if (c.status === 'Assigned') {
            actionBtn = `<button class="btn btn-primary" style="background:var(--status-progress); width:auto;" onclick="markInProgress('${c.id}')">🚚 Start Work (Mark In Progress)</button>`;
        } else if (c.status === 'In Progress') {
            actionBtn = `<button class="btn btn-primary" style="background:var(--status-completed); width:auto;" onclick="openCompleteModal('${c.id}')">✅ Finish Work (Capture Photo)</button>`;
        }

        const div = document.createElement('div');
        div.style.border = '1px solid var(--border-light)';
        div.style.padding = '1.5rem';
        div.style.borderRadius = 'var(--radius)';
        div.style.background = '#f9fafb';
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.gap = '1rem';

        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div>
                    <h4 style="margin-bottom:0.5rem; color:var(--text-dark)">Task ID: #${c.id.substring(5, 10).toUpperCase()}</h4>
                    <p class="text-sm">📍 <strong>Location:</strong> ${c.location}</p>
                    <p class="text-sm">📝 <strong>Description:</strong> ${c.description}</p>
                    <p class="text-sm" style="color:var(--primary-dark)">⏳ <strong>Estimated Completion Needed:</strong> ${c.estimatedTime || 'N/A'}</p>
                </div>
                <span class="badge ${c.status === 'Assigned' ? 'assigned' : 'progress'}">${c.status}</span>
            </div>
            
            <div style="margin-top:0.5rem;">
                <p class="text-sm text-muted" style="margin-bottom: 0.5rem;">Reported Live Image:</p>
                <img src="${c.beforeImage}" style="width:100%; max-width:300px; height:auto; object-fit:cover; border-radius:12px; border:2px solid var(--border-light);">
            </div>

            <div style="margin-top:0.5rem;">
                ${actionBtn}
            </div>
        `;
        container.appendChild(div);
    });
}

function loadPerformance() {
    const complaints = getDB('complaints').filter(c => c.collectorAssigned && c.collectorAssigned.id === collector.id && c.status === 'Completed');
    const feedbacks = getDB('feedback').filter(f => f.collectorId === collector.id);
    
    document.getElementById('col-total-jobs').innerText = complaints.length;
    
    let totalRating = 0;
    feedbacks.forEach(f => totalRating += Number(f.rating));
    const avg = feedbacks.length > 0 ? (totalRating / feedbacks.length).toFixed(1) : '-';
    document.getElementById('col-avg-rating').innerText = avg;
    
    const container = document.getElementById('perf-container');
    container.innerHTML = '';
    
    if (complaints.length === 0) {
        container.innerHTML = '<div class="card text-center text-muted">No completed jobs yet. Keep up the good work!</div>';
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
        div.style.background = 'var(--surface-light)';
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

function markInProgress(compId) {
    const complaints = getDB('complaints');
    const c = complaints.find(c => c.id === compId);
    if (c) {
        c.status = 'In Progress';
        setDB('complaints', complaints);
        showToast("Task status updated. On your way!");
        addNotification(`user_track_${c.userId}`);
        loadTasks();
    }
}

async function initColCam() {
    document.getElementById('col-video-preview').style.display = 'none';
    document.getElementById('col-video-stream').style.display = 'block';
    const success = await startCamera('col-video-stream');
    if (success) {
        document.getElementById('col-start-cam-btn').style.display = 'none';
        document.getElementById('col-capture-cam-btn').style.display = 'inline-block';
        document.getElementById('col-retake-cam-btn').style.display = 'none';
    }
}

function takeColPhoto() {
    const base64 = captureSnapshot('col-video-stream');
    document.getElementById('col-captured-image-base64').value = base64;

    stopCamera();

    const preview = document.getElementById('col-video-preview');
    preview.src = base64;
    preview.style.display = 'block';
    document.getElementById('col-video-stream').style.display = 'none';

    document.getElementById('col-capture-cam-btn').style.display = 'none';
    document.getElementById('col-retake-cam-btn').style.display = 'inline-block';
}

function retakeColPhoto() {
    initColCam();
}

function openCompleteModal(compId) {
    document.getElementById('complete-comp-id').value = compId;
    document.getElementById('complete-modal').style.display = 'flex';
}

function closeCompleteModal() {
    stopCamera();
    document.getElementById('complete-modal').style.display = 'none';
}

async function submitTaskComplete(e) {
    e.preventDefault();
    const compId = document.getElementById('complete-comp-id').value;
    const imgBase64 = document.getElementById('col-captured-image-base64').value;

    if (!imgBase64) return alert("You must capture an 'after' photo.");

    const complaints = getDB('complaints');
    const collectors = getDB('collectors');

    const c = complaints.find(c => c.id === compId);
    const col = collectors.find(c => c.id === collector.id);

    if (c && col) {
        c.status = 'Completed';
        c.afterImage = imgBase64;

        col.taskStatus = 'Idle'; // Allow time-base checking again

        setDB('complaints', complaints);
        setDB('collectors', collectors);

        showToast("Great job! Task marked as Completed.");
        
        // Notify the user who reported the issue
        addNotification(`user_track_${c.userId}`);
        
        e.target.reset();
        closeCompleteModal();
        updateBadge();
        loadTasks();
    }
}

// Attendance Calendar Logic
function loadCalendar() {
    const grid = document.getElementById('col-calendar-grid');
    grid.innerHTML = '';
    
    // Day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(d => {
        const div = document.createElement('div');
        div.style.fontWeight = 'bold';
        div.style.textAlign = 'center';
        div.style.padding = '0.5rem';
        div.textContent = d;
        grid.appendChild(div);
    });

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const leaveReqs = getDB('leaveRequests').filter(r => r.collectorId === collector.id && r.status === 'Approved');
    const myLeaves = leaveReqs.map(r => r.date); // array of YYYY-MM-DD

    // Empty cells for first week
    for (let i = 0; i < firstDay; i++) {
        const div = document.createElement('div');
        grid.appendChild(div);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        const isLeave = myLeaves.includes(dateStr);
        let bgColor = 'var(--status-available)'; // Green by default
        if (isLeave) bgColor = 'var(--status-leave)';

        const div = document.createElement('div');
        div.style.backgroundColor = bgColor;
        div.style.color = '#fff';
        div.style.textAlign = 'center';
        div.style.padding = '1rem';
        div.style.borderRadius = '8px';
        div.textContent = i;
        grid.appendChild(div);
    }
}

// Leave Application Logic
function submitLeaveRequest(e) {
    e.preventDefault();
    const date = document.getElementById('leave-date').value;
    const reason = document.getElementById('leave-reason').value;

    const reqs = getDB('leaveRequests');
    if (reqs.find(r => r.collectorId === collector.id && r.date === date)) {
        alert("You already have a leave request for this date.");
        return;
    }

    const req = {
        id: 'leave_' + generateId(),
        collectorId: collector.id,
        collectorCode: collector.code,
        collectorName: collector.name,
        date: date,
        reason: reason,
        status: 'Pending',
        appliedOn: new Date().toISOString()
    };

    reqs.push(req);
    setDB('leaveRequests', reqs);
    
    // Notify admins of a new leave request
    addNotification('admin_leave');
    
    showToast("Leave request submitted successfully.");
    e.target.reset();
    loadLeaveHistory();
}

function loadLeaveHistory() {
    const container = document.getElementById('leave-history-container');
    container.innerHTML = '';

    const reqs = getDB('leaveRequests').filter(r => r.collectorId === collector.id);
    reqs.sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn)).forEach(r => {
        let sc = 'pending';
        if (r.status === 'Approved') sc = 'completed';
        if (r.status === 'Rejected') sc = 'leave';

        const div = document.createElement('div');
        div.style.border = '1px solid var(--border-light)';
        div.style.padding = '1rem';
        div.style.borderRadius = '8px';
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between;">
                <strong>Date: ${r.date}</strong>
                <span class="badge ${sc}">${r.status}</span>
            </div>
            <p class="text-sm mt-2 text-muted">Reason: ${r.reason}</p>
        `;
        container.appendChild(div);
    });

    if (reqs.length === 0) {
        container.innerHTML = '<div class="text-muted text-center" style="padding:1rem;">No leave requests found.</div>';
    }
}
