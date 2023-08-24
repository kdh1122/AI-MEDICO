import React, { useState, useEffect, useRef } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './Polly.css';
import { useHistory, Link } from 'react-router-dom';

import InitState from './InitState';
import TopMenu from '../components/TopMenu';

import Summary from './Summary';

function Transcribe(props) {
    return (
        <div>
            <InitState/>
            <TopMenu />
            <Polly />
            <button className="back-button" onClick={() => props.history.push('/')}>Back to Main</button>
        </div>
    );
}


function Polly () {
    const history = useHistory(); // Initialize useHistory
    const [chatMessages, setChatMessages] = useState([]);
    const [typedMessage, setTypedMessage] = useState("");
    const { transcript, resetTranscript, listening } = useSpeechRecognition();
    const [openaiInstance, setOpenAIInstance] = useState(null);
    const chatBoxRef = useRef(null); // chatBoxRef 생성
    const [showChatHistoryVisible, setShowChatHistoryVisible] = useState(false);

    useEffect(() => {
        const configuration = new Configuration({
            apiKey: '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',
        });
        setOpenAIInstance(new OpenAIApi(configuration));
    }, []);

    useEffect(() => {
        setTypedMessage(transcript);
    }, [transcript]);

    // chatMessages 상태가 변경될 때 스크롤 조절하는 useEffect
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chatMessages]);

    const handleSend = async () => {
        if (!openaiInstance) return;

        if (typedMessage.trim() === '') {
            return;

        }

        const updatedChatMessages = [...chatMessages, { content: typedMessage, role: 'user' }];
        setChatMessages(updatedChatMessages);
        
        
        try {
            const assistantMessage = await getAssistantReply(typedMessage);
            const updatedChatMessagesWithResponse = [...updatedChatMessages, { content: assistantMessage, role: 'assistant' }];
            setChatMessages(updatedChatMessagesWithResponse);
            resetTranscript();
            setTypedMessage("");
            

        } catch (error) {
            console.error(error);
        }
    };
    
    const handleChatEnd = () => {
        // 전체 채팅 내역을 새 페이지로 전달하고 이동
        const chatHistory = chatMessages.map(message => message.content);
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        history.push('/Summary');
    };

    const getAssistantReply = async (userMessage) => {
        let instruction = "";
        if (/[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/g.test(userMessage)) {
            instruction = "Please translate the following Korean sentence into English.You can only speak translation";
        } else {
            instruction = "Please translate the following English sentence into Korean.You can only speak translation";
        }
    
        const messages = [
            { role: 'system', content: instruction },
            { role: 'user', content: userMessage }
        ];
    
        try {
            const completion = await openaiInstance.createChatCompletion({
                model: 'gpt-3.5-turbo',
                temperature: 0.5,
                max_tokens: 1025,
                messages: messages,
            });
            return completion.data.choices[0].message.content;
        } catch (error) {
            throw error;
        }
    };

    const toggleVoiceRecording = () => {
        if (listening) {
            SpeechRecognition.stopListening();
        } else {
            SpeechRecognition.startListening({ continuous: true }); // 계속적으로 음성을 인식합니다.
        }
    };
    


    return (
        <div className="polly-container">
            <h1>TalkBot</h1>
            {listening ? <p>Listening…</p> : null}
            <div className="input-box">
                <button 
                    onClick={toggleVoiceRecording}
                    className={listening ? "stop-voice" : "start-voice"}
                >
                    {listening ? "Stop Voice" : "Start Voice"}
                </button>
                
                <input 
                    type="text" 
                    placeholder="Type your text here…"
                    value={typedMessage}
                    onChange={(e) => setTypedMessage(e.target.value)}
                />
                <button onClick={handleSend}>Send</button>

                <button onClick={resetTranscript}>Delete</button>
                
                <button onClick={handleChatEnd}>End Chat and Show History</button>
            </div>
            <div className="chat-box" ref={chatBoxRef}>
                {chatMessages.map((message, index) => (
                    <div key={index} className={`chat-message ${message.role}`}>
                        <p>{message.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default Transcribe;


const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: { marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}