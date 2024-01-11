import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI();

export async function GET(){
    try {
        const welcomeMessage = await getWelcomeMessage();
        // const welcomeMessage = 'You are ChatGPT, a large language model trained by OpenAI.'
        return NextResponse.json({welcome_message: welcomeMessage});
    } catch (error) {
        console.log(error);
        return NextResponse.json(error, {status: 500})
    }
}

export async function POST(req) {
    const { messages }  = await req.json();
    const reply = await generateReply(messages);
    return NextResponse.json({reply});
}

async function getWelcomeMessage() {
    const welcomePrompt = `You are ChatGPT, a large language model trained by OpenAI.`;
    const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: welcomePrompt }],
        stream: true,
        max_tokens: 50,
    })
    for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
        chunk.choices[0]?.delta?.content
    }
    return stream;
}

async function generateReply(userMessages) {
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a language learning assistant. Please ask questions related to language learning only. And say that you dont know to not related questions.' },
                ...userMessages
            ],
        })
        return completion.choices[0].message.content;
    } catch (error) {
        console.log(error)
        return error;
    }
}