const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Placeholder data (will be embedded in frontend for serverless version)
const talksData = [
    {
        id: "talk1",
        title: "Introduction to AI in Web Development",
        speakers: ["Alice Johnson"],
        category: ["AI", "Web Development"],
        durationMinutes: 60,
        description: "An overview of how artificial intelligence is changing the landscape of web development, from chatbots to personalized user experiences."
    },
    {
        id: "talk2",
        title: "Modern JavaScript Frameworks",
        speakers: ["Bob Smith", "Carol White"],
        category: ["JavaScript", "Frontend"],
        durationMinutes: 60,
        description: "A deep dive into the latest features and best practices of popular JavaScript frameworks like React, Vue, and Angular."
    },
    {
        id: "talk3",
        title: "CSS-in-JS: Pros and Cons",
        speakers: ["David Green"],
        category: ["CSS", "Frontend"],
        durationMinutes: 60,
        description: "Exploring the benefits and drawbacks of using CSS-in-JS solutions for styling modern web applications."
    },
    {
        id: "talk4",
        title: "Backend Development with Node.js & Express",
        speakers: ["Eve Black"],
        category: ["Node.js", "Backend"],
        durationMinutes: 60,
        description: "Building scalable and efficient RESTful APIs using Node.js and the Express framework."
    },
    {
        id: "talk5",
        title: "Database Design for Web Applications",
        speakers: ["Frank Blue"],
        category: ["Database", "Backend"],
        durationMinutes: 60,
        description: "Best practices for designing relational and NoSQL databases to support robust web applications."
    },
    {
        id: "talk6",
        title: "DevOps for Frontend Developers",
        speakers: ["Grace Pink", "Harry Brown"],
        category: ["DevOps", "Frontend"],
        durationMinutes: 60,
        description: "An introduction to DevOps principles and tools relevant for frontend developers, including CI/CD pipelines."
    }
];

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint for talks data
app.get('/api/talks', (req, res) => {
    res.json(talksData);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
