import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const CarListDetail = ({ capacity, favorite, description, licenseNumber }) => {
  return (
    <View
      style={{
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 2,
        borderRadius: 5,
        borderColor: 'balck',
        margin: 8
      }}>
      <Text style={{ fontSize: 12, margin: 8 }}>{description}</Text>
      <Text style={{ fontSize: 20, margin: 8 }}>{licenseNumber}</Text>
      <View style={{ flex: 1, flexDirection: 'row', margin: 8 }}>
        <Icon name="star" />
        <Text style={{ fontSize: 14, marginLeft: 8 }}>
          적재용량 : {`${capacity / 1000}t`}
        </Text>
      </View>
    </View>
  );
};

export default CarListDetail;
