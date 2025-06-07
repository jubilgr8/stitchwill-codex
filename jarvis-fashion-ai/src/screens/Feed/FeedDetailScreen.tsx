import React, { useState } from 'react';
import { ScrollView, View, FlatList, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { FeedStackParamList } from '../../navigation/FeedStack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/Button';
import RoleBadge from '../../components/RoleBadge';
import SafeScreen from '../../components/SafeScreen';

type FeedDetailRouteProp = RouteProp<FeedStackParamList, 'FeedDetail'>;
type FeedDetailNavigationProp = StackNavigationProp<FeedStackParamList, 'FeedDetail'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.grey200};
`;

const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.grey100};
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

const ShareButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.grey100};
  align-items: center;
  justify-content: center;
`;

const Content = styled.ScrollView`
  flex: 1;
`;

const ImageContainer = styled.View`
  width: 100%;
  height: 450px;
  background-color: ${({ theme }) => theme.colors.grey100};
`;

const PostImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const ImageCaption = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey500};
  font-style: italic;
  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.md}px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.03);
`;

const PaginationDots = styled.View`
  flex-direction: row;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  width: 100%;
`;

const PaginationDot = styled.View<{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ isActive }) => 
    isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'};
  margin-horizontal: ${({ theme }) => theme.spacing.xs}px;
`;

const PostInfo = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const Description = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  line-height: 24px;
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  padding-bottom: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.grey200};
`;

const UserAvatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const UserTextInfo = styled.View`
  flex: 1;
`;

const Username = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const Timestamp = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const DetailSection = styled.View`
  margin-top: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.grey100};
  border-radius: ${({ theme }) => theme.radii.md}px;
`;

const DetailTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const DetailText = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 22px;
`;

const MaterialsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

const MaterialTag = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.sm}px;
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const MaterialText = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const TimeInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

const TimeIcon = styled.View`
  margin-right: ${({ theme }) => theme.spacing.xs}px;
`;

const TimeText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const ActionBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.grey200};
  background-color: ${({ theme }) => theme.colors.white};
`;

const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radii.md}px;
  background-color: ${({ theme }) => theme.colors.grey100};
`;

const ActionText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-left: ${({ theme }) => theme.spacing.xs}px;
  font-weight: 500;
`;

const LifecycleSection = styled.View`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  padding-top: ${({ theme }) => theme.spacing.md}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.grey200};
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

const TimelineContainer = styled.View`
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

const TimelineCard = styled.TouchableOpacity<{ isActive: boolean }>`
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.radii.md}px;
  background-color: ${({ isActive, theme }) => 
    isActive ? theme.colors.grey100 : 'transparent'};
`;

const TimelineDot = styled.View<{ isActive: boolean; role: string }>`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${({ isActive, role }) => 
    isActive ? 
      (role === 'designer' ? '#E91E63' : 
      role === 'tailor' ? '#2196F3' : 
      role === 'retailer' ? '#4CAF50' : 
      role === 'customer' ? '#FF9800' : 
      role === 'model' ? '#9C27B0' : '#607D8B') : 
      '#E0E0E0'};
  margin-top: 2px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const TimelineConnector = styled.View<{ isLast: boolean; isActive: boolean }>`
  position: absolute;
  left: 7px;
  top: 16px;
  bottom: ${({ isLast }) => (isLast ? 0 : -16)}px;
  width: 2px;
  background-color: ${({ isActive }) => isActive ? '#E0E0E0' : '#BDBDBD'};
  display: ${({ isLast }) => (isLast ? 'none' : 'flex')};
`;

const TimelineContent = styled.View`
  flex: 1;
`;

const TimelineTitle = styled.Text<{ isActive: boolean }>`
  font-size: 16px;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  color: ${({ theme, isActive }) => isActive ? theme.colors.text : theme.colors.grey500};
`;

const TimelineDate = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey500};
  margin-top: 2px;
`;

const TimelineImagePreview = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.radii.sm}px;
  margin-left: auto;
`;

const ButtonContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  padding-top: 0;
`;

// Real fashion lifecycle data with real images
const realLifecycleData = [
  {
    id: '1',
    lifecycleId: 'lifecycle-001',
    username: 'LuxuryFabrics',
    userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'retailer' as const,
    timestamp: '3d ago',
    imageUrl: 'https://images.unsplash.com/photo-1589891685391-c1140da1a829',
    title: 'Luxury Silk Collection',
    description: 'Our new collection of premium silk fabrics, perfect for evening wear and high-end fashion.',
  },
  {
    id: '2',
    lifecycleId: 'lifecycle-001',
    username: 'VogueDesigns',
    userAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    role: 'designer' as const,
    timestamp: '2d ago',
    imageUrl: 'https://images.unsplash.com/photo-1594575470752-a27f5e97d3c9',
    title: 'Couture Evening Gown',
    description: 'My latest design for the upcoming gala season, featuring a dramatic silhouette and intricate beadwork.',
  },
  {
    id: '3',
    lifecycleId: 'lifecycle-001',
    username: 'MasterTailor',
    userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'tailor' as const,
    timestamp: '1d ago',
    imageUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03',
    title: 'Crafting Elegance',
    description: 'Working on the couture evening gown. The silk drapes beautifully and the beadwork is coming together perfectly.',
  },
  {
    id: '4',
    lifecycleId: 'lifecycle-001',
    username: 'EliteModels',
    userAvatar: 'https://randomuser.me/api/portraits/women/90.jpg',
    role: 'model' as const,
    timestamp: '12h ago',
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae',
    title: 'The Perfect Fit',
    description: 'Final fitting for the couture gown. The craftsmanship is impeccable and it fits like a dream.',
  },
  {
    id: '5',
    lifecycleId: 'lifecycle-001',
    username: 'CelebrityStyle',
    userAvatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    role: 'customer' as const,
    timestamp: '2h ago',
    imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446',
    title: 'Red Carpet Glamour',
    description: 'Wearing my custom couture gown at tonight\'s premiere. Feeling absolutely stunning!',
  },
];

// Mock post data with multiple images
const realPost = {
  id: '3',
  lifecycleId: 'lifecycle-001',
  username: 'MasterTailor',
  userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  role: 'tailor' as const,
  timestamp: '1d ago',
  images: [
    {
      id: '3-1',
      url: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03',
      caption: 'Beginning the construction process'
    },
    {
      id: '3-2',
      url: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f',
      caption: 'Detailed work on the bodice beading'
    },
    {
      id: '3-3',
      url: 'https://images.unsplash.com/photo-1558304970-abd589baebe5',
      caption: 'Assembling the flowing skirt panels'
    },
    {
      id: '3-4',
      url: 'https://images.unsplash.com/photo-1596939082030-507099336de5',
      caption: 'Final construction before fitting'
    }
  ],
  title: 'Crafting Elegance',
  description: 'Working on the couture evening gown. The silk drapes beautifully and the beadwork is coming together perfectly. Each stitch is placed with precision to ensure the garment not only looks stunning but will be comfortable and durable for years to come.',
  likes: 367,
  comments: 42,
  stageDetails: 'Each crystal is hand-sewn to ensure perfect placement. The bodice structure includes 12 boning channels for support while maintaining comfort. The skirt panels are carefully pleated to create the perfect drape and movement.',
  materials: ['Italian Silk', 'Swarovski Crystals', 'French Seams', 'Invisible Zipper'],
  timeSpent: '40 hours',
  stageNumber: 3,
  totalStages: 5
};

export default function FeedDetailScreen() {
  const navigation = useNavigation<FeedDetailNavigationProp>();
  const route = useRoute<FeedDetailRouteProp>();
  const { id } = route.params;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // In a real app, you would fetch the post data based on the ID
  const post = realPost;
  const screenWidth = Dimensions.get('window').width;
  
  // Find the current post in the lifecycle
  const currentIndex = realLifecycleData.findIndex(item => item.id === id);
  
  const renderImage = ({ item, index }: { item: any; index: number }) => (
    <View>
      <PostImage 
        source={{ uri: item.url }} 
        resizeMode="cover" 
        style={{ width: screenWidth }}
      />
      {item.caption && <ImageCaption>{item.caption}</ImageCaption>}
    </View>
  );
  
  return (
    <SafeScreen>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </BackButton>
        <HeaderTitle>{post.title}</HeaderTitle>
        <ShareButton>
          <MaterialCommunityIcons name="share-variant" size={24} color="#000" />
        </ShareButton>
      </Header>
      
      <Content showsVerticalScrollIndicator={false}>
        <ImageContainer>
          {post.images ? (
            <>
              <FlatList
                data={post.images}
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
              
              {post.images.length > 1 && (
                <PaginationDots>
                  {post.images.map((_, index) => (
                    <PaginationDot 
                      key={index} 
                      isActive={index === activeImageIndex} 
                    />
                  ))}
                </PaginationDots>
              )}
            </>
          ) : (
            <PostImage 
              source={{ uri: post.imageUrl }} 
              resizeMode="cover" 
            />
          )}
        </ImageContainer>
        
        <PostInfo>
          <UserInfo>
            <UserAvatar source={{ uri: post.userAvatar }} />
            <UserTextInfo>
              <Username>{post.username}</Username>
              <Timestamp>{post.timestamp}</Timestamp>
            </UserTextInfo>
            <RoleBadge role={post.role} size="medium" />
          </UserInfo>
          
          <Title>{post.title}</Title>
          <Description>{post.description}</Description>
          
          {post.stageDetails && (
            <DetailSection>
              <DetailTitle>Process Details</DetailTitle>
              <DetailText>{post.stageDetails}</DetailText>
              
              {post.timeSpent && (
                <TimeInfo>
                  <TimeIcon>
                    <MaterialCommunityIcons name="clock-outline" size={16} color="#757575" />
                  </TimeIcon>
                  <TimeText>Time spent: {post.timeSpent}</TimeText>
                </TimeInfo>
              )}
              
              {post.materials && post.materials.length > 0 && (
                <>
                  <DetailTitle style={{ marginTop: 16 }}>Materials Used</DetailTitle>
                  <MaterialsContainer>
                    {post.materials.map((material, index) => (
                      <MaterialTag key={index}>
                        <MaterialText>{material}</MaterialText>
                      </MaterialTag>
                    ))}
                  </MaterialsContainer>
                </>
              )}
            </DetailSection>
          )}
          
          {post.role === 'tailor' && (
            <ButtonContainer>
              <Button 
                title="View 3D Model" 
                onPress={() => {}} 
                style={{ marginBottom: 12 }}
              />
              <Button 
                title="View Measurements" 
                onPress={() => {}} 
                variant="secondary"
              />
            </ButtonContainer>
          )}
          
          {post.role === 'designer' && (
            <ButtonContainer>
              <Button 
                title="Order This Design" 
                onPress={() => {}} 
                style={{ marginBottom: 12 }}
              />
              <Button 
                title="View Similar Designs" 
                onPress={() => {}} 
                variant="secondary"
              />
            </ButtonContainer>
          )}
          
          {post.role === 'retailer' && (
            <ButtonContainer>
              <Button 
                title="Purchase Fabric" 
                onPress={() => {}} 
                style={{ marginBottom: 12 }}
              />
              <Button 
                title="View Fabric Details" 
                onPress={() => {}} 
                variant="secondary"
              />
            </ButtonContainer>
          )}
        </PostInfo>
        
        {post.lifecycleId && (
          <LifecycleSection>
            <SectionTitle>Fashion Lifecycle</SectionTitle>
            <TimelineContainer>
              {realLifecycleData.map((item, index) => (
                <TimelineCard 
                  key={item.id}
                  isActive={item.id === id}
                  onPress={() => navigation.navigate('FeedDetail', { id: item.id })}
                >
                  <TimelineDot isActive={item.id === id} role={item.role} />
                  <TimelineConnector 
                    isLast={index === realLifecycleData.length - 1}
                    isActive={index < currentIndex}
                  />
                  <TimelineContent>
                    <TimelineTitle isActive={item.id === id}>{item.title}</TimelineTitle>
                    <TimelineDate>{item.timestamp}</TimelineDate>
                  </TimelineContent>
                  <TimelineImagePreview source={{ uri: item.imageUrl }} />
                </TimelineCard>
              ))}
            </TimelineContainer>
          </LifecycleSection>
        )}
      </Content>
      
      <ActionBar>
        <ActionButton>
          <MaterialCommunityIcons name="heart-outline" size={24} color="#000" />
          <ActionText>{post.likes}</ActionText>
        </ActionButton>
        <ActionButton>
          <MaterialCommunityIcons name="comment-outline" size={24} color="#000" />
          <ActionText>{post.comments}</ActionText>
        </ActionButton>
        <ActionButton>
          <MaterialCommunityIcons name="bookmark-outline" size={24} color="#000" />
          <ActionText>Save</ActionText>
        </ActionButton>
      </ActionBar>
    </SafeScreen>
  );
}