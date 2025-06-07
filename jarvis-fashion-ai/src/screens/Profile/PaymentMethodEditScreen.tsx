import React, { useState, useEffect } from 'react';
import { View, StatusBar, TextInput } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ProfileStackParamList } from '../../navigation/ProfileStack';
import Button from '../../components/Button';

type PaymentMethodEditRouteProp = RouteProp<ProfileStackParamList, 'PaymentMethodEdit'>;
type PaymentMethodEditNavigationProp = StackNavigationProp<ProfileStackParamList, 'PaymentMethodEdit'>;

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
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const FormGroup = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Label = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const Input = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.sm}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.grey300};
  padding: ${({ theme }) => theme.spacing.sm}px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const CardTypeRow = styled.View`
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const CardTypeOption = styled.TouchableOpacity<{ isSelected: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ isSelected, theme }) => 
    isSelected ? theme.colors.grey100 : theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.sm}px;
  border-width: 1px;
  border-color: ${({ isSelected, theme }) => 
    isSelected ? theme.colors.primary : theme.colors.grey300};
  padding: ${({ theme }) => theme.spacing.sm}px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const CardTypeIcon = styled.View`
  margin-right: ${({ theme }) => theme.spacing.xs}px;
`;

const CardTypeText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const ExpiryRow = styled.View`
  flex-direction: row;
`;

const ExpiryInput = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.sm}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.grey300};
  padding: ${({ theme }) => theme.spacing.sm}px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const CVVInput = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.sm}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.grey300};
  padding: ${({ theme }) => theme.spacing.sm}px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

const CheckboxRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Checkbox = styled.View<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border-width: 2px;
  border-color: ${({ checked, theme }) => 
    checked ? theme.colors.primary : theme.colors.grey400};
  background-color: ${({ checked, theme }) => 
    checked ? theme.colors.primary : 'transparent'};
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const CheckboxLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const ButtonContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

// Mock payment method data for editing
const mockPaymentMethod = {
  id: '2',
  type: 'Mastercard',
  number: '5555 5555 5555 8901',
  expiryMonth: '12',
  expiryYear: '25',
  cvv: '123',
  name: 'Alex Johnson',
  isDefault: false,
};

export default function PaymentMethodEditScreen() {
  const navigation = useNavigation<PaymentMethodEditNavigationProp>();
  const route = useRoute<PaymentMethodEditRouteProp>();
  const { paymentId } = route.params || {};
  
  const [formData, setFormData] = useState({
    cardType: 'visa',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    name: '',
    isDefault: false,
  });
  
  useEffect(() => {
    // In a real app, you would fetch the payment method data based on the ID
    if (paymentId) {
      setFormData({
        cardType: mockPaymentMethod.type.toLowerCase(),
        cardNumber: mockPaymentMethod.number,
        expiryMonth: mockPaymentMethod.expiryMonth,
        expiryYear: mockPaymentMethod.expiryYear,
        cvv: mockPaymentMethod.cvv,
        name: mockPaymentMethod.name,
        isDefault: mockPaymentMethod.isDefault,
      });
    }
  }, [paymentId]);
  
  const handleChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  
  const handleSave = () => {
    // In a real app, you would save the payment method data
    navigation.goBack();
  };
  
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </BackButton>
        <HeaderTitle>
          {paymentId ? 'Edit Payment Method' : 'Add Payment Method'}
        </HeaderTitle>
      </Header>
      
      <Content showsVerticalScrollIndicator={false}>
        <Label>Card Type</Label>
        <CardTypeRow>
          <CardTypeOption 
            isSelected={formData.cardType === 'visa'}
            onPress={() => handleChange('cardType', 'visa')}
          >
            <CardTypeIcon>
              <MaterialCommunityIcons name="credit-card" size={20} color="#1A1F71" />
            </CardTypeIcon>
            <CardTypeText>Visa</CardTypeText>
          </CardTypeOption>
          
          <CardTypeOption 
            isSelected={formData.cardType === 'mastercard'}
            onPress={() => handleChange('cardType', 'mastercard')}
          >
            <CardTypeIcon>
              <MaterialCommunityIcons name="credit-card-outline" size={20} color="#EB001B" />
            </CardTypeIcon>
            <CardTypeText>Mastercard</CardTypeText>
          </CardTypeOption>
          
          <CardTypeOption 
            isSelected={formData.cardType === 'amex'}
            onPress={() => handleChange('cardType', 'amex')}
          >
            <CardTypeIcon>
              <MaterialCommunityIcons name="credit-card-outline" size={20} color="#006FCF" />
            </CardTypeIcon>
            <CardTypeText>Amex</CardTypeText>
          </CardTypeOption>
        </CardTypeRow>
        
        <FormGroup>
          <Label>Card Number</Label>
          <Input 
            value={formData.cardNumber}
            onChangeText={(text) => handleChange('cardNumber', text)}
            placeholder="1234 5678 9012 3456"
            keyboardType="numeric"
          />
        </FormGroup>
        
        <ExpiryRow>
          <FormGroup style={{ flex: 1, marginRight: 8 }}>
            <Label>Expiry Date (MM/YY)</Label>
            <View style={{ flexDirection: 'row' }}>
              <ExpiryInput 
                value={formData.expiryMonth}
                onChangeText={(text) => handleChange('expiryMonth', text)}
                placeholder="MM"
                keyboardType="numeric"
                maxLength={2}
              />
              <ExpiryInput 
                value={formData.expiryYear}
                onChangeText={(text) => handleChange('expiryYear', text)}
                placeholder="YY"
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
          </FormGroup>
          
          <FormGroup style={{ flex: 1 }}>
            <Label>CVV</Label>
            <CVVInput 
              value={formData.cvv}
              onChangeText={(text) => handleChange('cvv', text)}
              placeholder="123"
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry
            />
          </FormGroup>
        </ExpiryRow>
        
        <FormGroup>
          <Label>Cardholder Name</Label>
          <Input 
            value={formData.name}
            onChangeText={(text) => handleChange('name', text)}
            placeholder="Name as it appears on card"
          />
        </FormGroup>
        
        <CheckboxRow onPress={() => handleChange('isDefault', !formData.isDefault)}>
          <Checkbox checked={formData.isDefault}>
            {formData.isDefault && (
              <MaterialCommunityIcons name="check" size={14} color="#FFF" />
            )}
          </Checkbox>
          <CheckboxLabel>Set as default payment method</CheckboxLabel>
        </CheckboxRow>
      </Content>
      
      <ButtonContainer>
        <Button title="Save Payment Method" onPress={handleSave} />
      </ButtonContainer>
    </Container>
  );
}