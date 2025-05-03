//entry point for system
const express = require('express');
const path = require('path');
const dotenv = require('dotenv')
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const checkEmailRouter = require('./routes/checkEmail');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.use('/api', checkEmailRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`server running on port ${port}`)
});