const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const app = express();

// Middleware
app.use(express.json()); // Allows the server to accept and parse JSON data
app.use(cors()); // Use cors middleware to allow requests from your frontend

// Connect to MongoDB
const dbURI = 'mongodb://localhost:27017/'; // Replace with your actual connection string

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas!'))
.catch(err => console.error('Could not connect to MongoDB Atlas...', err));

// Define a Mongoose Schema and Model
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model('Contact', contactSchema);


app.get("/",async(req,res)=>{
    res.render("./index.html");
});

app.post('/api/contact', async (req, res) => {
    try {
        const newContact = new Contact({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });

        // Use a more explicit way to handle the save operation
        await newContact.save()
            .then(savedDoc => {
                console.log('Document saved successfully:', savedDoc);
                res.status(201).send({ message: 'Contact form submitted successfully!' });
            })
            .catch(err => {
                console.error('Error saving document:', err);
                res.status(500).send({ message: 'Error saving to database.' });
            });
            
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send({ message: 'Internal server error.' });
    }
});

// Set up the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));