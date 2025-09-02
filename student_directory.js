// Sample alumni data
const alumniData = [
    {
        id: 1,
        name: "Sarah Johnson",
        graduationYear: "2020",
        company: "Google",
        title: "Software Engineer",
        location: "San Francisco",
        skills: ["JavaScript", "React", "Node.js"],
        featured: true,
        image: "https://placeholder.com/150"
    },
    {
        id: 2,
        name: "Michael Chen",
        graduationYear: "2021",
        company: "Microsoft",
        title: "Product Manager",
        location: "Seattle",
        skills: ["Product Management", "Data Analytics"],
        featured: false,
        image: "https://placeholder.com/150"
    },
    {
        id: 3,
        name: "Emily Parker",
        graduationYear: "2019",
        company: "Amazon",
        title: "UX Designer",
        location: "New York",
        skills: ["UI/UX", "Figma", "User Research"],
        featured: true,
        image: "https://placeholder.com/150"
    },
    {
        id: 4,
        name: "David Kim",
        graduationYear: "2022",
        company: "Apple",
        title: "iOS Developer",
        location: "Cupertino",
        skills: ["Swift", "iOS Development"],
        featured: false,
        image: "https://placeholder.com/150"
    }
];

// Function to display all alumni
function displayAlumni() {
    const alumniList = document.getElementById('alumniList');
    alumniList.innerHTML = alumniData
        .filter(alumni => !alumni.featured)
        .map(alumni => `
            <div class="alumni-card">
                <img src="${alumni.image}" alt="${alumni.name}" class="alumni-avatar">
                <h3>${alumni.name}</h3>
                <p class="alumni-title">${alumni.title}</p>
                <p class="alumni-company">${alumni.company}</p>
                <p class="alumni-year">Class of ${alumni.graduationYear}</p>
                <div class="alumni-skills">
                    ${alumni.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
                <button class="connect-btn">Connect</button>
            </div>
        `).join('');
}

// Function to display featured alumni
function displayFeaturedAlumni() {
    const featuredList = document.getElementById('featuredAlumni');
    featuredList.innerHTML = alumniData
        .filter(alumni => alumni.featured)
        .map(alumni => `
            <div class="featured-card">
                <img src="${alumni.image}" alt="${alumni.name}" class="featured-avatar">
                <div class="featured-info">
                    <h3>${alumni.name}</h3>
                    <p>${alumni.title} at ${alumni.company}</p>
                    <p>Class of ${alumni.graduationYear}</p>
                </div>
            </div>
        `).join('');
}

// Update navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Update navigation links
    const dashboardLink = document.querySelector('a[href="#"]');
    dashboardLink.href = 'student_dashboard.html';

    const eventsLink = document.querySelector('a[href="#"].menu-item:nth-child(3)');
    eventsLink.href = 'student_events.html';

    // Display alumni data
    displayAlumni();
    displayFeaturedAlumni();

    // Update total alumni count
    document.getElementById('totalAlumni').textContent = alumniData.length;
});