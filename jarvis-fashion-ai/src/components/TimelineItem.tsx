import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from './Card';
import RoleBadge from './RoleBadge';

interface TimelineItemProps {
  id: string;
  username: string;
  role: 'designer' | 'model' | 'stylist' | 'customer' | 'tailor' | 'retailer';
  timestamp: string;
  imageUrl?: string;
  images?: Array<{
    id: string;
    url: string;
    caption?: string;
  }>;
  title: string;
  description: string;
  likes: number;
  comments: number;
  onPress: () => void;
  isLast?: boolean;
  isFirst?: boolean;
  lifecycleId?: string;
  previousStage?: {
    id: string;
    imageUrl: string;
    title: string;
    role: string;
  };
  nextStage?: {
    id: string;
    imageUrl: string;
    title: string;
    role: string;
  };
  stageDetails?: string;
  materials?: Array<string>;
  timeSpent?: string;
}

const Container = styled.View`
  margin-horizontal: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const TimelineConnector = styled.View<{ isLast?: boolean; isFirst?: boolean; role: string }>`
  position: absolute;
  left: 20px;
  top: ${({ isFirst }) => (isFirst ? 40 : 0)}px;
  bottom: ${({ isLast }) => (isLast ? 0 : -16)}px;
  width: 2px;
  background-color: ${({ role }) => 
    role === 'designer' ? '#E91E63' : 
    role === 'tailor' ? '#2196F3' : 
    role === 'retailer' ? '#4CAF50' : 
    role === 'customer' ? '#FF9800' : 
    role === 'model' ? '#9C27B0' : '#607D8B'};
  opacity: 0.5;
`;

const TimelineDot = styled.View<{ role: string }>`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${({ role }) => 
    role === 'designer' ? '#E91E63' : 
    role === 'tailor' ? '#2196F3' : 
    role === 'retailer' ? '#4CAF50' : 
    role === 'customer' ? '#FF9800' : 
    role === 'model' ? '#9C27B0' : '#607D8B'};
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const HeaderContent = styled.View`
  flex: 1;
`;

const Username = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const Timestamp = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey500};
  margin-top: 2px;
`;

const ContentCard = styled(Card)`
  margin-left: ${({ theme }) => theme.spacing.xl}px;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const Description = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const PostImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: ${({ theme }) => theme.radii.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const ImageCarousel = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const ImageCaption = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey500};
  font-style: italic;
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  text-align: center;
`;

const PaginationDots = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const PaginationDot = styled.View<{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ isActive, theme }) => 
    isActive ? theme.colors.primary : theme.colors.grey300};
  margin-horizontal: ${({ theme }) => theme.spacing.xs}px;
`;

const ActionBar = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing.md}px;
`;

const ActionText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
  margin-left: ${({ theme }) => theme.spacing.xs}px;
`;

const LifecyclePreview = styled.View`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  padding-top: ${({ theme }) => theme.spacing.sm}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.grey200};
`;

const LifecycleTitle = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const PreviewContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PreviewItem = styled.TouchableOpacity`
  width: 80px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const PreviewImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.radii.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const PreviewText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const PreviewRole = styled.Text`
  font-size: 10px;
  color: ${({ role }) => 
    role === 'designer' ? '#E91E63' : 
    role === 'tailor' ? '#2196F3' : 
    role === 'retailer' ? '#4CAF50' : 
    role === 'customer' ? '#FF9800' : 
    role === 'model' ? '#9C27B0' : '#607D8B'};
  font-weight: 500;
`;

const DetailSection = styled.View`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.sm}px;
  background-color: ${({ theme }) => theme.colors.grey100};
  border-radius: ${({ theme }) => theme.radii.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const DetailTitle = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const DetailText = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const MaterialsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

const MaterialTag = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.sm}px;
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
  margin-right: ${({ theme }) => theme.spacing.xs}px;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const MaterialText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'designer': return 'pencil';
    case 'tailor': return 'needle';
    case 'retailer': return 'store';
    case 'customer': return 'account';
    case 'model': return 'human-female';
    case 'stylist': return 'tshirt-crew';
    default: return 'account';
  }
};

export const TimelineItem = ({
  username,
  role,
  timestamp,
  imageUrl,
  images,
  title,
  description,
  likes,
  comments,
  onPress,
  isLast = false,
  isFirst = false,
  lifecycleId,
  previousStage,
  nextStage,
  stageDetails,
  materials,
  timeSpent,
}: TimelineItemProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth - 80; // Accounting for margins and padding

  const renderImage = ({ item, index }: { item: any; index: number }) => (
    <View>
      <PostImage 
        source={{ uri: item.url }} 
        resizeMode="cover" 
        style={{ width: imageWidth }}
      />
      {item.caption && <ImageCaption>{item.caption}</ImageCaption>}
    </View>
  );

  return (
    <Container>
      {lifecycleId && <TimelineConnector isLast={isLast} isFirst={isFirst} role={role} />}
      <Header>
        <TimelineDot role={role} />
        <HeaderContent>
          <Username>{username}</Username>
          <Timestamp>{timestamp}</Timestamp>
        </HeaderContent>
        <RoleBadge role={role} icon={getRoleIcon(role)} />
      </Header>
      
      <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
        <ContentCard>
          <Title>{title}</Title>
          <Description>{description}</Description>
          
          {imageUrl && !images && (
            <PostImage source={{ uri: imageUrl }} resizeMode="cover" />
          )}
          
          {images && images.length > 0 && (
            <ImageCarousel>
              <FlatList
                data={images}
                renderItem={renderImage}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e) => {
                  const contentOffset = e.nativeEvent.contentOffset;
                  const viewSize = e.nativeEvent.layoutMeasurement;
                  const pageNum = Math.floor(contentOffset.x / viewSize.width);
                  setActiveImageIndex(pageNum);
                }}
              />
              
              {images.length > 1 && (
                <PaginationDots>
                  {images.map((_, index) => (
                    <PaginationDot 
                      key={index} 
                      isActive={index === activeImageIndex} 
                    />
                  ))}
                </PaginationDots>
              )}
            </ImageCarousel>
          )}
          
          {stageDetails && (
            <DetailSection>
              <DetailTitle>Process Details</DetailTitle>
              <DetailText>{stageDetails}</DetailText>
              
              {timeSpent && (
                <DetailText style={{ marginTop: 4 }}>
                  Time spent: {timeSpent}
                </DetailText>
              )}
              
              {materials && materials.length > 0 && (
                <>
                  <DetailTitle style={{ marginTop: 8 }}>Materials Used</DetailTitle>
                  <MaterialsContainer>
                    {materials.map((material, index) => (
                      <MaterialTag key={index}>
                        <MaterialText>{material}</MaterialText>
                      </MaterialTag>
                    ))}
                  </MaterialsContainer>
                </>
              )}
            </DetailSection>
          )}
          
          {(previousStage || nextStage) && (
            <LifecyclePreview>
              <LifecycleTitle>Fashion Lifecycle</LifecycleTitle>
              <PreviewContainer>
                {previousStage && (
                  <PreviewItem>
                    <PreviewImage source={{ uri: previousStage.imageUrl }} />
                    <PreviewRole role={previousStage.role}>{previousStage.role.toUpperCase()}</PreviewRole>
                    <PreviewText>Previous: {previousStage.title}</PreviewText>
                  </PreviewItem>
                )}
                {nextStage && (
                  <PreviewItem>
                    <PreviewImage source={{ uri: nextStage.imageUrl }} />
                    <PreviewRole role={nextStage.role}>{nextStage.role.toUpperCase()}</PreviewRole>
                    <PreviewText>Next: {nextStage.title}</PreviewText>
                  </PreviewItem>
                )}
              </PreviewContainer>
            </LifecyclePreview>
          )}
          
          <ActionBar>
            <ActionButton>
              <MaterialCommunityIcons name="heart-outline" size={18} color="#9E9E9E" />
              <ActionText>{likes}</ActionText>
            </ActionButton>
            <ActionButton>
              <MaterialCommunityIcons name="comment-outline" size={18} color="#9E9E9E" />
              <ActionText>{comments}</ActionText>
            </ActionButton>
          </ActionBar>
        </ContentCard>
      </TouchableOpacity>
    </Container>
  );
};

export default TimelineItem;