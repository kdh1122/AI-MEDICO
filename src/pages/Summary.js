import React, { useState, useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai'; // 필요한 모듈 임포트
import InitState from './InitState';
import TopMenu from '../components/TopMenu';

function Summary(props) {
    const [chatHistory, setChatHistory] = useState([]);
    const [summary, setSummary] = useState('');  // 요약된 내용을 저장할 상태
    const [openaiInstance, setOpenAIInstance] = useState(null);

    useEffect(() => {
        // OpenAI 인스턴스 설정
        const configuration = new Configuration({
            apiKey: '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',  // 여기에 API 키를 넣거나 환경 변수를 사용하세요.
        });
        setOpenAIInstance(new OpenAIApi(configuration));

        // 페이지 로드 시 저장된 채팅 내역을 불러옴
        const storedChatHistory = localStorage.getItem('chatHistory');
        if (storedChatHistory) {
            setChatHistory(JSON.parse(storedChatHistory));
        }
    }, []);

    useEffect(() => {
        const getSummary = async (content) => {
            const instruction = "요약: " + content;
            
            try {
                const completion = await openaiInstance.createChatCompletion({
                    model: 'gpt-3.5-turbo',
                    temperature: 0.5,
                    max_tokens: 1025,
                    messages: [{ role: 'user', content: instruction }],
                });
                return completion.data.choices[0].message.content;
            } catch (error) {
                console.error(error);
                return "요약 중 오류가 발생했습니다.";
            }
        };

        const generateSummary = async () => {
            const result = await getSummary(chatHistory.join(" "));
            setSummary(result);
        };

        if (chatHistory.length) {
            generateSummary();
        }
    }, [chatHistory, openaiInstance]);

    return (
        <div style={styles.container}>
            <InitState />
            <TopMenu />
            <div style={styles.content}>
            <div style={styles.left}>
    <h2>번역 내용</h2>
    <ul style={styles.list}>
        {chatHistory.map((message, index) => (
            <li key={index} style={styles.listItem}>{message}</li>
        ))}
    </ul>
</div>


                <div style={styles.right}>
                    <div style={styles.template}>
                        <h2>요약본</h2>
                        <p style={styles.summary}>{summary}</p>
                    </div>
                </div>
            </div>
            <button style={styles.button} onClick={() => props.history.push('/Polly')}>Back to Main</button>
        </div>
    );
}

export default Summary;

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: 1200,
        margin: '2rem auto',
        padding: '2rem',
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: '1rem',
    },
    left: {
        flex: 1,
        padding: '1rem',
        borderRight: '1px solid #ccc',
    },
    right: {
        flex: 1,
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    template: {
        width: '80%',
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    },

    list: {
        listStyleType: 'none',
        paddingLeft: 0,
        margin: 0,
    },
    listItem: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '1rem',
        alignItems: 'center',
    },
    listItemRight: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1rem',
        alignItems: 'center',
    },
    message: {
        padding: '0.5rem 1rem',
        borderRadius: '10px',
        maxWidth: '70%',
    },
    inputMessage: {
        backgroundColor: '#f0f0f0',
        marginRight: '2rem',
    },
    translatedMessage: {
        backgroundColor: '#007bff',
        color: 'white',
        marginLeft: '2rem',
    },
};