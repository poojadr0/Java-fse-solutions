// Basic JavaScript Setup for Community Portal

// Log welcome message to console
console.log("Welcome to the Community Portal");

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Alert when page is fully loaded
    alert("Welcome to the Community Portal! The page has finished loading.");
});

// Form validation function
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

// Character counter for feedback textarea
function initializeCharacterCounter() {
    const feedbackTextarea = document.getElementById('feedback');
    const charCount = document.getElementById('charCount');
    
    if (feedbackTextarea && charCount) {
        feedbackTextarea.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
    }
}

// Geolocation initialization
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

// Video status handler
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('eventVideo');
    const videoStatus = document.getElementById('videoStatus');
    
    if (video && videoStatus) {
        video.addEventListener('canplay', function() {
            videoStatus.textContent = 'Video ready to play';
        });
    }
});

// Form beforeunload warning
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