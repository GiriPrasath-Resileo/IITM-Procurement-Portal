import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import zxcvbn from 'zxcvbn';

const PasswordStrength = ({ password }) => {
  if (!password) return null;
  
  const result = zxcvbn(password);
  const strength = result.score;
  const feedback = result.feedback.suggestions[0] || 'Add more characters';
  
  const strengthLabels = [
    'Very Weak',
    'Weak',
    'Fair',
    'Good',
    'Strong'
  ];
  
  const colors = [
    '#ff4d4f', // red
    '#ff7a45', // orange
    '#ffa940', // yellow
    '#73d13d', // green
    '#52c41a'  // dark green
  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        {[0, 1, 2, 3, 4].map((index) => (
          <View
            key={index}
            style={[
              styles.bar,
              strength >= index && { backgroundColor: colors[strength] }
            ]}
          />
        ))}
      </View>
      <Text style={[styles.label, { color: colors[strength] }]}>
        {strengthLabels[strength]} • {feedback}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    width: '100%'
  },
  barContainer: {
    flexDirection: 'row',
    height: 6,
    marginBottom: 4
  },
  bar: {
    flex: 1,
    height: '100%',
    backgroundColor: '#f0f0f0',
    marginHorizontal: 2,
    borderRadius: 3
  },
  label: {
    fontSize: 12,
    fontWeight: '500'
  }
});

export default PasswordStrength;