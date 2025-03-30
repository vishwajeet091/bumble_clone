// src/components/ChatList.js
import React from 'react';
import styled from 'styled-components';

const ChatList = ({ chats, users, activeChat, setActiveChat }) => {
  return (
    <ChatListContainer>
      <ChatListHeader>
        <h2>Messages</h2>
      </ChatListHeader>
      <ChatItems>
        {chats.length === 0 ? (
          <EmptyState>No messages yet</EmptyState>
        ) : (
          chats.map(chat => {
            const user = users.find(u => u.id === chat.userId);
            const lastMessage = chat.messages.length > 0 
              ? chat.messages[chat.messages.length - 1] 
              : null;
              
            return (
              <ChatItem 
                key={chat.id} 
                active={chat.id === activeChat}
                onClick={() => setActiveChat(chat.id)}
              >
                <ChatAvatar src={user?.images[0]} alt={user?.name} />
                <ChatDetails>
                  <ChatName>{user?.name}</ChatName>
                  <LastMessage>
                    {lastMessage 
                      ? `${lastMessage.sender === 'you' ? 'You: ' : ''}${lastMessage.text}` 
                      : 'Start a conversation!'}
                  </LastMessage>
                </ChatDetails>
                {lastMessage && <TimeStamp>{lastMessage.timestamp}</TimeStamp>}
              </ChatItem>
            );
          })
        )}
      </ChatItems>
    </ChatListContainer>
  );
};

const ChatListContainer = styled.div`
  width: 300px;
  border-right: 1px solid var(--bumble-gray);
  background-color: var(--bumble-white);
  display: flex;
  flex-direction: column;
`;

const ChatListHeader = styled.div`
  padding: 15px;
  border-bottom: 1px solid var(--bumble-gray);
  
  h2 {
    font-size: 1.2rem;
    color: var(--bumble-black);
  }
`;

const ChatItems = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ChatItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  border-bottom: 1px solid var(--bumble-light-gray);
  background-color: ${props => props.active ? 'rgba(255, 198, 41, 0.1)' : 'transparent'};
  
  &:hover {
    background-color: var(--bumble-light-gray);
  }
`;

const ChatAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
`;

const ChatDetails = styled.div`
  flex: 1;
  overflow: hidden;
`;

const ChatName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const LastMessage = styled.div`
  font-size: 0.9rem;
  color: gray;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TimeStamp = styled.div`
  font-size: 0.8rem;
  color: gray;
`;

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: gray;
  font-size: 0.9rem;
  padding: 20px;
  text-align: center;
`;

export default ChatList;