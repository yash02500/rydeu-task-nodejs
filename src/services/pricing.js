const pricingSchema = require('../data/pricingSchema.json');

const calculatePrice = (city, vehicleType, distance, pickupAddress, destinationAddress) => {
    // Check if city and vehicle type exist in schema
    if (!pricingSchema[city] || !pricingSchema[city][vehicleType]) {
        throw new Error('Invalid city or vehicle type');
    }

    const pricing = pricingSchema[city][vehicleType];
    let totalPrice = pricing.base;

    // Add price for distance beyond base kilometers
    if (distance > pricing.baseKm) {
        totalPrice += (distance - pricing.baseKm) * pricing.perKm;
    }

    // Add airport fee if destination or pickup contains "airport"
    if (
        (pickupAddress && pickupAddress.toLowerCase().includes('airport')) ||
        (destinationAddress && destinationAddress.toLowerCase().includes('airport'))
    ) {
        totalPrice += pricing.airportFee;
    }

    return Math.round(totalPrice);
};

module.exports = {
    calculatePrice
}; 