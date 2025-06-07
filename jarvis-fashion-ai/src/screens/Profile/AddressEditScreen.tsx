import React, { useState, useEffect } from 'react';
import { View, StatusBar, ScrollView, TextInput } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ProfileStackParamList } from '../../navigation/ProfileStack';
import Button from '../../components/Button';

type AddressEditRouteProp = RouteProp<ProfileStackParamList, 'AddressEdit'>;
type AddressEditNavigationProp = StackNavigationProp<ProfileStackParamList, 'AddressEdit'>;

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

// Mock address data for editing
const mockAddress = {
  id: '2',
  name: 'Work',
  address: '456 Style Ave, Floor 8',
  city: 'New York',
  state: 'NY',
  zipCode: '10002',
  country: 'United States',
  phone: '+1 (555) 987-6543',
  isDefault: false,
};

export default function AddressEditScreen() {
  const navigation = useNavigation<AddressEditNavigationProp>();
  const route = useRoute<AddressEditRouteProp>();
  const { addressId } = route.params || {};
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    isDefault: false,
  });
  
  useEffect(() => {
    // In a real app, you would fetch the address data based on the ID
    if (addressId) {
      setFormData(mockAddress);
    }
  }, [addressId]);
  
  const handleChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  
  const handleSave = () => {
    // In a real app, you would save the address data
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
          {addressId ? 'Edit Address' : 'Add New Address'}
        </HeaderTitle>
      </Header>
      
      <Content showsVerticalScrollIndicator={false}>
        <FormGroup>
          <Label>Address Name</Label>
          <Input 
            value={formData.name}
            onChangeText={(text) => handleChange('name', text)}
            placeholder="Home, Work, etc."
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Street Address</Label>
          <Input 
            value={formData.address}
            onChangeText={(text) => handleChange('address', text)}
            placeholder="Street address, apartment, suite, etc."
          />
        </FormGroup>
        
        <FormGroup>
          <Label>City</Label>
          <Input 
            value={formData.city}
            onChangeText={(text) => handleChange('city', text)}
            placeholder="City"
          />
        </FormGroup>
        
        <View style={{ flexDirection: 'row' }}>
          <FormGroup style={{ flex: 1, marginRight: 8 }}>
            <Label>State/Province</Label>
            <Input 
              value={formData.state}
              onChangeText={(text) => handleChange('state', text)}
              placeholder="State"
            />
          </FormGroup>
          
          <FormGroup style={{ flex: 1, marginLeft: 8 }}>
            <Label>ZIP/Postal Code</Label>
            <Input 
              value={formData.zipCode}
              onChangeText={(text) => handleChange('zipCode', text)}
              placeholder="ZIP Code"
            />
          </FormGroup>
        </View>
        
        <FormGroup>
          <Label>Country</Label>
          <Input 
            value={formData.country}
            onChangeText={(text) => handleChange('country', text)}
            placeholder="Country"
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Phone Number</Label>
          <Input 
            value={formData.phone}
            onChangeText={(text) => handleChange('phone', text)}
            placeholder="Phone number"
            keyboardType="phone-pad"
          />
        </FormGroup>
        
        <CheckboxRow onPress={() => handleChange('isDefault', !formData.isDefault)}>
          <Checkbox checked={formData.isDefault}>
            {formData.isDefault && (
              <MaterialCommunityIcons name="check" size={14} color="#FFF" />
            )}
          </Checkbox>
          <CheckboxLabel>Set as default shipping address</CheckboxLabel>
        </CheckboxRow>
      </Content>
      
      <ButtonContainer>
        <Button title="Save Address" onPress={handleSave} />
      </ButtonContainer>
    </Container>
  );
}