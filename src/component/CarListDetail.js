import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import * as FavoriteActions from '../Reducers/favoriteReducer';

const CarListDetail = ({
  capacity,
  favorite,
  description,
  licenseNumber,
  id,
  idx,
  token,
  favoritePutApi
}) => {
  onPressIcon = () => {
    const status = !favorite;
    const data = { status, token, id, idx };
    favoritePutApi(data);
  };

  return (
    <View style={Style.container}>
      <View style={Style.textContainer}>
        <Text style={Style.textDecription}>{description}</Text>
        <Text style={Style.textLicenseNum}>{licenseNumber}</Text>
        <View style={Style.iconContiner}>
          <Icon
            name="star"
            size={16}
            color={favorite ? '#00bc45' : 'black'}
            onPress={this.onPressIcon}
          />
          <Text style={Style.textCapacity}>
            적재용량 : {`${capacity / 1000}t`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  container: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 5,
    borderColor: 'black',
    margin: 8
  },
  textContainer: {
    margin: 8
  },
  textDecription: {
    fontSize: 12
  },
  textLicenseNum: {
    fontSize: 20
  },
  iconContiner: {
    flex: 1,
    flexDirection: 'row'
  },
  textCapacity: {
    fontSize: 14,
    marginLeft: 8
  }
});

const mapStateToProps = state => ({
  token: state.login.token
});
const mapDispatchToProps = dispatch => ({
  favoritePutApi: pay => dispatch(FavoriteActions.favoriteFetchRequest(pay))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarListDetail);
