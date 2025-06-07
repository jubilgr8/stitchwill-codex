import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import styled from "styled-components/native";
import { FeedStackParamList } from "../../navigation/FeedStack";
import SafeScreen from "../../components/SafeScreen";
import FeatureCard from "../../components/FeatureCard";
import ChatInput from "../../components/ChatInput";
import theme from "../../theme";

type FeedScreenNavigationProp = StackNavigationProp<
  FeedStackParamList,
  "FeedHome"
>;

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const GreetingHeader = styled.Text`
  font-size: ${({ theme }) => theme.typography.header1.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.header1.fontWeight};
  line-height: ${({ theme }) => theme.typography.header1.lineHeight}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: ${({ theme }) => theme.spacing.s4}px
    ${({ theme }) => theme.spacing.s4}px ${({ theme }) => theme.spacing.s5}px;
`;

// Feature card data
const featureCards = [
  {
    id: "tryOn",
    title: "Try On Clothes",
    subtitle: "Browse the collection and try on outfits on your avatar",
    icon: "account",
    navigateTo: "TryOnFlow",
  },
  {
    id: "design",
    title: "Design & Tailor",
    subtitle:
      "Create custom designs and get them tailored to your measurements",
    icon: "tshirt-crew",
    navigateTo: "DesignFlow",
  },
  {
    id: "fabric",
    title: "Fabric & Tailor Only",
    subtitle: "Choose fabrics and get them tailored without design services",
    icon: "palette-swatch",
    navigateTo: "FabricFlow",
  },
];

export default function FeedScreen() {
  const navigation = useNavigation<FeedScreenNavigationProp>();

  const handleFeatureCardPress = (navigateTo: string) => {
    // Fire analytics event
    console.log("FeatureCardTapped", { featureId: navigateTo });
    navigation.navigate(navigateTo as any);
  };

  const handleChatPress = () => {
    // Fire analytics event
    console.log("ChatInputOpened");
    // Open chat modal or bottom sheet
  };

  return (
    <SafeScreen>
      <Container>
        <GreetingHeader accessible={true} accessibilityRole="header">
          Hello, Jane!
        </GreetingHeader>

        {featureCards.map((card, index) => (
          <FeatureCard
            key={card.id}
            id={card.id}
            title={card.title}
            subtitle={card.subtitle}
            icon={card.icon}
            onPress={() => handleFeatureCardPress(card.navigateTo)}
            isFirst={index === 0}
          />
        ))}

        <View style={{ flex: 1 }} />

        <ChatInput onFocus={handleChatPress} onMicPress={handleChatPress} />
      </Container>
    </SafeScreen>
  );
}
