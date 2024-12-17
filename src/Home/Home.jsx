import React, { useEffect, useState, useRef } from 'react';
import './home.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
//import DummyResponses, { randomSelectResponse } from '../DummyResponses/DummyResponses';
//import { HfInference } from "@huggingface/inference";



const Home = ({ welcomeMsg }) => {
    const [showWelcomeMsg, setShowWelcomeMsg] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isUserInputSelected, setIsUserInputSelected] = useState(false)
    const [isBotMessageReady, setIsBotMessageReady] = useState(false);
    const [latestBotMessageIndex, setLatestBotMessageIndex] = useState(null);

    

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) alert("Current browser does not support speech recognition!!");

    const chatHistoryRef = useRef(null);
    const textAreaRef = useRef(null); 

    window.onbeforeunload = function() {
        return "Data will be lost if you leave the page, are you sure?";
    };

    //const dummyResponse = randomSelectResponse(DummyResponses)
    
    

    



//chatCompletion.choices[0].message

    useEffect(() => {
        const hasLaunchedThisSession = sessionStorage.getItem('hasLaunchedThisSession');

        if (!hasLaunchedThisSession) {
            setShowWelcomeMsg(true);
            sessionStorage.setItem('hasLaunchedThisSession', 'true'); 

            const timer = setTimeout(() => {
                setShowWelcomeMsg(false);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        if (chatHistoryRef.current) {
            // Scroll to the bottom of the chat history
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [chatHistory]);

    // Function to adjust textarea height
    const adjustTextAreaHeight = (textArea) => {
        textArea.style.height = 'auto'; // Reset height
        if (textArea.scrollHeight > textArea.offsetHeight) {
            textArea.style.height = `${textArea.scrollHeight}px`; // Adjust height when wrapping to a new line
        }
    };

    useEffect(() => {
        if (transcript) {
            setUserInput(transcript);
            if (textAreaRef.current) {
                adjustTextAreaHeight(textAreaRef.current); // Adjust height when setting from transcript
            }
        }
    }, [transcript]); 


    const toggleUserInputSelected = () => {
        setIsUserInputSelected(prev => !prev)
    }

    const handleSubmitQuestion = async () => {
        if (userInput.trim()) {
            const userMessage = userInput;
    
            setChatHistory(prevHistory => [
                ...prevHistory,
                { user: userMessage, bot: "..." }
            ]);
    
            setUserInput('');
            resetTranscript();
            setIsBotMessageReady(false);
    
            try {
                const response = await fetch('https://chat-bot-server-api-mistralai.onrender.com/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: userMessage }),
                });
    
                const data = await response.json();
    
                if (data.botMessage) {

                    setChatHistory(prevHistory => {
                        const updatedHistory = [...prevHistory];
                        updatedHistory[updatedHistory.length - 1] = { user: userMessage, bot: data.botMessage };
                        return updatedHistory;
                    });
    
                    setIsBotMessageReady(true);
                    setLatestBotMessageIndex(chatHistory.length);
                } else {
                    console.error("No bot response received:", data);
                }
            } catch (error) {
                console.error("Error while fetching bot response:", error);
                setChatHistory(prevHistory => [
                    ...prevHistory,
                    { user: userMessage, bot: "An error occurred while getting the bot response." }
                ]);
            }
        }
    };
    


    const handleOutsideClick = (e)=>{
        if (textAreaRef.current && !textAreaRef.current.contains(e.target)){
            setIsUserInputSelected(false)
        }
    }


    useEffect(()=>{
        document.addEventListener('mousedown', handleOutsideClick)
        return ()=>document.removeEventListener('mousedown', handleOutsideClick)
    },[])

   
    
  
    return (
        <div className="home-page">
            { /*<p>Mic: {listening ? "on" : "off"}</p>
            <p>Transcript: {transcript}</p>
            <button onClick={resetTranscript}>Reset</button>*/}
            
            {welcomeMsg && showWelcomeMsg && !userInput && !chatHistory.length && (
                <section className='welcome-section'>
                    <h2 className='welcome-text'>{welcomeMsg}</h2>
                </section>
            )}
            
            {chatHistory.length ? null : (
                <section className="home-section questions-carousels">Sample Question Carousel</section>
            )}
            
            <section className={`home-section ${isUserInputSelected ? 'user-input-selected' : 'user-input'}`}>
                <span className="add-document-btn">
                    <img
                        className='user-input-image-left'
                        width="24"
                        height="24"
                        src="https://img.icons8.com/parakeet-line/48/add.png"
                        alt="add"
                    />
                </span>
                
                <span className="user-message">
                    <textarea
                        ref={textAreaRef} // Attach ref to textarea
                        className="user-message-input"
                        rows="1"
                        value={userInput}
                        onChange={e => {
                            setUserInput(e.target.value);
                            adjustTextAreaHeight(e.target); // Adjust height on manual input
                        }}
                        placeholder="Type your message..."
                        onFocus={toggleUserInputSelected}
                        
                    ></textarea>
                </span>
                
                {!listening && <span className="user-submit-btn" onClick={()=>SpeechRecognition.startListening({ continuous: true })
                }>
                    <img
                        width="28"
                        height="28"
                        className='user-input-image-right'
                        src="https://img.icons8.com/sf-regular-filled/48/microphone.png"
                        alt="microphone"
                    />
                </span>}
                {listening && <span className="user-submit-btn" onClick={SpeechRecognition.stopListening}>
                    <img
                        width="28"
                        height="28"
                        className='user-input-image-right'
                        src="https://img.icons8.com/flat-round/48/stop.png"
                        alt="stop"
                    />
                </span>}
                <span className="user-submit-btn" onClick={handleSubmitQuestion}>
                    <img
                        width="28"
                        height="28"
                        className='user-input-image-right'
                        src="https://img.icons8.com/sf-regular-filled/48/paper-plane.png"
                        alt="send"
                    />
                </span>
            </section>
            
            {chatHistory.length ? null : (
                <section className="home-section others">Others</section>
            )}
            
            {chatHistory.length ? (
                <section className="home-section chat-history" ref={chatHistoryRef}>
                    {chatHistory.map((chat, index) => (
                        <div key={index} className="chat-message">
                             <p className='chat-message-section chat-history-user'>
                                 <span className='user-image'>
                                     <img width="40" height="40" src="https://img.icons8.com/bubbles/50/user.png" alt="user"/>
                                 </span>
                                 <span className='user-msg scale-in-bl'>{chat.user}</span>
                             </p>
                             <p className='chat-message-section chat-history-bot'>
                                 <span className={`bot-msg ${isBotMessageReady && latestBotMessageIndex === index ? 'scale-in-br' : ''}`}><ReactMarkdown children={chat.bot} remarkPlugins={[remarkGfm]} /></span>
                                 <span className='bot-image'>
                                     <img width="40" height="40" src="https://img.icons8.com/ios-filled/50/bot.png" alt="bot"/>
                                 </span>
                             </p>
                        </div>
                    ))}
                </section>
            ) : null}
        </div>
    );
};

export default Home;
