const user = checkAuth('user');

function showSection(section) {
    document.getElementById('report-section').style.display = 'none';
    document.getElementById('track-section').style.display = 'none';
    document.getElementById('profile-section').style.display = 'none';
    
    document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');

    if (section === 'report') {
        document.getElementById('report-section').style.display = 'block';
    } else if (section === 'track') {
        clearNotification(`user_track_${user.id}`);
        document.getElementById('track-section').style.display = 'block';
        loadComplaints();
        stopCamera();
    } else if (section === 'profile') {
        document.getElementById('profile-section').style.display = 'block';
        document.getElementById('profile-name').innerText = user.name || 'N/A';
        document.getElementById('profile-email').innerText = user.email || 'N/A';
        document.getElementById('profile-city').innerText = user.city || 'N/A';
        stopCamera();
    }
}

// Camera controls
async function initCam() {
    document.getElementById('video-preview').style.display = 'none';
    document.getElementById('video-stream').style.display = 'block';
    const success = await startCamera('video-stream');
    if (success) {
        document.getElementById('start-cam-btn').style.display = 'none';
        document.getElementById('capture-cam-btn').style.display = 'inline-block';
        document.getElementById('retake-cam-btn').style.display = 'none';
    }
}

function takePhoto() {
    const base64 = captureSnapshot('video-stream');
    document.getElementById('captured-image-base64').value = base64;

    stopCamera();

    const preview = document.getElementById('video-preview');
    preview.src = base64;
    preview.style.display = 'block';
    document.getElementById('video-stream').style.display = 'none';

    document.getElementById('capture-cam-btn').style.display = 'none';
    document.getElementById('retake-cam-btn').style.display = 'inline-block';
}

function retakePhoto() {
    initCam();
}

async function handleReportComplaint(e) {
    e.preventDefault();
    const location = document.getElementById('comp-location').value;
    const desc = document.getElementById('comp-desc').value;
    const imgBase64 = document.getElementById('captured-image-base64').value;

    if (!imgBase64) return alert("You must capture a live photo of the waste.");

    const complaint = {
        id: 'comp_' + generateId(),
        userId: user.id,
        userEmail: user.email,
        city: user.city,
        location,
        description: desc,
        beforeImage: imgBase64,
        afterImage: null,
        status: 'Pending', /* Pending, Assigned, In Progress, Completed */
        collectorAssigned: null,
        estimatedTime: null,
        date: new Date().toISOString()
    };

    const complaints = getDB('complaints');
    complaints.push(complaint);
    setDB('complaints', complaints);
    
    // Trigger notification to admin
    addNotification('admin_complaints');

    showToast("Report submitted successfully!");
    e.target.reset();
    document.getElementById('captured-image-base64').value = '';
    document.getElementById('video-preview').style.display = 'none';
    document.getElementById('video-stream').style.display = 'block';
    document.getElementById('start-cam-btn').style.display = 'inline-block';
    document.getElementById('retake-cam-btn').style.display = 'none';
}

function loadComplaints() {
    const complaints = getDB('complaints').filter(c => c.userId === user.id);
    const container = document.getElementById('complaints-list');
    container.innerHTML = '';

    if (complaints.length === 0) {
        container.innerHTML = '<div class="card text-center text-muted">No reports found. You are keeping the city clean!</div>';
        return;
    }

    complaints.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(c => {
        let statusClass = 'pending';
        if (c.status === 'Assigned') statusClass = 'assigned';
        if (c.status === 'In Progress') statusClass = 'progress';
        if (c.status === 'Completed') statusClass = 'completed';

        let actionArea = '';
        if (c.status === 'Assigned' || c.status === 'In Progress') {
            const eta = c.estimatedTime ? `<p class="text-sm mt-2">⏳ <strong>ETA:</strong> ${c.estimatedTime}</p>` : '';
            actionArea = `
                <div style="margin-top:1rem;">
                    <p class="text-sm text-muted" style="margin-bottom:0.5rem">📸 Reported Image</p>
                    <img src="${c.beforeImage}" style="width:100%; max-width:250px; aspect-ratio:4/3; object-fit:cover; border-radius:12px; border:2px solid var(--border-light);">
                </div>
                ${eta}
                <button class="btn btn-primary mt-4" style="width: auto;" onclick="openTracking('${c.estimatedTime}', '${c.status}')" data-i18n="track_btn">📍 Live Track Collector</button>
            `;
        } else if (c.status === 'Completed') {
            const feedbacks = getDB('feedback');
            const hasFeedback = feedbacks.some(f => f.complaintId === c.id);

            let reviewBtn = '';
            let imagesHtml = '';

            if (c.afterImage) {
                imagesHtml = `
                    <div style="margin-top:1.5rem; display:flex; flex-wrap:wrap; gap: 1rem;">
                        <div style="flex:1; min-width:150px;">
                            <p class="text-sm text-muted" style="margin-bottom:0.5rem">📸 Before</p>
                            <img src="${c.beforeImage}" style="width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:12px; border:2px solid var(--border-light);">
                        </div>
                        <div style="flex:1; min-width:150px;">
                            <p class="text-sm text-muted" style="margin-bottom:0.5rem">✨ After Cleaning</p>
                            <img src="${c.afterImage}" style="width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:12px; border:2px solid var(--primary);">
                        </div>
                    </div>
                `;
            } else {
                imagesHtml = `
                    <div style="margin-top:1rem;">
                        <p class="text-sm text-muted" style="margin-bottom:0.5rem">📸 Reported Image</p>
                        <img src="${c.beforeImage}" style="width:100%; max-width:250px; aspect-ratio:4/3; object-fit:cover; border-radius:12px; border:2px solid var(--border-light);">
                    </div>
                `;
            }

            if (!hasFeedback) {
                reviewBtn = `<button class="btn btn-primary mt-4" style="width: auto;" onclick="openReview('${c.id}', '${c.collectorAssigned.id}')">⭐ Rate Collector</button>`;
            } else {
                reviewBtn = '<div class="badge completed mt-4">⭐ Review Submitted</div>';
            }

            actionArea = imagesHtml + reviewBtn;
        } else {
            // Pending State
            actionArea = `
                <div style="margin-top:1rem;">
                    <p class="text-sm text-muted" style="margin-bottom:0.5rem">📸 Reported Image</p>
                    <img src="${c.beforeImage}" style="width:100%; max-width:250px; aspect-ratio:4/3; object-fit:cover; border-radius:12px; border:2px solid var(--border-light);">
                </div>
            `;
        }

        const colInfo = c.collectorAssigned ? `Assigned to: ${c.collectorAssigned.name}` : `Searching for collectors...`;

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem;">
                <div>
                    <h4 style="margin-bottom:0.25rem;">${c.location}</h4>
                    <p class="text-sm text-muted">ID: #${c.id.substring(5, 10).toUpperCase()} • ${formatDate(c.date)}</p>
                    <p class="text-sm mt-2">${c.description}</p>
                    <p class="text-sm mt-2" style="font-weight:600; color:var(--text-dark)">🚗 ${colInfo}</p>
                    ${actionArea}
                </div>
                <div>
                    <span class="badge ${statusClass}">${c.status}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function openReview(compId, colId) {
    document.getElementById('rev-comp-id').value = compId;
    document.getElementById('rev-col-id').value = colId;
    document.getElementById('review-modal').style.display = 'flex';
}

function closeReview() { document.getElementById('review-modal').style.display = 'none'; }

function submitReview(e) {
    e.preventDefault();
    const feedback = {
        id: 'feed_' + generateId(),
        complaintId: document.getElementById('rev-comp-id').value,
        collectorId: document.getElementById('rev-col-id').value,
        userId: user.id,
        rating: document.getElementById('rev-rating').value,
        comment: document.getElementById('rev-comment').value,
        date: new Date().toISOString()
    };

    const feedbacks = getDB('feedback');
    feedbacks.push(feedback);
    setDB('feedback', feedbacks);

    showToast("Feedback submitted! The collector will see your review.");
    closeReview();
    loadComplaints();
}

let simulationInterval;
function openTracking(eta, status) {
    document.getElementById('tracking-modal').style.display = 'flex';
    document.getElementById('track-eta').innerText = eta || "Unknown";

    const marker = document.getElementById('sim-marker');
    const fill = document.getElementById('sim-truck-fill');
    const distanceText = document.getElementById('track-distance-text');
    
    document.getElementById('stage-assigned').className = 'truck-stage active';
    document.getElementById('stage-progress').className = 'truck-stage';
    document.getElementById('stage-completed').className = 'truck-stage';
    
    let targetProgress = 10;
    
    if (status === 'Assigned') {
        targetProgress = 10;
        distanceText.innerText = "Collector has been assigned and is getting ready.";
    } else if (status === 'In Progress') {
        targetProgress = 50;
        document.getElementById('stage-progress').classList.add('active');
        distanceText.innerText = "Collector is currently on the way or cleaning.";
    } else if (status === 'Completed') {
        targetProgress = 90;
        document.getElementById('stage-progress').classList.add('active');
        document.getElementById('stage-completed').classList.add('active');
        distanceText.innerText = "Task is completed!";
    }

    fill.style.width = `10%`;
    marker.style.left = `10%`;
    
    // Animate to target status
    setTimeout(() => {
        fill.style.width = `${targetProgress}%`;
        marker.style.left = `${targetProgress}%`;
    }, 100);
}

function closeTracking() {
    document.getElementById('tracking-modal').style.display = 'none';
    if (simulationInterval) clearInterval(simulationInterval);
}
