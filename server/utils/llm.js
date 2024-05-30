import MistralClient from '@mistralai/mistralai';

export default async function llm(prompt) {
    const apiKey = process.env.MISTRAL_API_KEY;

    const client = new MistralClient(apiKey);

    const chatResponse = await client.chat({
        model: 'mistral-large-latest',
        messages: [{role: 'user', content: 'The reciever is busy for this message. Rely on this behalf in 2 lines.'}],
    });

    ans = chatResponse.choices[0].message.content

    console.log('Chat:', ans);

    return ans;
}