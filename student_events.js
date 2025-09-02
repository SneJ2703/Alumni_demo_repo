function renderEventsList(tab) {
    const eventsList = document.getElementById('eventsList');
    const events = eventsData[tab];

    eventsList.innerHTML = events.map((event, index) => {
        const statusClass = tab === 'upcoming' ? 'status-upcoming' : 
                           tab === 'ongoing' ? 'status-ongoing' : 'status-past';
        const statusText = tab === 'upcoming' ? 'Upcoming' : 
                           tab === 'ongoing' ? 'Ongoing' : 'Past';

        return `<div class="event-item" onclick="showEventDetails('${tab}', ${index})">
            <div class="event-date">
                <div class="event-month">${event.date.month}</div>
                <div class="event-day">${event.date.day}</div>
            </div>
            <div class="event-details">
                <div class="event-title">${event.title}</div>
                <div class="event-meta">
                    <span>${event.location}</span>
                    <span>${event.time}</span>
                    <span class="event-status ${statusClass}">${statusText}</span>
                    <span class="attendees">
                        ${event.attendees.map(a => `<div class="attendee-avatar" style="background:#2563eb">${a}</div>`).join('')}
                        <span class="attendee-count">+${event.attendeeCount}</span>
                    </span>
                </div>
            </div>
        </div>`;
    }).join('');
}

function showEventDetails(tab, idx) {
    const event = eventsData[tab][idx];
    const detailsSection = document.getElementById('eventDetailsSection');
    const detailsCard = document.getElementById('eventDetailsCard');
    
    detailsSection.style.display = 'block';
    detailsCard.innerHTML = `
      <div class="event-details-header">
        <div>
            <div class="event-details-title">${event.title}</div>
            <div class="event-details-meta">
                <span>${event.location}</span>
                <span>${event.time}</span>
                <span class="event-status">${tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
            </div>
        </div>
        <button class="close-btn" onclick="hideEventDetails()">×</button>
      </div>
      <div class="event-description">Event details and description will go here.</div>
      <div class="attendees-section">
        <div class="attendees-title">Attendees</div>
        <div class="attendees-grid">
          ${event.attendees.map(a => `<div class="attendee-avatar-large" style="background:#2563eb">${a}</div>`).join('')}
          <span class="attendee-count">+${event.attendeeCount} total</span>
        </div>
      </div>
    `;
}

function hideEventDetails() {
    document.getElementById('eventDetailsSection').style.display = 'none';
}

// Calendar functionality
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Sample events data
const eventsData = {
    upcoming: [
        {
            id: 1,
            title: "Alumni Networking Night",
            date: "2025-09-15",
            time: "18:00",
            location: "University Hall",
            type: "networking",
            description: "Join us for an evening of networking with successful alumni."
        },
        {
            id: 2,
            title: "Tech Talk Series",
            date: "2025-09-20",
            time: "14:00",
            location: "Virtual Event",
            type: "webinar",
            description: "Latest trends in technology by alumni experts."
        }
    ],
    ongoing: [
        {
            id: 3,
            title: "Mentorship Program",
            startDate: "2025-09-01",
            endDate: "2025-09-30",
            type: "mentorship",
            description: "Monthly mentorship program connecting students with alumni."
        }
    ],
    past: [
        {
            id: 4,
            title: "Career Fair 2025",
            date: "2025-08-25",
            type: "career",
            description: "Annual career fair featuring alumni recruiters."
        }
    ]
};

function updateCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const monthYearElement = document.getElementById('monthYear');
    
    // Update month and year display
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthYearElement.textContent = `${months[currentMonth]} ${currentYear}`;

    // Clear existing calendar days
    const calendarGrid = document.querySelector('.calendar-grid');
    while (calendarGrid.children.length > 7) { // Keep the header row
        calendarGrid.removeChild(calendarGrid.lastChild);
    }

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDay = createCalendarDay("", true);
        calendarGrid.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayElement = createCalendarDay(day, false);
        
        // Add event dots if events exist on this day
        const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        addEventDots(dayElement, dateStr);
        
        calendarGrid.appendChild(dayElement);
    }
}

function createCalendarDay(dayNumber, isOtherMonth) {
    const dayDiv = document.createElement('div');
    dayDiv.className = `calendar-day${isOtherMonth ? ' other-month' : ''}`;
    
    const dayNumberDiv = document.createElement('div');
    dayNumberDiv.className = 'day-number';
    dayNumberDiv.textContent = dayNumber;
    
    dayDiv.appendChild(dayNumberDiv);
    
    // Add click event handler
    if (!isOtherMonth) {
        dayDiv.addEventListener('click', () => showEventsForDay(dayNumber));
    }
    
    return dayDiv;
}

function addEventDots(dayElement, dateStr) {
    const eventTypes = ['upcoming', 'ongoing', 'past'];
    eventTypes.forEach(type => {
        const events = eventsData[type].filter(event => event.date === dateStr);
        events.forEach(() => {
            const dot = document.createElement('div');
            dot.className = `event-dot ${type}`;
            dayElement.appendChild(dot);
        });
    });
}

function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
}

function switchEventTab(tab, type) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    
    // Add active class to clicked tab
    tab.classList.add('active');
    
    // Update events list
    displayEvents(type);
}

function displayEvents(type) {
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';
    
    eventsData[type].forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'event-item';
        eventElement.innerHTML = `
            <div class="event-title">${event.title}</div>
            <div class="event-date">${event.date || `${event.startDate} - ${event.endDate}`}</div>
            <button onclick="showEventDetails(${event.id})">View Details</button>
        `;
        eventsList.appendChild(eventElement);
    });
}

function showEventDetails(eventId) {
    const detailsSection = document.getElementById('eventDetailsSection');
    const detailsCard = document.getElementById('eventDetailsCard');
    
    // Find event in all categories
    let event;
    for (const type in eventsData) {
        event = eventsData[type].find(e => e.id === eventId);
        if (event) break;
    }
    
    if (event) {
        detailsCard.innerHTML = `
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <p>Date: ${event.date || `${event.startDate} - ${event.endDate}`}</p>
            <p>Type: ${event.type}</p>
            ${event.location ? `<p>Location: ${event.location}</p>` : ''}
        `;
        detailsSection.style.display = 'block';
    }
}

function showEventsForDay(day) {
    const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const events = [];
    
    for (const type in eventsData) {
        const dayEvents = eventsData[type].filter(event => event.date === dateStr);
        events.push(...dayEvents);
    }
    
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';
    
    if (events.length > 0) {
        events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'event-item';
            eventElement.innerHTML = `
                <div class="event-title">${event.title}</div>
                <div class="event-date">${event.date}</div>
                <button onclick="showEventDetails(${event.id})">View Details</button>
            `;
            eventsList.appendChild(eventElement);
        });
    } else {
        eventsList.innerHTML = '<p>No events on this day</p>';
    }
}

// On initial load
window.onload = () => renderEventsList('upcoming');

// Initialize calendar and events when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateCalendar();
    displayEvents('upcoming'); // Show upcoming events by default
});
