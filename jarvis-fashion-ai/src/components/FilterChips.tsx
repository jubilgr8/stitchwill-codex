import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';

interface FilterChipsProps {
  filters: string[];
  onFilterChange: (selectedFilters: string[]) => void;
  singleSelect?: boolean;
}

const Container = styled.ScrollView`
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const Chip = styled.TouchableOpacity<{ isSelected: boolean }>`
  background-color: ${({ isSelected, theme }) => 
    isSelected ? theme.colors.primary : theme.colors.grey100};
  border-radius: ${({ theme }) => theme.radii.lg}px;
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const ChipText = styled.Text<{ isSelected: boolean }>`
  color: ${({ isSelected, theme }) => 
    isSelected ? theme.colors.white : theme.colors.text};
  font-weight: 500;
  font-size: 14px;
`;

export const FilterChips = ({ filters, onFilterChange, singleSelect = false }: FilterChipsProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    let newFilters;
    
    if (singleSelect) {
      // If single select mode, only allow one selected filter
      newFilters = selectedFilters.includes(filter) ? [] : [filter];
    } else {
      // Multiple selection mode
      if (selectedFilters.includes(filter)) {
        newFilters = selectedFilters.filter(f => f !== filter);
      } else {
        newFilters = [...selectedFilters, filter];
      }
    }
    
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Container horizontal showsHorizontalScrollIndicator={false}>
      {filters.map((filter) => (
        <Chip
          key={filter}
          isSelected={selectedFilters.includes(filter)}
          onPress={() => toggleFilter(filter)}
          activeOpacity={0.7}
        >
          <ChipText isSelected={selectedFilters.includes(filter)}>
            {filter}
          </ChipText>
        </Chip>
      ))}
    </Container>
  );
};

export default FilterChips;