// src/App.js
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { FaPaperPlane, FaImage, FaBell, FaCog } from 'react-icons/fa';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to Bumble Chat! How can I help you today?", sender: "bot", timestamp: "10:30 AM" }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello there! How are you doing today?";
    } else if (lowerMessage.includes('how are you')) {
      return "I'm doing great, thanks for asking! How can I help you?";
    } else if (lowerMessage.includes('bye')) {
      return "Goodbye! Feel free to chat again anytime!";
    } else if (lowerMessage.includes('name')) {
      return "I'm Bumble Bot, your friendly assistant!";
    } else if (lowerMessage.includes('thank')) {
      return "You're welcome! I'm happy to help.";
    } else {
      return "That's interesting! Tell me more or ask me something else.";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const newImageMessage = {
        id: messages.length + 1,
        image: event.target.result,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages([...messages, newImageMessage]);
      
      // Simulate bot response to the image
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "Thanks for sharing that image with me!",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    };
    
    reader.readAsDataURL(file);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <AppContainer>
      <HeaderContainer>
        <HeaderContent>
          <IconButton>
            <FaCog />
          </IconButton>
          
          <LogoContainer>
            <LogoBubble />
            <LogoText>Bumble Chat</LogoText>
            <LogoAccent />
          </LogoContainer>
          
          <IconButton>
            <FaBell />
          </IconButton>
        </HeaderContent>
        <HeaderShadow />
      </HeaderContainer>
      
      <ChatContainer>
        <MessagesContainer>
          {messages.map((message) => (
            <MessageBubble key={message.id} sender={message.sender}>
              {message.text && <MessageText>{message.text}</MessageText>}
              {message.image && <MessageImage src={message.image} alt="User uploaded" />}
              <MessageTime>{message.timestamp}</MessageTime>
            </MessageBubble>
          ))}
          <div ref={messagesEndRef} />
        </MessagesContainer>
        
        <InputContainer>
          <ImageButton onClick={() => fileInputRef.current.click()}>
            <FaImage />
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
          </ImageButton>
          <MessageInput 
            type="text" 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
          />
          <SendButton onClick={handleSendMessage}>
            <FaPaperPlane />
          </SendButton>
        </InputContainer>
      </ChatContainer>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
`;

const HeaderContainer = styled.header`
  background-color: #FFC629;
  padding: 16px;
  position: relative;
  z-index: 10;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const LogoBubble = styled.div`
  width: 22px;
  height: 22px;
  background-color: #333;
  border-radius: 50%;
  margin-right: 12px;
`;

const LogoText = styled.h1`
  font-size: 1.6rem;
  font-weight: 800;
  color: #333;
  margin: 0;
  letter-spacing: -0.5px;
  font-family: 'Poppins', 'Segoe UI', sans-serif;
`;

const LogoAccent = styled.div`
  width: 8px;
  height: 8px;
  background-color: white;
  border: 2px solid #333;
  border-radius: 50%;
  margin-left: 8px;
  position: relative;
  top: -8px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const HeaderShadow = styled.div`
  position: absolute;
  bottom: -6px;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.07), transparent);
  z-index: 5;
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  align-self: ${props => props.sender === 'user' ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.sender === 'user' ? '#FFC629' : '#FFFFFF'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const MessageText = styled.p`
  margin: 0;
  line-height: 1.4;
  word-wrap: break-word;
`;

const MessageImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
`;

const MessageTime = styled.span`
  display: block;
  font-size: 0.7rem;
  color: #777;
  margin-top: 5px;
  text-align: right;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: white;
  border-radius: 24px;
  margin-top: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const MessageInput = styled.input`
  flex: 1;
  border: none;
  padding: 10px;
  font-size: 1rem;
  outline: none;
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFC629;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e6b325;
  }
`;

const ImageButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #555;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #FFC629;
  }
`;

export default App;