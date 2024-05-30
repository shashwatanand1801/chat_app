async function llm(prompt) {
    return new Promise((resolve) => {
        const timeout = Math.random()*(15000*5000) + 5000;
        setTimeout(() => {
            resolve('This is a mock response from the LLM based on user input');
        }, timeout);
    });
};

function executeWithinLimit(fn, timeout, onTimeout) {
    let timeoutReached = false;

    // Set the timeout
    const timer = setTimeout(() => {
        timeoutReached = true;
        onTimeout();
    }, timeout);

    // Execute the main function
    Promise.resolve(fn())
        .then(() => {
            if (!timeoutReached) {
                clearTimeout(timer);
                console.log("Function executed within time limit");
            }
        })
        .catch((error) => {
            if (!timeoutReached) {
                clearTimeout(timer);
                console.error("Function error:", error);
            }
        });
}


function timeoutFunction() {
    console.log("Function took too long, executing timeout function");
}

function getLLMResponse() {
    executeWithinLimit(llm(prompt), 10000, timeoutFunction);
}

module.exports = getLLMResponse;
