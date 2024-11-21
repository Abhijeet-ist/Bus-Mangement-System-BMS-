
var map = L.map('map').setView([28.7041, 77.1025], 12); 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);


const busRoutes = [
    { id: 1, color: 'red', coords: [28.7041, 77.1025] },   
    { id: 2, color: 'blue', coords: [28.7041, 77.1125] },   
    { id: 3, color: 'green', coords: [28.7041, 77.1225] }   
];


function addBusMarkers() {
    busRoutes.forEach(route => {
        const marker = L.circleMarker(route.coords, {
            color: route.color,
            radius: 8
        }).addTo(map);
        marker.bindPopup(`Bus Route ${route.id}`);
    });
}


addBusMarkers();


setInterval(() => {
    
    map.eachLayer(layer => {
        if (layer instanceof L.CircleMarker) {
            map.removeLayer(layer);
        }
    });
    
    
    busRoutes.forEach(route => {
        route.coords = [
            route.coords[0] + (Math.random() - 0.5) / 100, 
            route.coords[1] + (Math.random() - 0.5) / 100  
        ];
    });

    
    addBusMarkers();
}, 5000);

const routes = [
    { id: 1, name: 'Route 1', coords: [28.7041, 77.1025] },
    { id: 2, name: 'Route 2', coords: [28.7041, 77.1125] },
    { id: 3, name: 'Route 3', coords: [28.7041, 77.1225] }
];


function searchRoutes() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const filteredRoutes = routes.filter(route => route.name.toLowerCase().includes(searchTerm));

    
    map.eachLayer(layer => {
        if (layer instanceof L.CircleMarker) {
            map.removeLayer(layer);
        }
    });

    
    filteredRoutes.forEach(route => {
        L.circleMarker(route.coords, {
            color: 'blue',
            radius: 8
        }).addTo(map).bindPopup(route.name);
    });
}


document.getElementById('search-button').addEventListener('click', searchRoutes);


document.getElementById('search-bar').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchRoutes();
    }
});

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


function updateActiveMenu() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100; 

    sections.forEach(section => {
        if (section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
            document.querySelectorAll('nav a').forEach(anchor => {
                anchor.classList.remove('active');
                if (anchor.getAttribute('href').substring(1) === section.id) {
                    anchor.classList.add('active');
                }
            });
        }
    });
}


window.addEventListener('scroll', updateActiveMenu);
document.getElementById('login-button').addEventListener('click', function() {
    
    window.location.href = 'login.html'; 
});

document.getElementById('signup-button').addEventListener('click', function() {
    
    window.location.href = 'signup.html'; 
});

const upcomingRides = [
    { busNumber: '123', route: 'Route 1', time: '2024-09-01 08:30 AM' },
    { busNumber: '456', route: 'Route 2', time: '2024-09-01 10:00 AM' },
    { busNumber: '789', route: 'Route 3', time: '2024-09-01 01:15 PM' }
];


function displayUpcomingRides() {
    const ridesContainer = document.getElementById('rides-container');
    ridesContainer.innerHTML = ''; 

    upcomingRides.forEach(ride => {
        const rideElement = document.createElement('div');
        rideElement.classList.add('ride-item');
        rideElement.innerHTML = `
            <h3>Bus Number: ${ride.busNumber}</h3>
            <p>Route: ${ride.route}</p>
            <p>Time: ${ride.time}</p>
        `;
        ridesContainer.appendChild(rideElement);
    });
}


document.addEventListener('DOMContentLoaded', displayUpcomingRides);

const availableBuses = [
    { id: '1', name: 'Bus 123', route: 'Route 1' },
    { id: '2', name: 'Bus 456', route: 'Route 2' },
    { id: '3', name: 'Bus 789', route: 'Route 3' }
];

// Populate bus options in the dropdown
function populateBusOptions() {
    const busSelect = document.getElementById('preferred-bus');
    availableBuses.forEach(bus => {
        const option = document.createElement('option');
        option.value = bus.id;
        option.textContent = `${bus.name} (${bus.route})`;
        busSelect.appendChild(option);
    });
}

// Handle form submission
document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const startingPoint = document.getElementById('starting-point').value;
    const destination = document.getElementById('destination').value;
    const preferredBusId = document.getElementById('preferred-bus').value;

    const selectedBus = availableBuses.find(bus => bus.id === preferredBusId);
    
    if (startingPoint && destination && selectedBus) {
        // Simulate estimated arrival time and fare
        const estimatedArrival = '30 minutes'; // Example static value
        const fare = '$5.00'; // Example static value

        // Display booking details
        document.getElementById('booking-details').innerHTML = `
            <h3>Booking Confirmation</h3>
            <p><strong>Starting Point:</strong> ${startingPoint}</p>
            <p><strong>Destination:</strong> ${destination}</p>
            <p><strong>Preferred Bus:</strong> ${selectedBus.name}</p>
            <p><strong>Estimated Arrival:</strong> ${estimatedArrival}</p>
            <p><strong>Fare:</strong> ${fare}</p>
        `;
    } else {
        document.getElementById('booking-details').innerHTML = '<p>Please fill out all fields and select a bus.</p>';
    }
});

// Initialize bus options when the page loads
document.addEventListener('DOMContentLoaded', populateBusOptions);
// Sample data for notifications (in a real application, this should come from a server)
const notifications = [
    { type: 'alert', message: 'Bus 123 is delayed by 15 minutes.' },
    { type: 'update', message: 'New route added: Route 4.' },
    { type: 'info', message: 'Maintenance work will occur on Route 2 tonight.' }
];

// Function to display notifications
function displayNotifications() {
    const notificationsContainer = document.getElementById('notifications-container');
    notificationsContainer.innerHTML = ''; // Clear existing notifications

    notifications.forEach(notification => {
        const notificationElement = document.createElement('div');
        notificationElement.classList.add('notification-item', notification.type);
        notificationElement.innerHTML = `<p>${notification.message}</p>`;
        notificationsContainer.appendChild(notificationElement);
    });
}

// Call function to display notifications when the page loads
document.addEventListener('DOMContentLoaded', displayNotifications);
// Sample data for payment history (in a real application, this should come from a server)
const paymentHistory = [
    { date: '2024-08-25', time: '10:00 AM', fare: '$5.00', paymentMethod: 'Credit Card', status: 'Paid' },
    { date: '2024-08-26', time: '12:30 PM', fare: '$7.50', paymentMethod: 'PayPal', status: 'Pending' },
    { date: '2024-08-27', time: '02:45 PM', fare: '$6.00', paymentMethod: 'Debit Card', status: 'Failed' }
];

// Function to display payment history
function displayPaymentHistory() {
    const paymentHistoryContainer = document.getElementById('payment-history-container');
    paymentHistoryContainer.innerHTML = ''; // Clear existing content

    paymentHistory.forEach(payment => {
        const paymentElement = document.createElement('div');
        paymentElement.classList.add('payment-item');
        paymentElement.innerHTML = `
            <p><strong>Date:</strong> ${payment.date}</p>
            <p><strong>Time:</strong> ${payment.time}</p>
            <p><strong>Fare:</strong> ${payment.fare}</p>
            <p><strong>Payment Method:</strong> ${payment.paymentMethod}</p>
            <p><strong>Status:</strong> <span class="status ${payment.status.toLowerCase()}">${payment.status}</span></p>
        `;
        paymentHistoryContainer.appendChild(paymentElement);
    });
}

// Call function to display payment history when the page loads
document.addEventListener('DOMContentLoaded', displayPaymentHistory);
// Sample data for buses (in a real application, this should come from a server)
let buses = [
    { number: '123', route: 'Route 1', status: 'Active' },
    { number: '456', route: 'Route 2', status: 'Inactive' }
];

// Function to display the list of buses
function displayBusList() {
    const busListContainer = document.getElementById('bus-list-container');
    busListContainer.innerHTML = ''; // Clear existing content

    buses.forEach(bus => {
        const busElement = document.createElement('li');
        busElement.classList.add('bus-item');
        busElement.innerHTML = `
            <p><strong>Bus Number:</strong> ${bus.number}</p>
            <p><strong>Route:</strong> ${bus.route}</p>
            <p><strong>Status:</strong> ${bus.status}</p>
        `;
        busListContainer.appendChild(busElement);
    });
}

// Handle form submission
document.getElementById('bus-management-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const busNumber = document.getElementById('bus-number').value;
    const route = document.getElementById('route').value;
    const status = document.getElementById('status').value;

    // Check if bus already exists
    const existingBusIndex = buses.findIndex(bus => bus.number === busNumber);

    if (existingBusIndex > -1) {
        // Update existing bus
        buses[existingBusIndex] = { number: busNumber, route: route, status: status };
    } else {
        // Add new bus
        buses.push({ number: busNumber, route: route, status: status });
    }

    // Clear form fields
    document.getElementById('bus-number').value = '';
    document.getElementById('route').value = '';
    document.getElementById('status').value = '';

    // Display updated bus list
    displayBusList();
});

// Initialize bus list when the page loads
document.addEventListener('DOMContentLoaded', displayBusList);
// Sample data for sensor information (in a real application, this should come from a server or live feed)
const sensorData = [
    { busId: 1, capacity: 40, boarding: 5, alighting: 3 },
    { busId: 2, capacity: 50, boarding: 2, alighting: 1 }
];

// Function to display sensor data
function displaySensorData() {
    const sensorDataList = document.getElementById('sensor-data-list');
    sensorDataList.innerHTML = ''; // Clear existing content

    sensorData.forEach(data => {
        const sensorElement = document.createElement('li');
        sensorElement.classList.add('sensor-data-item');
        sensorElement.innerHTML = `
            <p><strong>Bus ID:</strong> ${data.busId}</p>
            <p><strong>Capacity:</strong> <span class="capacity">${data.capacity}</span></p>
            <p><strong>Boarding:</strong> <span class="boarding">${data.boarding}</span></p>
            <p><strong>Alighting:</strong> <span class="alighting">${data.alighting}</span></p>
        `;
        sensorDataList.appendChild(sensorElement);
    });
}

// Function to simulate live updates (for demonstration purposes)
function simulateSensorUpdates() {
    setInterval(() => {
        sensorData.forEach(data => {
            // Simulate changing sensor values
            data.boarding = Math.floor(Math.random() * 10);
            data.alighting = Math.floor(Math.random() * 10);
        });
        displaySensorData();
    }, 5000); // Update every 5 seconds
}

// Call simulateSensorUpdates for demonstration
simulateSensorUpdates();
// Sample data for reports (in a real application, this should come from a server)
const reports = {
    utilization: [
        { busId: 1, utilization: '75%' },
        { busId: 2, utilization: '60%' }
    ],
    efficiency: [
        { routeId: 1, efficiency: '80%' },
        { routeId: 2, efficiency: '70%' }
    ],
    peakHours: [
        { routeId: 1, peakHour: '08:00 - 09:00' },
        { routeId: 2, peakHour: '18:00 - 19:00' }
    ],
    payment: [
        { routeId: 1, totalCollection: '$5000' },
        { routeId: 2, totalCollection: '$3000' }
    ]
};

// Function to generate and display the selected report
function generateReport() {
    const reportType = document.getElementById('report-type').value;
    const reportOutput = document.getElementById('report-output');
    reportOutput.innerHTML = ''; // Clear existing content

    let reportHtml = '<h3>' + reportType.replace(/-/g, ' ').toUpperCase() + '</h3><table><thead><tr>';

    // Define table headers based on report type
    if (reportType === 'utilization') {
        reportHtml += '<th>Bus ID</th><th>Utilization</th>';
    } else if (reportType === 'efficiency') {
        reportHtml += '<th>Route ID</th><th>Efficiency</th>';
    } else if (reportType === 'peak-hours') {
        reportHtml += '<th>Route ID</th><th>Peak Hour</th>';
    } else if (reportType === 'payment') {
        reportHtml += '<th>Route ID</th><th>Total Collection</th>';
    }

    reportHtml += '</tr></thead><tbody>';

    // Populate table rows based on selected report type
    reports[reportType].forEach(item => {
        reportHtml += '<tr>';
        for (const key in item) {
            reportHtml += `<td>${item[key]}</td>`;
        }
        reportHtml += '</tr>';
    });

    reportHtml += '</tbody></table>';
    reportOutput.innerHTML = reportHtml;
}

// Add event listener to the generate report button
document.getElementById('generate-report').addEventListener('click', generateReport);
document.getElementById('booking-form-content').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const name = document.getElementById('passenger-name').value;
    const contactInfo = document.getElementById('contact-info').value;
    const paymentMethod = document.getElementById('payment-method').value;

    if (selectedStartStop && selectedEndStop && name && contactInfo && paymentMethod) {
        // Process the booking (e.g., send data to server or show confirmation)
        alert(`Booking Confirmed!\n\nName: ${name}\nContact Info: ${contactInfo}\nPayment Method: ${paymentMethod}\nRoute: ${selectedStartStop.name} to ${selectedEndStop.name}\nEstimated Fare: $${calculateFare(selectedStartStop, selectedEndStop).toFixed(2)}`);
        
        // Clear form fields after submission
        document.getElementById('booking-form-content').reset();
        document.getElementById('start-point-value').textContent = 'None';
        document.getElementById('end-point-value').textContent = 'None';
        document.getElementById('fare-value').textContent = '$0.00';
        selectedStartStop = null;
        selectedEndStop = null;
    } else {
        alert('Please complete all fields and select a route.');
    }
});

