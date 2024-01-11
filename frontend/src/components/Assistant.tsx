"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

import '@/styles/assistant.scss';
import Link from 'next/link';

const Assistant = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [openChat, setOpenChat] = useState(false);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
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
    return (
        <div id="assistant">
            <div id="assistantChat"  className={`${openChat ? 'active': ''}`}>
                <div className="chat-header">
                    <div className="name">
                        <i></i>
                        Teacher AI
                    </div>
                    <span className='close'>
                        <i onClick={(e)=>{e.preventDefault(); setOpenChat(false)}}></i>
                    </span>
                </div>
                <div className="chat-body">
                    {messages.map((message, key) => (
                        <div key={key} className={`message ${message.role === 'user' ? 'user' : 'bot'}`}>
                            {message.content}
                        </div>
                    ))}
                    {loading && 
                        <div className='message bot'><span className='loader'></span></div>
                    }
                </div>
                <form onSubmit={sendMessage} className='chat-footer'>
                    <input type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} placeholder='Ask AI' />
                    <button type="submit"><i></i></button>
                </form>
            </div>
            <div id="assistantBtn" onClick={(e)=>{e.preventDefault(); setOpenChat((prev)=>!prev)}}>
                <i></i>
            </div>
            <Link id='assistantLink' href={'/assistant'}>
                <i></i>
            </Link>
        </div>
    )
}

export default Assistant