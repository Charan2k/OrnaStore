import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import theme from '../theme/colors';

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  filterSection: {
    flex: 1,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: theme.colors.text,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    backgroundColor: theme.colors.background,
    ...Platform.select({
      ios: {
        height: 40,
      },
      android: {
        height: 50,
      },
    }),
  },
  picker: {
    ...Platform.select({
      ios: {
        height: 40,
      },
      android: {
        height: 50,
        color: theme.colors.text,
      },
    }),
  },
  iosPickerContainer: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    backgroundColor: theme.colors.background,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  iosPickerText: {
    color: theme.colors.text,
    fontSize: 16,
  },
  iosPickerIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -5 }],
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: theme.colors.text,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
  },
  modalCloseButton: {
    padding: 5,
  },
  modalCloseText: {
    color: theme.colors.primary,
    fontSize: 16,
  },
  optionsContainer: {
    maxHeight: 300,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  optionButtonSelected: {
    backgroundColor: theme.colors.primary + '20',
  },
  optionText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  optionTextSelected: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});

const IOSPickerField = ({ title, selectedValue, onSelect, options, showPicker, setShowPicker }) => {
  const selectedOption = options.find(opt => opt.value === selectedValue);

  const handleSelect = (value) => {
    onSelect(value);
    setShowPicker(false);
  };

  return (
    <View style={styles.filterSection}>
      <Text style={styles.filterTitle}>{title}</Text>
      <TouchableOpacity
        style={styles.iosPickerContainer}
        onPress={() => setShowPicker(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.iosPickerText}>
          {selectedOption?.label || 'Select'}
        </Text>
        <View style={styles.iosPickerIcon} />
      </TouchableOpacity>

      <Modal
        visible={showPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPicker(false)}
      >
        <TouchableOpacity 
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setShowPicker(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{title}</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowPicker(false)}
              >
                <Text style={styles.modalCloseText}>Done</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.optionsContainer}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionButton,
                    option.value === selectedValue && styles.optionButtonSelected,
                  ]}
                  onPress={() => handleSelect(option.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      option.value === selectedValue && styles.optionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default function FilterBar({ filters, setFilters }) {
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showTypePicker, setShowTypePicker] = useState(false);

  const genderFilters = [
    { label: 'All', value: '' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const ornamentTypeFilters = [
    { label: 'All', value: '' },
    { label: 'Ring', value: 'ring' },
    { label: 'Bracelet', value: 'bracelet' },
    { label: 'Chain', value: 'chain' },
    { label: 'Necklace', value: 'necklace' },
    { label: 'Earrings', value: 'earrings' },
    { label: 'Anklet', value: 'anklet' },
  ];

  if (Platform.OS === 'ios') {
    return (
      <View style={styles.container}>
        <View style={styles.filterRow}>
          <IOSPickerField
            title="Gender"
            selectedValue={filters.gender}
            onSelect={(value) => setFilters(prev => ({ ...prev, gender: value }))}
            options={genderFilters}
            showPicker={showGenderPicker}
            setShowPicker={setShowGenderPicker}
          />
          <IOSPickerField
            title="Type"
            selectedValue={filters.ornamentType}
            onSelect={(value) => setFilters(prev => ({ ...prev, ornamentType: value }))}
            options={ornamentTypeFilters}
            showPicker={showTypePicker}
            setShowPicker={setShowTypePicker}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Gender</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={filters.gender}
              style={styles.picker}
              onValueChange={(value) => setFilters(prev => ({ ...prev, gender: value }))}
            >
              {genderFilters.map((filter) => (
                <Picker.Item
                  key={filter.value}
                  label={filter.label}
                  value={filter.value}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={filters.ornamentType}
              style={styles.picker}
              onValueChange={(value) => setFilters(prev => ({ ...prev, ornamentType: value }))}
            >
              {ornamentTypeFilters.map((filter) => (
                <Picker.Item
                  key={filter.value}
                  label={filter.label}
                  value={filter.value}
                />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    </View>
  );
}
