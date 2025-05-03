const express = require('express');
const router = express.Router();
const { calculateDistance } = require('../services/distance');
const { calculatePrice } = require('../services/pricing');

router.post('/check-email-required', async (req, res) => {
    try {
        const { pickupAddress, destinationAddress, city, vehicleType = 'Economy' } = req.body;

        // Validate required fields
        if (!pickupAddress || !destinationAddress || !city) {
            return res.status(400).json({
                error: 'Missing required fields: pickupAddress, destinationAddress, city'
            });
        }

        // Calculate distance using mock logic
        const distance = await calculateDistance(pickupAddress, destinationAddress);

        // Check if distance is too far
        if (distance > 1000) {
            return res.status(422).json({
                error: 'Too far to offer ride'
            });
        }

        // Calculate price
        let price;
        try {
            price = calculatePrice(city, vehicleType, distance, pickupAddress, destinationAddress);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }

        // Logic to determine if email is required
        const isEmailRequired = (
            distance > 30 || 
            price < 50 || 
            !['London', 'Paris'].includes(city) 
        );

        
        console.log({ distance, price, city, vehicleType, isEmailRequired });

        res.json(isEmailRequired);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            error: error.message || 'Internal server error'
        });
    }
});

module.exports = router; 