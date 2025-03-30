// src/components/ImageSwipe.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHeart, FaTimes } from 'react-icons/fa';

const ImageSwipe = ({ users, onLike }) => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLike = () => {
    onLike(users[currentUserIndex].id);
    goToNextUser();
  };

  const handleDislike = () => {
    goToNextUser();
  };

  const goToNextUser = () => {
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
      setCurrentImageIndex(0);
    } else {
      // Loop back to the beginning if we've gone through all users
      setCurrentUserIndex(0);
      setCurrentImageIndex(0);
    }
  };

  const switchImage = () => {
    const user = users[currentUserIndex];
    const nextIndex = (currentImageIndex + 1) % user.images.length;
    setCurrentImageIndex(nextIndex);
  };

  if (users.length === 0) {
    return <EmptyState>No profiles available</EmptyState>;
  }

  const currentUser = users[currentUserIndex];

  return (
    <SwipeContainer>
      <ProfileCard>
        <ImageContainer onClick={switchImage}>
          <ProfileImage src={currentUser.images[currentImageIndex]} alt={currentUser.name} />
          <ProfileInfo>
            <ProfileName>{currentUser.name}, {currentUser.age}</ProfileName>
            <ProfileBio>{currentUser.bio}</ProfileBio>
          </ProfileInfo>
        </ImageContainer>
        <ActionButtons>
          <DislikeButton onClick={handleDislike}>
            <FaTimes />
          </DislikeButton>
          <LikeButton onClick={handleLike}>
            <FaHeart />
          </LikeButton>
        </ActionButtons>
      </ProfileCard>
    </SwipeContainer>
  );
};

const SwipeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px);
  padding: 20px;
`;

const ProfileCard = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  position: relative;
  height: 500px;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
`;

const ProfileName = styled.h2`
  margin-bottom: 5px;
  font-size: 1.5rem;
`;

const ProfileBio = styled.p`
  font-size: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 15px;
`;

const ActionButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const LikeButton = styled(ActionButton)`
  background-color: #28a745;
  color: white;
`;

const DislikeButton = styled(ActionButton)`
  background-color: #dc3545;
  color: white;
`;

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px);
  font-size: 1.2rem;
  color: gray;
`;

export default ImageSwipe;