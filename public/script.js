// Global variables
let currentUser = null;
const API_BASE_URL = 'http://localhost:3000/api';

// DOM Elements
const authSection = document.getElementById('auth-section');
const dashboardSection = document.getElementById('dashboard-section');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
        loadUserData();
    }
    
    // Add event listeners
    loginForm.addEventListener('submit', handleLogin);
    signupForm.addEventListener('submit', handleSignup);
});

// Tab switching functionality
function showTab(tabName) {
    // Hide all forms
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => form.classList.remove('active'));
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected form and activate tab
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        // For demo purposes, we'll use a simple check
        // In a real app, you'd validate against the backend
        if (email && password) {
            // Simulate API call
            const response = await fetch(`${API_BASE_URL}/interns`);
            const interns = await response.json();
            
            const user = interns.find(intern => intern.email === email);
            
            if (user) {
                currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(user));
                showDashboard();
                loadUserData();
                showMessage('Login successful!', 'success');
            } else {
                showMessage('Invalid credentials. Please try again.', 'error');
            }
        } else {
            showMessage('Please fill in all fields.', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage('Login failed. Please try again.', 'error');
    }
}

// Handle signup form submission
async function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const referralCode = document.getElementById('signupReferralCode').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/interns`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                referralCode
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showMessage('Account created successfully! Please login.', 'success');
            // Clear form
            signupForm.reset();
            // Switch to login tab
            showTab('login');
        } else {
            showMessage(data.message || 'Signup failed. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Signup error:', error);
        showMessage('Signup failed. Please try again.', 'error');
    }
}

// Load demo data (no authentication required)
async function loadDemoData() {
    try {
        const response = await fetch(`${API_BASE_URL}/demo-data`);
        const demoData = await response.json();
        
        currentUser = {
            name: demoData.name,
            referralCode: demoData.referralCode,
            donationsRaised: demoData.donationsRaised,
            rewards: demoData.rewards
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showDashboard();
        loadUserData();
        showMessage('Demo data loaded successfully!', 'success');
    } catch (error) {
        console.error('Error loading demo data:', error);
        showMessage('Failed to load demo data. Please try again.', 'error');
    }
}

// Show dashboard and hide auth section
function showDashboard() {
    authSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
}

// Load and display user data
function loadUserData() {
    if (!currentUser) return;
    
    // Update dashboard with user data
    document.getElementById('internName').textContent = currentUser.name;
    document.getElementById('displayName').textContent = currentUser.name;
    document.getElementById('displayReferralCode').textContent = currentUser.referralCode;
    document.getElementById('displayDonations').textContent = `$${currentUser.donationsRaised.toLocaleString()}`;
    
    // Load rewards
    loadRewards(currentUser.rewards || []);
}

// Load and display rewards
function loadRewards(rewards) {
    const rewardsGrid = document.getElementById('rewardsGrid');
    rewardsGrid.innerHTML = '';
    
    const rewardIcons = [
        'fas fa-medal',
        'fas fa-trophy',
        'fas fa-star',
        'fas fa-crown',
        'fas fa-gem',
        'fas fa-award'
    ];
    
    rewards.forEach((reward, index) => {
        const rewardCard = document.createElement('div');
        rewardCard.className = 'reward-card';
        rewardCard.innerHTML = `
            <i class="${rewardIcons[index % rewardIcons.length]}"></i>
            <h3>${reward}</h3>
            <p>Unlocked!</p>
        `;
        rewardsGrid.appendChild(rewardCard);
    });
    
    // Add some locked rewards for demo
    const lockedRewards = [
        'Diamond Badge',
        'Master Badge',
        'Legend Badge'
    ];
    
    lockedRewards.forEach((reward, index) => {
        const rewardCard = document.createElement('div');
        rewardCard.className = 'reward-card';
        rewardCard.style.background = 'linear-gradient(135deg, #6c757d 0%, #495057 100%)';
        rewardCard.innerHTML = `
            <i class="fas fa-lock"></i>
            <h3>${reward}</h3>
            <p>Locked</p>
        `;
        rewardsGrid.appendChild(rewardCard);
    });
}

// Logout functionality
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    
    // Clear forms
    loginForm.reset();
    signupForm.reset();
    
    // Show auth section and hide dashboard
    authSection.classList.remove('hidden');
    dashboardSection.classList.add('hidden');
    
    // Reset tabs
    showTab('login');
    
    showMessage('Logged out successfully!', 'success');
}

// Show success/error messages
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert message at the top of the current section
    const currentSection = dashboardSection.classList.contains('hidden') ? authSection : dashboardSection;
    currentSection.insertBefore(messageDiv, currentSection.firstChild);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}); 