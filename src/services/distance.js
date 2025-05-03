// Mock function to calculate distance between two addresses
const calculateDistance = async (pickupAddress, destinationAddress) => {
    const mockDistances = {
        'London': {
            'Heathrow Airport': 25,
            'Gatwick Airport': 45,
            'Stansted Airport': 60
        },
        'Paris': {
            'Charles de Gaulle Airport': 30,
            'Orly Airport': 20
        },
        'Berlin': {
            'Tegel Airport': 15,
            'Schönefeld Airport': 25
        }
    };

    // Simple mock logic - returns random distance if not in predefined list
    const cityMatch = Object.keys(mockDistances).find(city => 
        pickupAddress.includes(city) || destinationAddress.includes(city)
    );

    if (cityMatch) {
        const airports = Object.keys(mockDistances[cityMatch]);
        const airport = airports.find(airport => 
            destinationAddress.includes(airport) || pickupAddress.includes(airport)
        );
        
        if (airport) {
            return mockDistances[cityMatch][airport];
        }
    }

    // Return a random distance between 5 and 50 km for unknown routes
    return Math.floor(Math.random() * 45) + 5;
};

module.exports = {
    calculateDistance
}; 