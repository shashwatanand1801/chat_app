async function getLLMResponse(prompt) {
    return new Promise((resolve) => {
    const timeout = 10;
    setTimeout(() => {
    resolve('This is a mock response from the LLM based on user input');
    }, timeout);
    });
    };


module.exports = getLLMResponse