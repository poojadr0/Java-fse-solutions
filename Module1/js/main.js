console.log("Welcome to the Community Portal");
document.addEventListener('DOMContentLoaded', function() {
    alert("Welcome to the Community Portal! The page has finished loading.");
    initializeEventManagement();
    initializeEventValidation();
    initializeEventOperations();
    initializeEventObjects();
    initializeEventArrays();
    initializeDOMEvents();
    initializeEventHandling();
    initializeAsyncEvents();
});
function initializeEventManagement() {
    const eventName = "Community Art Exhibition";
    const eventDate = "2024-03-20";
    let availableSeats = 50; 

    displayEventInfo(eventName, eventDate, availableSeats);
    const registerBtn = document.createElement('button');
    registerBtn.textContent = 'Register for Event';
    registerBtn.className = 'register-btn';
    registerBtn.onclick = function() {
        if (availableSeats > 0) {
            availableSeats--; 
            displayEventInfo(eventName, eventDate, availableSeats);
            alert(`Registration successful! ${availableSeats} seats remaining.`);
        } else {
            alert('Sorry, no seats available!');
        }
    };
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel Registration';
    cancelBtn.className = 'cancel-btn';
    cancelBtn.onclick = function() {
        availableSeats++;   
        displayEventInfo(eventName, eventDate, availableSeats);
        alert(`Registration cancelled. ${availableSeats} seats available.`);
    };
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'event-buttons';
        buttonContainer.appendChild(registerBtn);
        buttonContainer.appendChild(cancelBtn);
        eventsSection.appendChild(buttonContainer);
    }
}
function displayEventInfo(name, date, seats) {
    const eventInfo = document.createElement('div');
    eventInfo.className = 'event-info';
    eventInfo.innerHTML = `
        <h3>${name}</h3>
        <p>Date: ${date}</p>
        <p>Available Seats: ${seats}</p>
    `;
    const existingInfo = document.querySelector('.event-info');
    if (existingInfo) {
        existingInfo.replaceWith(eventInfo);
    } else {
        const eventsSection = document.getElementById('events');
        if (eventsSection) {
            eventsSection.insertBefore(eventInfo, eventsSection.firstChild);
        }
    }
}
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
}
function initializeCharacterCounter() {
    const feedbackTextarea = document.getElementById('feedback');
    const charCount = document.getElementById('charCount');
    
    if (feedbackTextarea && charCount) {
        feedbackTextarea.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
    }
}
function initializeGeolocation() {
    const findNearbyButton = document.getElementById('findNearbyEvents');
    const coordinatesDisplay = document.getElementById('coordinates');
    const geoError = document.getElementById('geoError');
    
    if (findNearbyButton && coordinatesDisplay) {
        findNearbyButton.addEventListener('click', function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        coordinatesDisplay.textContent = 
                            `Latitude: ${position.coords.latitude}\n` +
                            `Longitude: ${position.coords.longitude}`;
                        geoError.textContent = '';
                    },
                    function(error) {
                        geoError.textContent = 'Error getting location: ' + error.message;
                        coordinatesDisplay.textContent = '';
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    }
                );
            } else {
                geoError.textContent = 'Geolocation is not supported by your browser';
            }
        });
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('eventVideo');
    const videoStatus = document.getElementById('videoStatus');
    
    if (video && videoStatus) {
        video.addEventListener('canplay', function() {
            videoStatus.textContent = 'Video ready to play';
        });
    }
});
window.addEventListener('beforeunload', function(event) {
    const forms = document.querySelectorAll('form');
    let hasChanges = false;
    
    forms.forEach(form => {
        if (form.classList.contains('was-validated')) {
            hasChanges = true;
        }
    });
    
    if (hasChanges) {
        event.preventDefault();
        event.returnValue = '';
    }
});
function initializeEventValidation() {
    // Sample event data
    const events = [
        {
            name: "Community Art Exhibition",
            date: "2024-03-20",
            seats: 50,
            status: "upcoming"
        },
        {
            name: "Local Music Festival",
            date: "2024-02-15",
            seats: 0,
            status: "past"
        },
        {
            name: "Food & Wine Tasting",
            date: "2024-04-01",
            seats: 25,
            status: "upcoming"
        }
    ];

    // Display valid events
    displayValidEvents(events);

    // Add registration handler with error handling
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('event-register')) {
            try {
                const eventId = e.target.dataset.eventId;
                registerForEvent(eventId, events);
            } catch (error) {
                console.error('Registration error:', error);
                alert('An error occurred during registration. Please try again.');
            }
        }
    });
}
function displayValidEvents(events) {
    const eventsContainer = document.createElement('div');
    eventsContainer.className = 'valid-events';
    events.forEach((event, index) => {
        if (isValidEvent(event)) {
            const eventElement = createEventElement(event, index);
            eventsContainer.appendChild(eventElement);
        }
    });
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
        eventsSection.appendChild(eventsContainer);
    }
}
function isValidEvent(event) {
    const today = new Date();
    const eventDate = new Date(event.date);    
    return eventDate > today && event.seats > 0;
}
function createEventElement(event, index) {
    const eventDiv = document.createElement('div');
    eventDiv.className = 'event-card';
    eventDiv.innerHTML = `
        <h3>${event.name}</h3>
        <p>Date: ${event.date}</p>
        <p>Available Seats: ${event.seats}</p>
    `;
    return eventDiv;
}
function registerForEvent(eventId, events) {
    try {
        const event = events[eventId];
        if (!event) {
            throw new Error('Event not found');
        }
        if (!isValidEvent(event)) {
            throw new Error('Event is no longer available');
        }
        event.seats--;
        const eventElement = document.querySelector(`[data-event-id="${eventId}"]`).parentElement;
        const seatsElement = eventElement.querySelector('p:last-of-type');
        seatsElement.textContent = `Available Seats: ${event.seats}`;
        if (event.seats === 0) {
            eventElement.style.display = 'none';
        }

        alert(`Successfully registered for ${event.name}!`);
    } catch (error) {
        throw new Error(`Registration failed: ${error.message}`);
    }
}
function initializeEventOperations() {
    const eventManager = createEventManager();
    const events = [
        { id: 1, name: "Art Workshop", category: "arts", date: "2024-03-25", seats: 20 },
        { id: 2, name: "Basketball Tournament", category: "sports", date: "2024-04-01", seats: 30 },
        { id: 3, name: "Cooking Class", category: "food", date: "2024-03-30", seats: 15 }
    ];
    events.forEach(event => eventManager.addEvent(event));
    initializeSearch(eventManager);
    displayEventsByCategory(eventManager, 'all');
}
function createEventManager() {
    const events = [];
    const categoryRegistrations = {
        arts: 0,
        sports: 0,
        food: 0
    };

    return {
        addEvent: function(event) {
            events.push({
                ...event,
                registrations: []
            });
            console.log(`Event added: ${event.name}`);
        },

        // Register user for event
        registerUser: function(eventId, user) {
            const event = events.find(e => e.id === eventId);
            if (event && event.seats > 0) {
                event.registrations.push(user);
                event.seats--;
                categoryRegistrations[event.category]++;
                return true;
            }
            return false;
        },

        // Filter events with callback
        filterEvents: function(callback) {
            return events.filter(callback);
        },

        // Get events by category
        getEventsByCategory: function(category) {
            return category === 'all' 
                ? events 
                : events.filter(event => event.category === category);
        },

        // Get registration count for category
        getCategoryRegistrations: function(category) {
            return categoryRegistrations[category] || 0;
        }
    };
}

// Search functionality
function initializeSearch(eventManager) {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search events...';
    searchInput.className = 'event-search';
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredEvents = eventManager.filterEvents(event => 
            event.name.toLowerCase().includes(searchTerm) ||
            event.category.toLowerCase().includes(searchTerm)
        );
        displayFilteredEvents(filteredEvents);
    });

    // Add search to events section
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
        eventsSection.insertBefore(searchInput, eventsSection.firstChild);
    }
}

// Display events by category
function displayEventsByCategory(eventManager, category) {
    const events = eventManager.getEventsByCategory(category);
    const container = document.createElement('div');
    container.className = 'category-events';

    // Create category header with registration count
    const header = document.createElement('div');
    header.className = 'category-header';
    header.innerHTML = `
        <h3>${category.charAt(0).toUpperCase() + category.slice(1)} Events</h3>
        <p>Total Registrations: ${eventManager.getCategoryRegistrations(category)}</p>
    `;
    container.appendChild(header);

    // Display events
    events.forEach(event => {
        const eventElement = createEventCard(event, eventManager);
        container.appendChild(eventElement);
    });

    // Update display
    const existingContainer = document.querySelector('.category-events');
    if (existingContainer) {
        existingContainer.replaceWith(container);
    } else {
        const eventsSection = document.getElementById('events');
        if (eventsSection) {
            eventsSection.appendChild(container);
        }
    }
}

// Create event card with registration functionality
function createEventCard(event, eventManager) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
        <h4>${event.name}</h4>
        <p>Category: ${event.category}</p>
        <p>Date: ${event.date}</p>
        <p>Available Seats: ${event.seats}</p>
    `;

    // Add registration handler
    const registerBtn = card.querySelector('.register-btn');
    registerBtn.addEventListener('click', function() {
        const user = { id: Date.now(), name: 'User ' + Date.now() };
        if (eventManager.registerUser(event.id, user)) {
            alert(`Successfully registered for ${event.name}!`);
            displayEventsByCategory(eventManager, event.category);
        } else {
            alert('Registration failed. No seats available.');
        }
    });

    return card;
}

// Display filtered events
function displayFilteredEvents(events) {
    const container = document.createElement('div');
    container.className = 'filtered-events';

    if (events.length === 0) {
        container.innerHTML = '<p>No events found matching your search.</p>';
    } else {
        events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'event-card';
            eventElement.innerHTML = `
                <h4>${event.name}</h4>
                <p>Category: ${event.category}</p>
                <p>Date: ${event.date}</p>
                <p>Available Seats: ${event.seats}</p>
            `;
            container.appendChild(eventElement);
        });
    }

    // Update display
    const existingContainer = document.querySelector('.filtered-events');
    if (existingContainer) {
        existingContainer.replaceWith(container);
    } else {
        const eventsSection = document.getElementById('events');
        if (eventsSection) {
            eventsSection.appendChild(container);
        }
    }
}

// Event Class and Prototype System
function initializeEventObjects() {
    // Event Class Definition
    class Event {
        constructor(name, date, category, seats, location) {
            this.name = name;
            this.date = new Date(date);
            this.category = category;
            this.seats = seats;
            this.location = location;
            this.registrations = [];
            this.status = 'upcoming';
        }

        // Instance method
        getEventDetails() {
            return {
                name: this.name,
                date: this.date.toLocaleDateString(),
                category: this.category,
                availableSeats: this.seats,
                location: this.location,
                status: this.status
            };
        }
    }

    // Add prototype method
    Event.prototype.checkAvailability = function() {
        const today = new Date();
        if (this.date < today) {
            this.status = 'past';
            return false;
        }
        return this.seats > 0;
    };

    // Add prototype method for registration
    Event.prototype.register = function(user) {
        if (this.checkAvailability()) {
            this.registrations.push(user);
            this.seats--;
            return true;
        }
        return false;
    };

    // Create sample events
    const events = [
        new Event('Art Workshop', '2024-03-25', 'arts', 20, 'Community Center'),
        new Event('Basketball Tournament', '2024-04-01', 'sports', 30, 'Sports Complex'),
        new Event('Cooking Class', '2024-03-30', 'food', 15, 'Culinary School')
    ];

    // Display events with object details
    displayEventObjects(events);
}

// Display events with object details
function displayEventObjects(events) {
    const container = document.createElement('div');
    container.className = 'event-objects';

    // Create header
    const header = document.createElement('h3');
    header.textContent = 'Event Objects';
    header.className = 'section-header';
    container.appendChild(header);

    // Display each event's details
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-object-card';

        // Get event details
        const details = event.getEventDetails();
        
        // Create content using Object.entries()
        const content = document.createElement('div');
        content.className = 'event-object-content';
        
        Object.entries(details).forEach(([key, value]) => {
            const propertyDiv = document.createElement('div');
            propertyDiv.className = 'event-property';
            propertyDiv.innerHTML = `
                <span class="property-key">${key}:</span>
                <span class="property-value">${value}</span>
            `;
            content.appendChild(propertyDiv);
        });

       
        const availabilityDiv = document.createElement('div');
        availabilityDiv.className = 'event-availability';
        availabilityDiv.innerHTML = `
            <p>Available: ${event.checkAvailability() ? 'Yes' : 'No'}</p>
            <p>Status: ${event.status}</p>
        `;
        content.appendChild(availabilityDiv);

        
        const registerBtn = document.createElement('button');
        registerBtn.className = 'register-btn';
        registerBtn.textContent = 'Register';
        registerBtn.onclick = function() {
            const user = { id: Date.now(), name: 'User ' + Date.now() };
            if (event.register(user)) {
                alert(`Successfully registered for ${event.name}!`);
              
                displayEventObjects(events);
            } else {
                alert('Registration failed. Event is not available.');
            }
        };

        eventCard.appendChild(content);
        eventCard.appendChild(registerBtn);
        container.appendChild(eventCard);
    });

 
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
        eventsSection.appendChild(container);
    }
}

function initializeDOMEvents() {

    const mainContainer = document.createElement('div');
    mainContainer.className = 'dom-events-container';
    
    const header = createEventHeader();
    mainContainer.appendChild(header);


    const eventList = document.createElement('div');
    eventList.className = 'event-list';
    mainContainer.appendChild(eventList);


    const eventsSection = document.getElementById('events');
    if (eventsSection) {
        eventsSection.appendChild(mainContainer);
    }

   
    const events = [
        { id: 1, name: "Summer Concert", date: "2024-06-15", seats: 100, category: "music" },
        { id: 2, name: "Art Exhibition", date: "2024-05-20", seats: 50, category: "arts" },
        { id: 3, name: "Food Festival", date: "2024-07-01", seats: 200, category: "food" }
    ];


    renderEvents(events, eventList);

    setupEventListeners(eventList, events);
}

function createEventHeader() {
    const header = document.createElement('div');
    header.className = 'dom-events-header';
    
    const title = document.createElement('h2');
    title.textContent = 'Community Events';
    title.className = 'dom-events-title';
    
    const controls = document.createElement('div');
    controls.className = 'dom-events-controls';
    

    const refreshBtn = document.createElement('button');
    refreshBtn.className = 'refresh-btn';
    refreshBtn.innerHTML = '🔄 Refresh Events';
    controls.appendChild(refreshBtn);

    const sortSelect = document.createElement('select');
    sortSelect.className = 'sort-select';
    sortSelect.innerHTML = `
        <option value="date">Sort by Date</option>
        <option value="name">Sort by Name</option>
        <option value="seats">Sort by Available Seats</option>
    `;
    controls.appendChild(sortSelect);
    
    header.appendChild(title);
    header.appendChild(controls);
    
    return header;
}

function renderEvents(events, container) {
    container.innerHTML = '';

    events.forEach(event => {
        const card = createEventCard(event);
        container.appendChild(card);
    });
}
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'dom-event-card';
    card.dataset.eventId = event.id;
    const content = document.createElement('div');
    content.className = 'event-card-content';
    const details = document.createElement('div');
    details.className = 'event-details';
    details.innerHTML = `
        <h3>${event.name}</h3>
        <p class="event-date">📅 ${event.date}</p>
        <p class="event-category">🏷️ ${event.category}</p>
        <p class="event-seats">💺 ${event.seats} seats available</p>
    `;
    const actions = document.createElement('div');
    actions.className = 'event-actions';
    
    const registerBtn = document.createElement('button');
    registerBtn.className = 'register-btn';
    registerBtn.textContent = 'Register';
    registerBtn.disabled = event.seats === 0;
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancel-btn';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.display = 'none';
    
    actions.appendChild(registerBtn);
    actions.appendChild(cancelBtn);
    content.appendChild(details);
    content.appendChild(actions);
    card.appendChild(content);
    
    return card;
}
function setupEventListeners(container, events) {
    const refreshBtn = container.parentElement.querySelector('.refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            renderEvents(events, container);
        });
    }
    const sortSelect = container.parentElement.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const sortedEvents = [...events].sort((a, b) => {
                switch(e.target.value) {
                    case 'date':
                        return new Date(a.date) - new Date(b.date);
                    case 'name':
                        return a.name.localeCompare(b.name);
                    case 'seats':
                        return b.seats - a.seats;
                    default:
                        return 0;
                }
            });
            renderEvents(sortedEvents, container);
        });
    }
    container.addEventListener('click', (e) => {
        const card = e.target.closest('.dom-event-card');
        if (!card) return;
        
        const eventId = parseInt(card.dataset.eventId);
        const event = events.find(e => e.id === eventId);
        
        if (e.target.classList.contains('register-btn')) {
            handleRegistration(event, card);
        } else if (e.target.classList.contains('cancel-btn')) {
            handleCancellation(event, card);
        }
    });
}
function handleRegistration(event, card) {
    if (event.seats > 0) {
        event.seats--;
        const seatsElement = card.querySelector('.event-seats');
        seatsElement.textContent = `💺 ${event.seats} seats available`;
        const registerBtn = card.querySelector('.register-btn');
        const cancelBtn = card.querySelector('.cancel-btn');
        registerBtn.disabled = true;
        cancelBtn.style.display = 'block';
        showNotification(`Successfully registered for ${event.name}!`);
    }
}
function handleCancellation(event, card) {
    event.seats++;
    const seatsElement = card.querySelector('.event-seats');
    seatsElement.textContent = `💺 ${event.seats} seats available`;
    const registerBtn = card.querySelector('.register-btn');
    const cancelBtn = card.querySelector('.cancel-btn');
    registerBtn.disabled = false;
    cancelBtn.style.display = 'none';
    showNotification(`Registration cancelled for ${event.name}`);
}
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event Handling System
function initializeEventHandling() {
    const events = [
        { id: 1, name: "Jazz Night", category: "music", date: "2024-04-15", seats: 50 },
        { id: 2, name: "Art Workshop", category: "arts", date: "2024-05-20", seats: 30 },
        { id: 3, name: "Food Festival", category: "food", date: "2024-06-01", seats: 100 }
    ];

    // Create container
    const container = document.createElement('div');
    container.className = 'event-handling-container';
    
    // Create search and filter section
    const controls = createEventControls();
    container.appendChild(controls);
    
    // Create events display
    const eventsDisplay = document.createElement('div');
    eventsDisplay.className = 'events-display';
    container.appendChild(eventsDisplay);
    
    // Add to page
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
        eventsSection.appendChild(container);
    }

    // Initial render
    renderEventsWithHandling(events, eventsDisplay);

    // Setup event handlers
    setupEventHandlers(events, eventsDisplay);
}

// Create event controls
function createEventControls() {
    const controls = document.createElement('div');
    controls.className = 'event-controls';

    // Search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search events...';
    searchInput.className = 'event-search-input';
    controls.appendChild(searchInput);

    // Category filter
    const categoryFilter = document.createElement('select');
    categoryFilter.className = 'category-filter';
    categoryFilter.innerHTML = `
        <option value="all">All Categories</option>
        <option value="music">Music</option>
        <option value="arts">Arts</option>
        <option value="food">Food</option>
    `;
    controls.appendChild(categoryFilter);

    return controls;
}

// Render events with handling
function renderEventsWithHandling(events, container) {
    container.innerHTML = '';
    
    events.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-handling-card';
        card.innerHTML = `
            <h3>${event.name}</h3>
            <p class="event-category">${event.category}</p>
            <p class="event-date">${event.date}</p>
            <p class="event-seats">Available Seats: ${event.seats}</p>
            <div class="event-actions">
                <button class="register-btn" data-event-id="${event.id}">Register</button>
                <button class="cancel-btn" data-event-id="${event.id}" style="display: none;">Cancel</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Setup event handlers
function setupEventHandlers(events, container) {
    // Search input handler
    const searchInput = container.parentElement.querySelector('.event-search-input');
    if (searchInput) {
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.toLowerCase();
                const filteredEvents = events.filter(event => 
                    event.name.toLowerCase().includes(searchTerm)
                );
                renderEventsWithHandling(filteredEvents, container);
            }
        });
    }

    // Category filter handler
    const categoryFilter = container.parentElement.querySelector('.category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function(e) {
            const category = e.target.value;
            const filteredEvents = category === 'all' 
                ? events 
                : events.filter(event => event.category === category);
            renderEventsWithHandling(filteredEvents, container);
        });
    }

    // Registration handler
    container.addEventListener('click', function(e) {
        if (e.target.classList.contains('register-btn')) {
            const eventId = parseInt(e.target.dataset.eventId);
            const event = events.find(e => e.id === eventId);
            if (event && event.seats > 0) {
                handleEventRegistration(event, e.target);
            }
        } else if (e.target.classList.contains('cancel-btn')) {
            const eventId = parseInt(e.target.dataset.eventId);
            const event = events.find(e => e.id === eventId);
            if (event) {
                handleEventCancellation(event, e.target);
            }
        }
    });
}

// Handle event registration
function handleEventRegistration(event, button) {
    event.seats--;
    
    // Update seats display
    const card = button.closest('.event-handling-card');
    const seatsElement = card.querySelector('.event-seats');
    seatsElement.textContent = `Available Seats: ${event.seats}`;
    
    // Toggle buttons
    const cancelBtn = card.querySelector('.cancel-btn');
    button.disabled = true;
    cancelBtn.style.display = 'block';
    
    // Show notification
    showEventNotification(`Successfully registered for ${event.name}!`);
}

// Handle event cancellation
function handleEventCancellation(event, button) {
    event.seats++;
    
    // Update seats display
    const card = button.closest('.event-handling-card');
    const seatsElement = card.querySelector('.event-seats');
    seatsElement.textContent = `Available Seats: ${event.seats}`;
    
    // Toggle buttons
    const registerBtn = card.querySelector('.register-btn');
    button.style.display = 'none';
    registerBtn.disabled = false;
    
    // Show notification
    showEventNotification(`Registration cancelled for ${event.name}`);
}

// Show event notification
function showEventNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'event-notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize async events
function initializeAsyncEvents() {
    const container = document.createElement('div');
    container.className = 'async-events-container';
    
    const spinner = createSpinner();
    container.appendChild(spinner);
    
    const eventsDisplay = document.createElement('div');
    eventsDisplay.className = 'async-events-display';
    container.appendChild(eventsDisplay);
    
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
        eventsSection.appendChild(container);
    }

    // Fetch using promises
    fetchEventsWithPromises()
        .then(events => {
            spinner.style.display = 'none';
            displayAsyncEvents(events, eventsDisplay);
        })
        .catch(error => {
            spinner.style.display = 'none';
            showError('Failed to load events. Please try again.');
        });

    // Fetch using async/await
    fetchEventsWithAsyncAwait()
        .then(events => {
            displayAsyncEvents(events, eventsDisplay);
        })
        .catch(error => {
            showError('Failed to load events. Please try again.');
        });
}

// Create loading spinner
function createSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = `
        <div class="spinner"></div>
        <p>Loading events...</p>
    `;
    return spinner;
}

// Fetch events using promises
function fetchEventsWithPromises() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const events = [
                { id: 1, name: "Summer Concert", date: "2024-06-15", seats: 100, category: "music" },
                { id: 2, name: "Art Exhibition", date: "2024-05-20", seats: 50, category: "arts" },
                { id: 3, name: "Food Festival", date: "2024-07-01", seats: 200, category: "food" }
            ];
            
            if (Math.random() > 0.1) {
                resolve(events);
            } else {
                reject(new Error('Failed to fetch events'));
            }
        }, 2000);
    });
}

// Fetch events using async/await
async function fetchEventsWithAsyncAwait() {
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const events = [
            { id: 1, name: "Summer Concert", date: "2024-06-15", seats: 100, category: "music" },
            { id: 2, name: "Art Exhibition", date: "2024-05-20", seats: 50, category: "arts" },
            { id: 3, name: "Food Festival", date: "2024-07-01", seats: 200, category: "food" }
        ];
        
        if (Math.random() > 0.1) {
            return events;
        } else {
            throw new Error('Failed to fetch events');
        }
    } catch (error) {
        throw error;
    }
}

// Display async events
function displayAsyncEvents(events, container) {
    container.innerHTML = '';
    
    const header = document.createElement('h3');
    header.textContent = 'Async Events';
    header.className = 'async-events-header';
    container.appendChild(header);
    
    const eventsGrid = document.createElement('div');
    eventsGrid.className = 'async-events-grid';
    
    events.forEach(event => {
        const card = createAsyncEventCard(event);
        eventsGrid.appendChild(card);
    });
    
    container.appendChild(eventsGrid);
}

// Create async event card
function createAsyncEventCard(event) {
    const card = document.createElement('div');
    card.className = 'async-event-card';
    card.innerHTML = `
        <h4>${event.name}</h4>
        <p class="event-category">${event.category}</p>
        <p class="event-date">${event.date}</p>
        <p class="event-seats">Available Seats: ${event.seats}</p>
        <button class="register-btn" data-event-id="${event.id}">Register</button>
    `;
    
    const registerBtn = card.querySelector('.register-btn');
    registerBtn.addEventListener('click', async function() {
        try {
            await handleAsyncRegistration(event, this);
        } catch (error) {
            showError('Registration failed. Please try again.');
        }
    });
    
    return card;
}

// Handle async registration
async function handleAsyncRegistration(event, button) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (event.seats > 0) {
        event.seats--;
        const seatsElement = button.parentElement.querySelector('.event-seats');
        seatsElement.textContent = `Available Seats: ${event.seats}`;
        button.disabled = true;
        showSuccess(`Successfully registered for ${event.name}!`);
    } else {
        throw new Error('No seats available');
    }
}

// Show success message
function showSuccess(message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Show error message
function showError(message) {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
} 