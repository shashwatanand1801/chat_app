const getLLMResponse = require('./llmMock');\

async function callLLM() {
    let llm1Promise = getLLMResponse('prompt for llm1');
    let llm2Promise = getLLMResponse('prompt for llm2');

    let llm1TimeoutReached = false;
    let llm1Response = null;
    let llm2Response = null;

    const llm1Timeout = new Promise((resolve) => {
        setTimeout(() => {
            llm1TimeoutReached = true;
            resolve('timeout');
        }, 10000);
    });

    llm1Response = await Promise.race([llm1Promise, llm1Timeout]);

    if (llm1TimeoutReached) {
        console.log('llm1 did not respond within 10 seconds');
        
        try {
            llm2Response = await Promise.race([llm2Promise, new Promise((resolve) => setTimeout(resolve, 0))]);
            if (llm2Response) {
                console.log('llm2 response:', llm2Response);
                return llm2Response;
            } else {
                console.log('User not available');
                return new Promise((resolve) => setTimeout(() => {
                    resolve('User not available')
                }, 0));
            }
        } catch (error) {
            console.log('Harder output: User not available');
            return new Promise((resolve) => setTimeout(() => {
                resolve('User not available')
            }, 0));
        }
    } else {
        console.log('llm1 response:', llm1Response);
        return llm1Response
    }
}

module.exports = callLLM;
