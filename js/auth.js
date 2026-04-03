// Handle tabs navigation
document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        document.querySelectorAll('.auth-section').forEach(sec => sec.style.display = 'none');
        document.getElementById(tab.getAttribute('data-target')).style.display = 'block';
    });
});

function toggleUserAuth(mode) {
    if (mode === 'signup') {
        document.getElementById('user-login-form').style.display = 'none';
        document.getElementById('user-signup-form').style.display = 'block';
    } else {
        document.getElementById('user-signup-form').style.display = 'none';
        document.getElementById('user-login-form').style.display = 'block';
    }
}

function handleUserSignup(e) {
    e.preventDefault();
    const name = document.getElementById('user-signup-name').value;
    const email = document.getElementById('user-signup-email').value;
    const city = document.getElementById('user-signup-city').value;
    const pwd = document.getElementById('user-signup-password').value;
    const confirm = document.getElementById('user-signup-confirm').value;

    if (pwd !== confirm) {
        alert("Passwords do not match!");
        return;
    }

    const users = getDB('users');
    if (users.find(u => u.email === email)) {
        alert("Email already registered!");
        return;
    }

    const newUser = {
        id: 'usr_' + generateId(),
        name,
        email,
        city,
        password: pwd,
        role: 'user'
    };

    users.push(newUser);
    setDB('users', users);
    showToast("Signup successful! Please login.");
    toggleUserAuth('login');
}

function handleUserLogin(e) {
    e.preventDefault();
    const email = document.getElementById('user-login-email').value;
    const pwd = document.getElementById('user-login-password').value;

    const users = getDB('users');
    const user = users.find(u => u.email === email && u.password === pwd);

    if (user) {
        setCurrentUser(user);
        window.location.href = 'user.html';
    } else {
        alert("Invalid email or password!");
    }
}

function handleAdminLogin(e) {
    e.preventDefault();
    const email = document.getElementById('admin-email').value;
    const pwd = document.getElementById('admin-password').value;
    const regno = document.getElementById('admin-regno').value;
    const city = document.getElementById('admin-city').value;

    const admins = getDB('admins');
    const admin = admins.find(a => a.email === email && a.password === pwd && a.regNo === regno && a.city === city);

    if (admin) {
        setCurrentUser(admin);
        window.location.href = 'admin.html';
    } else {
        alert("Invalid admin credentials!");
    }
}

function handleCollectorLogin(e) {
    e.preventDefault();
    const email = document.getElementById('collector-email').value;
    const pwd = document.getElementById('collector-password').value;
    const code = document.getElementById('collector-code').value;

    const collectors = getDB('collectors');
    const collector = collectors.find(c => c.email === email && c.password === pwd && c.code === code);

    if (collector) {
        setCurrentUser(collector);
        window.location.href = 'collector.html';
    } else {
        alert("Invalid collector credentials!");
    }
}

// Redirect if already logged in
window.onload = () => {
    const user = getCurrentUser();
    if (user) {
        if (user.role === 'admin') window.location.href = 'admin.html';
        else if (user.role === 'collector') window.location.href = 'collector.html';
        else window.location.href = 'user.html';
    }
};
