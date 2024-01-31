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

app.get('/traffic-status', (request, response) => {
    response.json({ lane1, lane2 });
});

app.listen(3000, () => {
    console.log(`Server is listening on port 3000`);
});
