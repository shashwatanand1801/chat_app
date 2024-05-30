const getLLMResponse = require("./llmMock")

async function fetchWithTimeout(prompt, timeout = 10000) {
    const controller = new AbortController();
    const signal = controller.signal;
    
    // Create a timeout to abort the fetch after the given time
    const fetchTimeout = setTimeout(() => {
      controller.abort();
    }, timeout);
    
    try {
        const response = await getLLMResponse(prompt)
        clearTimeout(fetchTimeout); // Clear the timeout if fetch completes in time
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        return new Promise.resolve('The person is not available right now!');
      } else {
        throw error; // Rethrow any other error
      }
    }
  }
  

  module.exports = fetchWithTimeout;