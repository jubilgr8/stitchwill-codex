import React, { useState } from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../../components/Button';

const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

const ModalContent = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  border-top-left-radius: ${({ theme }) => theme.radii.lg}px;
  border-top-right-radius: ${({ theme }) => theme.radii.lg}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const CloseButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing.xs}px;
`;

const Section = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const FilterRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const FilterChip = styled.TouchableOpacity<{ isSelected: boolean }>`
  background-color: ${({ isSelected, theme }) => 
    isSelected ? theme.colors.primary : theme.colors.grey100};
  border-radius: ${({ theme }) => theme.radii.lg}px;
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const FilterChipText = styled.Text<{ isSelected: boolean }>`
  color: ${({ isSelected, theme }) => 
    isSelected ? theme.colors.white : theme.colors.text};
  font-weight: 500;
  font-size: 14px;
`;

const ButtonContainer = styled.View`
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

export default function FilterModal({ visible, onClose, onApply }: FilterModalProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  
  const roles = ['Designer', 'Model', 'Stylist', 'Customer'];
  const statuses = ['In Progress', 'Completed', 'Cancelled'];
  const dateRanges = ['Today', 'This Week', 'This Month', 'This Year'];
  
  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };
  
  const toggleStatus = (status: string) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(selectedStatus.filter(s => s !== status));
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
  };
  
  const selectDate = (date: string) => {
    setSelectedDate(date === selectedDate ? '' : date);
  };
  
  const handleApply = () => {
    onApply({
      roles: selectedRoles,
      status: selectedStatus,
      date: selectedDate,
    });
    onClose();
  };
  
  const handleReset = () => {
    setSelectedRoles([]);
    setSelectedStatus([]);
    setSelectedDate('');
  };
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <ModalContainer>
        <ModalContent>
          <Header>
            <Title>Filter Feed</Title>
            <CloseButton onPress={onClose}>
              <MaterialCommunityIcons name="close" size={24} color="#000" />
            </CloseButton>
          </Header>
          
          <Section>
            <SectionTitle>Role</SectionTitle>
            <FilterRow>
              {roles.map(role => (
                <FilterChip 
                  key={role}
                  isSelected={selectedRoles.includes(role)}
                  onPress={() => toggleRole(role)}
                >
                  <FilterChipText isSelected={selectedRoles.includes(role)}>
                    {role}
                  </FilterChipText>
                </FilterChip>
              ))}
            </FilterRow>
          </Section>
          
          <Section>
            <SectionTitle>Status</SectionTitle>
            <FilterRow>
              {statuses.map(status => (
                <FilterChip 
                  key={status}
                  isSelected={selectedStatus.includes(status)}
                  onPress={() => toggleStatus(status)}
                >
                  <FilterChipText isSelected={selectedStatus.includes(status)}>
                    {status}
                  </FilterChipText>
                </FilterChip>
              ))}
            </FilterRow>
          </Section>
          
          <Section>
            <SectionTitle>Date Range</SectionTitle>
            <FilterRow>
              {dateRanges.map(date => (
                <FilterChip 
                  key={date}
                  isSelected={selectedDate === date}
                  onPress={() => selectDate(date)}
                >
                  <FilterChipText isSelected={selectedDate === date}>
                    {date}
                  </FilterChipText>
                </FilterChip>
              ))}
            </FilterRow>
          </Section>
          
          <ButtonContainer>
            <Button title="Apply Filters" onPress={handleApply} />
            <View style={{ height: 10 }} />
            <Button title="Reset" onPress={handleReset} variant="secondary" />
          </ButtonContainer>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
}