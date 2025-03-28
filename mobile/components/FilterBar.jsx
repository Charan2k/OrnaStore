import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import theme from '../theme/colors';

const FilterBar = ({ filters, setFilters }) => {
  const FilterButton = ({ label, type, value }) => (
    <TouchableOpacity
      onPress={() => setFilters(prev => ({
        ...prev,
        [type]: prev[type] === value ? null : value
      }))}
      style={{
        padding: theme.spacing.elementPadding,
        backgroundColor: filters[type] === value ? theme.colors.primary : '#f0f0f0',
        borderRadius: 8,
        marginHorizontal: 4
      }}
    >
      <Text style={{ 
        color: filters[type] === value ? 'white' : theme.colors.textSecondary,
        fontSize: 14,
      }}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ 
      padding: theme.spacing.screenMargin,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.background
    }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        <FilterButton label="Men" type="gender" value="Men" />
        <FilterButton label="Women" type="gender" value="Women" />
        <FilterButton label="Unisex" type="gender" value="Unisex" />
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
        <FilterButton label="Rings" type="category" value="Ring" />
        <FilterButton label="Necklaces" type="category" value="Necklace" />
        <FilterButton label="Others" type="category" value="Others" />
      </View>
    </View>
  );
};

export default FilterBar;
