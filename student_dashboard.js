document.addEventListener('DOMContentLoaded', function() {
    // Navigation active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Quick actions
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', function() {
            const text = this.querySelector('.action-text').textContent;
            console.log(`Clicked: ${text}`);
            // Add your navigation logic here
            
            // Example: Show alert for demo purposes
            alert(`Navigating to: ${text}`);
        });
    });

    // Search functionality
    document.querySelector('.search-input').addEventListener('focus', function() {
        this.style.borderColor = '#007AFF';
    });

    document.querySelector('.search-input').addEventListener('blur', function() {
        this.style.borderColor = '#e5e5e7';
    });

    // Search on Enter key
    document.querySelector('.search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim();
            if (searchTerm) {
                console.log(`Searching for: ${searchTerm}`);
                // Add your search logic here
                alert(`Searching for: ${searchTerm}`);
            }
        }
    });

    // Notification bell click
    document.querySelector('.notification-icon').addEventListener('click', function() {
        console.log('Notifications clicked');
        // Add your notification logic here
        alert('No new notifications');
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.close-btn');
    const sidebar = document.querySelector('.sidebar');
    
    // Only add mobile functionality on smaller screens
    function handleMobileMenu() {
        if (window.innerWidth <= 768) {
            menuToggle.addEventListener('click', function() {
                sidebar.classList.toggle('open');
            });
            
            // Close sidebar when clicking outside on mobile
            document.addEventListener('click', function(e) {
                if (window.innerWidth <= 768 && 
                    !sidebar.contains(e.target) && 
                    !menuToggle.contains(e.target) && 
                    sidebar.classList.contains('open')) {
                    sidebar.classList.remove('open');
                }
            });
        }
    }

    // Initialize mobile menu
    handleMobileMenu();

    // Re-initialize on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
        }
        handleMobileMenu();
    });

    // User avatar click
    document.querySelector('.user-avatar').addEventListener('click', function() {
        console.log('User profile clicked');
        // Add your profile logic here
        alert('User Profile');
    });

    // Activity items click (for future expansion)
    document.querySelectorAll('.activity-item').forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            console.log(`Activity clicked: ${title}`);
            // Add your activity detail logic here
        });
    });

    // Add hover effects for better UX
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Simulated data updates (you can remove this in production)
    setTimeout(() => {
        // Update notification badge
        const badge = document.querySelector('.notification-badge');
        const currentCount = parseInt(badge.textContent);
        badge.textContent = currentCount + 1;
        
        // Add animation to indicate new notification
        badge.style.animation = 'pulse 0.5s ease-in-out';
        
        console.log('New notification received!');
    }, 10000); // Simulate new notification after 10 seconds
});

// Add CSS animation for notification badge
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);