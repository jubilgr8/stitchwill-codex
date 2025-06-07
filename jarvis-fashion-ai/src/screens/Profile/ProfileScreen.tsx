import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ProfileStackParamList } from '../../navigation/ProfileStack';
import SafeScreen from '../../components/SafeScreen';

type ProfileScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'ProfileHome'>;

const Header = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.grey200};
`;

const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const Content = styled.ScrollView`
  flex: 1;
`;

const ProfileHeader = styled.View`
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.grey200};
`;

const Avatar = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.grey300};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Username = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const UserRole = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const EditProfileButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.grey100};
  border-radius: ${({ theme }) => theme.radii.md}px;
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

const EditProfileText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

const StatItem = styled.View`
  align-items: center;
`;

const StatValue = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const StatLabel = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.spacing.md}px;
`;

const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.grey200};
`;

const MenuIcon = styled.View`
  width: 40px;
  align-items: center;
`;

const MenuText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

const ChevronIcon = styled.View`
  width: 24px;
  align-items: center;
`;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  
  return (
    <SafeScreen>
      <Header>
        <HeaderTitle>Profile</HeaderTitle>
      </Header>
      
      <Content showsVerticalScrollIndicator={false}>
        <ProfileHeader>
          <Avatar />
          <Username>Alex Johnson</Username>
          <UserRole>Fashion Enthusiast</UserRole>
          
          <EditProfileButton onPress={() => navigation.navigate('AvatarEdit')}>
            <EditProfileText>Edit Profile</EditProfileText>
          </EditProfileButton>
          
          <StatsContainer>
            <StatItem>
              <StatValue>24</StatValue>
              <StatLabel>Items</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>8</StatValue>
              <StatLabel>Outfits</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>156</StatValue>
              <StatLabel>Likes</StatLabel>
            </StatItem>
          </StatsContainer>
        </ProfileHeader>
        
        <SectionTitle>My Fashion</SectionTitle>
        
        <MenuItem onPress={() => navigation.navigate('Wardrobe')}>
          <MenuIcon>
            <MaterialCommunityIcons name="hanger" size={24} color="#1C1C1E" />
          </MenuIcon>
          <MenuText>My Wardrobe</MenuText>
          <ChevronIcon>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#9E9E9E" />
          </ChevronIcon>
        </MenuItem>
        
        <MenuItem onPress={() => {}}>
          <MenuIcon>
            <MaterialCommunityIcons name="tshirt-crew" size={24} color="#1C1C1E" />
          </MenuIcon>
          <MenuText>Saved Outfits</MenuText>
          <ChevronIcon>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#9E9E9E" />
          </ChevronIcon>
        </MenuItem>
        
        <MenuItem onPress={() => {}}>
          <MenuIcon>
            <MaterialCommunityIcons name="heart-outline" size={24} color="#1C1C1E" />
          </MenuIcon>
          <MenuText>Favorites</MenuText>
          <ChevronIcon>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#9E9E9E" />
          </ChevronIcon>
        </MenuItem>
        
        <MenuItem onPress={() => navigation.navigate('Orders')}>
          <MenuIcon>
            <MaterialCommunityIcons name="package-variant" size={24} color="#1C1C1E" />
          </MenuIcon>
          <MenuText>My Orders</MenuText>
          <ChevronIcon>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#9E9E9E" />
          </ChevronIcon>
        </MenuItem>
        
        <SectionTitle>Account</SectionTitle>
        
        <MenuItem onPress={() => navigation.navigate('Addresses')}>
          <MenuIcon>
            <MaterialCommunityIcons name="map-marker-outline" size={24} color="#1C1C1E" />
          </MenuIcon>
          <MenuText>Shipping Addresses</MenuText>
          <ChevronIcon>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#9E9E9E" />
          </ChevronIcon>
        </MenuItem>
        
        <MenuItem onPress={() => navigation.navigate('PaymentMethods')}>
          <MenuIcon>
            <MaterialCommunityIcons name="credit-card-outline" size={24} color="#1C1C1E" />
          </MenuIcon>
          <MenuText>Payment Methods</MenuText>
          <ChevronIcon>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#9E9E9E" />
          </ChevronIcon>
        </MenuItem>
        
        <MenuItem onPress={() => navigation.navigate('Settings')}>
          <MenuIcon>
            <MaterialCommunityIcons name="cog-outline" size={24} color="#1C1C1E" />
          </MenuIcon>
          <MenuText>Settings</MenuText>
          <ChevronIcon>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#9E9E9E" />
          </ChevronIcon>
        </MenuItem>
        
        <MenuItem onPress={() => {}}>
          <MenuIcon>
            <MaterialCommunityIcons name="help-circle-outline" size={24} color="#1C1C1E" />
          </MenuIcon>
          <MenuText>Help & Support</MenuText>
          <ChevronIcon>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#9E9E9E" />
          </ChevronIcon>
        </MenuItem>
        
        <MenuItem onPress={() => {}}>
          <MenuIcon>
            <MaterialCommunityIcons name="logout" size={24} color="#1C1C1E" />
          </MenuIcon>
          <MenuText>Log Out</MenuText>
        </MenuItem>
      </Content>
    </SafeScreen>
  );
}