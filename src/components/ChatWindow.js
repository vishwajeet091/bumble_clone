// src/components/ChatWindow.js
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaPaperPlane } from 'react-icons/fa';

const ChatWindow = ({ chat, user, sendMessage }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  if (!chat || !user) {
    return (
      <EmptyChatWindow>
        <EmptyStateMessage>Select a conversation or start swiping to match!</EmptyStateMessage>
      </EmptyChatWindow>
    );
  }

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(chat.id, message);
      setMessage('');
    }
  };

  return (
    <ChatWindowContainer>
      <ChatHeader>
        <UserInfo>
          <UserAvatar src={user.images[0]} alt={user.name} />
          <UserName>{user.name}</UserName>
        </UserInfo>
      </ChatHeader>
      
      <MessagesContainer>
        {chat.messages.length === 0 ? (
          <EmptyStateMessage>Say hello to {user.name}!</EmptyStateMessage>
        ) : (
          chat.messages.map((msg, index) => (
            <MessageBubble key={index} sent={msg.sender === 'you'}>
              <MessageText>{msg.text}</MessageText>
              <MessageTime>{msg.timestamp}</MessageTime>
            </MessageBubble>
          ))
        )}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      
      <MessageInputForm onSubmit={handleSend}>
        <MessageInput 
          type="text" 
          placeholder="Type a message..." 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <SendButton type="submit">
          <FaPaperPlane />
        </SendButton>
      </MessageInputForm>
    </ChatWindowContainer>
  );
};

const ChatWindowContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--bumble-white);
`;

const ChatHeader = styled.div`
  padding: 15px;
  border-bottom: 1px solid var(--bumble-gray);
  display: flex;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const UserName = styled.div`
  font-weight: bold;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 18px;
  align-self: ${props => props.sent ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.sent ? 'var(--bumble-yellow)' : 'var(--bumble-light-gray)'};
  position: relative;
`;

const MessageText = styled.div`
  word-break: break-word;
`;

const MessageTime = styled.div`
  font-size: 0.7rem;
  color: rgba(0, 0, 0, 0.5);
  text-align: right;
  margin-top: 5px;
`;

const MessageInputForm = styled.form`
  display: flex;
  padding: 15px;
  border-top: 1px solid var(--bumble-gray);
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid var(--bumble-gray);
  border-radius: 24px;
  font-size: 1rem;
  outline: none;
  
  &:focus {
    border-color: var(--bumble-yellow);
  }
`;

const SendButton = styled.button`
  width: 45px;
  height: 45px;
  margin-left: 10px;
  background-color: var(--bumble-yellow);
  color: var(--bumble-black);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  
  &:hover {
    background-color: #e6b325;
  }
`;

const EmptyChatWindow = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bumble-white);
`;

const EmptyStateMessage = styled.div`
  color: gray;
  text-align: center;
  padding: 20px;
`;

export default ChatWindow;