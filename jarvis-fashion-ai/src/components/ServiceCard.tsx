import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ServiceCardProps {
  id: string;
  icon: string;
  title: string;
  description: string;
  partnerName: string;
  partnerType: string;
  rating: number;
  reviewCount: number;
  availability?: string;
  onPress: (id: string) => void;
  onAction: (id: string) => void;
  onDetails: (id: string) => void;
}

const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  elevation: 2;
  shadow-color: ${({ theme }) => theme.colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const IconContainer = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.colors.grey100};
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const ContentContainer = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const Description = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const PartnerRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const PartnerInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PartnerName = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing.sm}px;
`;

const RatingText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-left: ${({ theme }) => theme.spacing.xs}px;
  margin-right: ${({ theme }) => theme.spacing.xs}px;
`;

const ReviewCount = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const Availability = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
`;

const ActionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ActionButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.sm}px;
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  flex: 1;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const ActionText = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 14px;
`;

const DetailsButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.grey100};
  border-radius: ${({ theme }) => theme.radii.sm}px;
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  align-items: center;
`;

const DetailsText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  font-size: 14px;
`;

const ServiceCard = ({
  id,
  icon,
  title,
  description,
  partnerName,
  partnerType,
  rating,
  reviewCount,
  availability,
  onPress,
  onAction,
  onDetails
}: ServiceCardProps) => {
  return (
    <Card>
      <TouchableOpacity activeOpacity={0.9} onPress={() => onPress(id)}>
        <HeaderRow>
          <IconContainer>
            <MaterialCommunityIcons name={icon} size={24} color="#333" />
          </IconContainer>
          <ContentContainer>
            <Title>{title}</Title>
            <Description numberOfLines={2}>{description}</Description>
          </ContentContainer>
        </HeaderRow>
        
        <PartnerRow>
          <PartnerInfo>
            <PartnerName>{partnerName}</PartnerName>
            <RatingContainer>
              <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
              <RatingText>{rating.toFixed(1)}</RatingText>
              <ReviewCount>({reviewCount} reviews)</ReviewCount>
            </RatingContainer>
          </PartnerInfo>
          {availability && <Availability>{availability}</Availability>}
        </PartnerRow>
        
        <ActionRow>
          <ActionButton onPress={() => onAction(id)}>
            <ActionText>Book Now</ActionText>
          </ActionButton>
          <DetailsButton onPress={() => onDetails(id)}>
            <DetailsText>Details</DetailsText>
          </DetailsButton>
        </ActionRow>
      </TouchableOpacity>
    </Card>
  );
};

export default ServiceCard;