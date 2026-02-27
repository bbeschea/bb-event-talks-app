// Placeholder data (will be used directly in the final single HTML file)
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

document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule');
    const categorySearchInput = document.getElementById('categorySearch');
    let allScheduleItems = []; // To store talks and breaks with calculated times

    // Function to calculate and render the schedule
    function renderSchedule(filterCategory = '') {
        // Start time for the event
        let currentTime = new Date();
        currentTime.setHours(10, 0, 0); // Event starts at 10:00 AM

        scheduleContainer.innerHTML = ''; // Clear previous schedule

        const scheduledTalks = [];
        let talkIndex = 0;

        talksData.forEach((talk, i) => {
            // Add lunch break after the 3rd talk
            if (i === 3) {
                const lunchStartTime = new Date(currentTime.getTime());
                const lunchEndTime = new Date(lunchStartTime.getTime() + 60 * 60 * 1000); // 1 hour lunch
                scheduledTalks.push({
                    type: 'break',
                    title: 'Lunch Break',
                    startTime: lunchStartTime,
                    endTime: lunchEndTime,
                    description: 'Enjoy your meal!'
                });
                currentTime = new Date(lunchEndTime.getTime()); // Update current time after lunch
            }

            const talkStartTime = new Date(currentTime.getTime());
            const talkEndTime = new Date(talkStartTime.getTime() + talk.durationMinutes * 60 * 1000);
            
            scheduledTalks.push({
                type: 'talk',
                ...talk,
                startTime: talkStartTime,
                endTime: talkEndTime
            });

            currentTime = new Date(talkEndTime.getTime() + 10 * 60 * 1000); // Add 10 mins transition
        });

        allScheduleItems = scheduledTalks; // Store all calculated schedule items

        displayFilteredSchedule(filterCategory);
    }

    function displayFilteredSchedule(filterCategory) {
        scheduleContainer.innerHTML = ''; // Clear previous schedule
        allScheduleItems.forEach(item => {
            if (item.type === 'talk') {
                const matches = filterCategory === '' || item.category.some(cat => cat.toLowerCase().includes(filterCategory.toLowerCase()));
                if (matches) {
                            const talkCard = document.createElement('div');
                            talkCard.classList.add('talk-card');
                            talkCard.innerHTML = `
                                <div class="time">${item.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${item.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                <h3>${item.title}</h3>
                                <div class="speakers">Speakers: ${item.speakers.join(', ')}</div>
                                <div class="description">${item.description}</div>
                                <div class="categories">
                                    ${item.category.map(cat => `<span class="category">${cat}</span>`).join('')}
                                </div>
                            `;
                            scheduleContainer.appendChild(talkCard);
                        }
                    } else if (item.type === 'break') {
                        const breakCard = document.createElement('div');
                        breakCard.classList.add('break-card');
                        breakCard.innerHTML = `
                            <div class="time">${item.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${item.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        `;
                        scheduleContainer.appendChild(breakCard);
                    }
                });
            }

            // Initial render
            renderSchedule();

            // Event listener for category search
            categorySearchInput.addEventListener('input', (event) => {
                displayFilteredSchedule(event.target.value);
            });
        });
