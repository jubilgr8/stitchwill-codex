import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { StudioStackParamList } from '../../navigation/StudioStack';
import Button from '../../components/Button';
import Card from '../../components/Card';
import AvatarView from '../../components/AvatarView';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SafeScreen from '../../components/SafeScreen';

type StudioScreenNavigationProp = StackNavigationProp<StudioStackParamList, 'StudioHome'>;

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
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

const SectionCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const SectionContent = styled.View`
  align-items: center;
`;

const ButtonContainer = styled.View`
  margin-top: ${({ theme }) => theme.spacing.md}px;
  width: 100%;
`;

const FeatureDescription = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  text-align: center;
`;

const AvatarContainer = styled.View`
  align-items: center;
  margin-vertical: ${({ theme }) => theme.spacing.md}px;
`;

const OrderStatusCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
`;

const OrderStatusIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const OrderStatusInfo = styled.View`
  flex: 1;
`;

const OrderStatusTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const OrderStatusDescription = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
`;

export default function StudioScreen() {
  const navigation = useNavigation<StudioScreenNavigationProp>();
  
  return (
    <SafeScreen>
      <Header>
        <HeaderTitle>JARVIS Studio</HeaderTitle>
      </Header>
      
      <Content showsVerticalScrollIndicator={false}>
        <SectionTitle>Your Avatar</SectionTitle>
        <SectionCard>
          <SectionContent>
            <FeatureDescription>
              Customize your digital avatar for virtual try-on experiences
            </FeatureDescription>
            
            <AvatarContainer>
              <AvatarView size="small" />
            </AvatarContainer>
            
            <ButtonContainer>
              <Button 
                title="Edit Avatar" 
                onPress={() => navigation.navigate('AvatarSetup')} 
              />
            </ButtonContainer>
          </SectionContent>
        </SectionCard>
        
        <SectionTitle>Try On</SectionTitle>
        <SectionCard>
          <SectionContent>
            <FeatureDescription>
              Virtually try on clothing items on your avatar
            </FeatureDescription>
            
            <ButtonContainer>
              <Button 
                title="Try On Items" 
                onPress={() => navigation.navigate('TryOn')} 
              />
            </ButtonContainer>
          </SectionContent>
        </SectionCard>
        
        <SectionTitle>Mix & Match</SectionTitle>
        <SectionCard>
          <SectionContent>
            <FeatureDescription>
              Create stylish outfits by mixing and matching items
            </FeatureDescription>
            
            <ButtonContainer>
              <Button 
                title="Create Outfit" 
                onPress={() => navigation.navigate('MixMatch')} 
              />
            </ButtonContainer>
          </SectionContent>
        </SectionCard>
        
        <SectionTitle>Active Orders</SectionTitle>
        <OrderStatusCard>
          <OrderStatusIcon>
            <MaterialCommunityIcons name="scissors-cutting" size={20} color="#FFF" />
          </OrderStatusIcon>
          <OrderStatusInfo>
            <OrderStatusTitle>Custom Tailored Suit</OrderStatusTitle>
            <OrderStatusDescription>In Production • Est. Delivery: June 5</OrderStatusDescription>
          </OrderStatusInfo>
          <Button 
            title="Track" 
            onPress={() => navigation.navigate('OrderProcessingTimeline', { orderId: 'ORD-2025-001' })} 
            variant="secondary"
          />
        </OrderStatusCard>
        
        <SectionTitle>AI Suggestions</SectionTitle>
        <SectionCard>
          <SectionContent>
            <FeatureDescription>
              Get personalized style recommendations from JARVIS AI
            </FeatureDescription>
            
            <ButtonContainer>
              <Button 
                title="Get Suggestions" 
                onPress={() => {}} 
                variant="secondary"
              />
            </ButtonContainer>
          </SectionContent>
        </SectionCard>
      </Content>
    </SafeScreen>
  );
}