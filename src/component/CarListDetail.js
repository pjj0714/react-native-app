import React from 'react';
import { View, Text } from 'react-native';

const CarListDetail = ({ capacity, favorite, description, licenseNumber }) => {
  return (
    <View>
      <Text>{capacity}</Text>
      <Text>{favorite}</Text>
      <Text>{description}</Text>
      <Text>{licenseNumber}</Text>
    </View>
  );
};

export default CarListDetail;
