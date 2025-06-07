import React, { useRef } from 'react';
import { Animated, Easing, TouchableOpacity, Image, View, ImageSourcePropType } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../theme';

interface FeatureCardProps {
  id: string;
  title: string;
  subtitle: string;
  imageUrl?: ImageSourcePropType;
  icon?: string; // Icon name for MaterialCommunityIcons
  onPress: () => void;
  isFirst?: boolean;
}

const CardContainer = styled.TouchableOpacity<{ isFirst?: boolean }>`
  height: 120px;
  margin-top: ${({ isFirst, theme }) =>
    isFirst ? theme.spacing.s5 : 0}px;
  margin-right: ${({ theme }) => theme.spacing.s4}px;
  margin-bottom: ${({ theme }) => theme.spacing.s4}px;
  margin-left: ${({ theme }) => theme.spacing.s4}px;
  border-radius: ${({ theme }) => theme.radii.card}px;
  background-color: ${({ theme }) => theme.colors.background};
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.s4}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 1;
  shadow-radius: 8px;
  elevation: 2;
`;

const CardImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;

const CardIcon = styled.View`
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
`;

const CardTextContainer = styled.View`
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing.s4}px;
  margin-right: ${({ theme }) => theme.spacing.s4}px;
`;

const CardTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.cardTitle.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.cardTitle.fontWeight};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.s1}px;
`;

const CardBody = styled.Text`
  font-size: ${({ theme }) => theme.typography.cardBody.fontSize}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.cardBody.lineHeight}px;
`;

const CardRightIcon = styled.View`
  width: 24px;
  height: 24px;
`;

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const FeatureCard = ({ id, title, subtitle, imageUrl, icon, onPress, isFirst }: FeatureCardProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.97,
      duration: 120,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 120,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  return (
    <CardContainer
      as={AnimatedTouchable}
      style={{ transform: [{ scale: scaleAnim }] }}
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      accessible={true}
      accessibilityLabel={`${title}. ${subtitle}. Button.`}
      accessibilityRole="button"
      isFirst={isFirst}
    >
      {imageUrl ? (
        <CardImage source={imageUrl} />
      ) : (
        <CardIcon>
          <MaterialCommunityIcons 
            name={icon} 
            size={48} 
            color={theme.colors.primary} 
          />
        </CardIcon>
      )}
      
      <CardTextContainer>
        <CardTitle>{title}</CardTitle>
        <CardBody numberOfLines={2}>{subtitle}</CardBody>
      </CardTextContainer>
      
      <CardRightIcon>
        <MaterialCommunityIcons 
          name="chevron-right" 
          size={24} 
          color={theme.colors.textSecondary} 
        />
      </CardRightIcon>
    </CardContainer>
  );
};

export default FeatureCard;