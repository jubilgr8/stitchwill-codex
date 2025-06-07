import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StudioStackParamList } from '../../navigation/StudioStack';
import Button from '../../components/Button';
import AvatarView from '../../components/AvatarView';

type MixMatchPreviewRouteProp = RouteProp<StudioStackParamList, 'MixMatchPreview'>;
type MixMatchPreviewNavigationProp = StackNavigationProp<StudioStackParamList, 'MixMatchPreview'>;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.grey200};
`;

const BackButton = styled.TouchableOpacity`
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

const Content = styled.ScrollView`
  flex: 1;
`;

const StepIndicator = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.md}px;
`;

const StepDot = styled.View<{ isActive: boolean; isCompleted: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ isActive, isCompleted, theme }) => 
    isCompleted ? theme.colors.primary : 
    isActive ? theme.colors.grey400 : theme.colors.grey200};
  margin-horizontal: ${({ theme }) => theme.spacing.xs}px;
`;

const PreviewTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.spacing.md}px;
  text-align: center;
`;

const AvatarContainer = styled.View`
  align-items: center;
  margin-vertical: ${({ theme }) => theme.spacing.lg}px;
`;

const SummaryContainer = styled.View`
  margin: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  shadow-color: ${({ theme }) => theme.colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const SummaryTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const SummaryLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const SummaryValue = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const PriceContainer = styled.View`
  margin: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.grey200};
`;

const PriceRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const PriceLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const PriceValue = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const TotalPrice = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  padding-top: ${({ theme }) => theme.spacing.sm}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.grey200};
`;

const TotalLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const TotalValue = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const ButtonContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

// Mock data for preview
const mockPreview = {
  design: 'Custom Tailored Suit',
  fabric: 'Premium Italian Wool',
  color: 'Navy Blue',
  tailor: 'Emma Thompson',
  estimatedDelivery: '2-3 weeks',
  basePrice: '$299.99',
  fabricUpcharge: '$50.00',
  tailorFee: '$30.00',
  shipping: '$0.00',
  tax: '$30.40',
  total: '$410.39',
};

export default function MixMatchPreviewScreen() {
  const navigation = useNavigation<MixMatchPreviewNavigationProp>();
  const route = useRoute<MixMatchPreviewRouteProp>();
  const { designId, fabricId, tailorId } = route.params;
  
  const handleCheckout = () => {
    navigation.navigate('Checkout', { designId, fabricId, tailorId });
  };
  
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </BackButton>
        <HeaderTitle>Preview</HeaderTitle>
      </Header>
      
      <Content showsVerticalScrollIndicator={false}>
        <StepIndicator>
          <StepDot isActive={false} isCompleted={true} />
          <StepDot isActive={false} isCompleted={true} />
          <StepDot isActive={false} isCompleted={true} />
          <StepDot isActive={true} isCompleted={false} />
        </StepIndicator>
        
        <PreviewTitle>Your Custom Design</PreviewTitle>
        
        <AvatarContainer>
          <AvatarView size="large" />
        </AvatarContainer>
        
        <SummaryContainer>
          <SummaryTitle>Design Summary</SummaryTitle>
          
          <SummaryRow>
            <SummaryLabel>Design</SummaryLabel>
            <SummaryValue>{mockPreview.design}</SummaryValue>
          </SummaryRow>
          
          <SummaryRow>
            <SummaryLabel>Fabric</SummaryLabel>
            <SummaryValue>{mockPreview.fabric}</SummaryValue>
          </SummaryRow>
          
          <SummaryRow>
            <SummaryLabel>Color</SummaryLabel>
            <SummaryValue>{mockPreview.color}</SummaryValue>
          </SummaryRow>
          
          <SummaryRow>
            <SummaryLabel>Tailor</SummaryLabel>
            <SummaryValue>{mockPreview.tailor}</SummaryValue>
          </SummaryRow>
          
          <SummaryRow>
            <SummaryLabel>Estimated Delivery</SummaryLabel>
            <SummaryValue>{mockPreview.estimatedDelivery}</SummaryValue>
          </SummaryRow>
        </SummaryContainer>
        
        <PriceContainer>
          <PriceRow>
            <PriceLabel>Base Price</PriceLabel>
            <PriceValue>{mockPreview.basePrice}</PriceValue>
          </PriceRow>
          
          <PriceRow>
            <PriceLabel>Fabric Upcharge</PriceLabel>
            <PriceValue>{mockPreview.fabricUpcharge}</PriceValue>
          </PriceRow>
          
          <PriceRow>
            <PriceLabel>Tailor Fee</PriceLabel>
            <PriceValue>{mockPreview.tailorFee}</PriceValue>
          </PriceRow>
          
          <PriceRow>
            <PriceLabel>Shipping</PriceLabel>
            <PriceValue>{mockPreview.shipping}</PriceValue>
          </PriceRow>
          
          <PriceRow>
            <PriceLabel>Tax</PriceLabel>
            <PriceValue>{mockPreview.tax}</PriceValue>
          </PriceRow>
          
          <TotalPrice>
            <TotalLabel>Total</TotalLabel>
            <TotalValue>{mockPreview.total}</TotalValue>
          </TotalPrice>
        </PriceContainer>
      </Content>
      
      <ButtonContainer>
        <Button 
          title="Proceed to Checkout" 
          onPress={handleCheckout}
        />
      </ButtonContainer>
    </Container>
  );
}