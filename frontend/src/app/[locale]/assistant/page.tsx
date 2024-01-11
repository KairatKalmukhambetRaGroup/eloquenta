"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

import '@/styles/assistant.scss';
import { useRouter } from 'next/navigation';

const prompts = [
    'Can you provide a useful language learning tip?', 
    "Share insights into common language learning mistakes and how to overcome them.",
    "Tell me interesting facts about language diversity worldwide."
]

const Assistant = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const router = useRouter();
    const sendMessage = async (e: any) => {
        e.preventDefault();
        let value = input.trim();
        if(!value){
            setInput('');
            return;
        }
        let newMessages = [...messages, {role: 'user', content: value}];
        setMessages(newMessages);
        try {
            setInput('');
            setLoading(true);
            const {data} = await axios.post('/api/chat', {messages: newMessages}, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            setLoading(false);
            setMessages((prev) => [...prev, {role: 'assistant', content: data.reply}]);
        } catch (error) {
            console.log('Error', error);
        }
    }
    const sendPrompt = async (value: any) => {
        setInput('');
        let newMessages = [...messages, {role: 'user', content: value}];
        setMessages(newMessages);
        try {
            setInput('');
            setLoading(true);
            const {data} = await axios.post('/api/chat', {messages: newMessages}, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            setLoading(false);
            setMessages((prev) => [...prev, {role: 'assistant', content: data.reply}]);
        } catch (error) {
            console.log('Error', error);
        }
    }

    return (
        <div id="assistantPage">
            <div className="chat-header">
                <div className="name">
                    <i></i>
                    Teacher AI
                </div>
                <span className='close' onClick={(e)=>{e.preventDefault(); router.back()}}>
                    <i></i>
                </span>
            </div>
            <div className="chat-body">
                {!messages || messages.length == 0 ? 
                    (
                        <div className="propmts">
                            <div className="heading">Type something like:</div>
                            {prompts.map((prompt, key)=>(
                                <div key={key} className="propmt" onClick={(e)=>{e.preventDefault(); sendPrompt(prompt)}}>
                                    {prompt}
                                </div>
                            ))}
                        </div>
                    ) 
                    :
                    messages.map((message, key) => (
                        <div key={key} className={`message ${message.role === 'user' ? 'user' : 'bot'}`}>
                            {message.content}
                        </div>
                    ))
                }
                {loading && 
                    <div className='message bot'><span className='loader'></span></div>
                }
            </div>
            <form onSubmit={sendMessage} className='chat-footer'>
                <input type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} placeholder='Ask AI' />
                <button type="submit"><i></i></button>
            </form>
        </div>
    )
}

export default Assistant