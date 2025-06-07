import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ProductCardProps {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
  price: string;
  partnerName: string;
  partnerIcon: string;
  onPress: (id: string) => void;
  onSave: (id: string) => void;
  onAction: (id: string) => void;
  actionLabel: string;
}

const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  overflow: hidden;
  elevation: 2;
  shadow-color: ${({ theme }) => theme.colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 200px;
`;

const ContentContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const Subtitle = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const PartnerRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const PartnerIcon = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.grey100};
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.xs}px;
`;

const PartnerName = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const ActionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ActionButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.sm}px;
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  flex: 1;
  align-items: center;
`;

const ActionText = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 14px;
`;

const SaveButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.grey100};
  align-items: center;
  justify-content: center;
  margin-left: ${({ theme }) => theme.spacing.sm}px;
`;

const ProductCard = ({
  id,
  imageUrl,
  title,
  category,
  price,
  partnerName,
  partnerIcon,
  onPress,
  onSave,
  onAction,
  actionLabel
}: ProductCardProps) => {
  return (
    <Card>
      <TouchableOpacity activeOpacity={0.9} onPress={() => onPress(id)}>
        <ProductImage source={{ uri: imageUrl }} resizeMode="cover" />
        <ContentContainer>
          <Title numberOfLines={1}>{title}</Title>
          <Subtitle>{category} • {price}</Subtitle>
          
          <PartnerRow>
            <PartnerIcon>
              <MaterialCommunityIcons name={partnerIcon} size={14} color="#333" />
            </PartnerIcon>
            <PartnerName>{partnerName}</PartnerName>
          </PartnerRow>
          
          <ActionRow>
            <ActionButton onPress={() => onAction(id)}>
              <ActionText>{actionLabel}</ActionText>
            </ActionButton>
            <SaveButton onPress={() => onSave(id)}>
              <MaterialCommunityIcons name="heart-outline" size={20} color="#333" />
            </SaveButton>
          </ActionRow>
        </ContentContainer>
      </TouchableOpacity>
    </Card>
  );
};

export default ProductCard;