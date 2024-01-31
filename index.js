const express = require('express');

const app = express();
let lane1 = 0;
let lane2 = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateTraffic() {
    if (lane1 == 0 && lane2 == 0) {
        lane1 = 1;
    }
    if (lane1 == 1) {
        await sleep(15000);
        lane1 = 0;
        lane2 = 1;
    }
    if (lane2 == 1) {
        await sleep(15000);
        lane1 = 1;
        lane2 = 0;
    }
}

// Start traffic generation loop
setInterval(generateTraffic, 1); // Adjust the interval as needed

const PORT = process.env.PORT || 3000; // Default to port 3000 if PORT environment variable is not set

app.get('/', (request, response) => {
    response.json({ lane1, lane2 });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
