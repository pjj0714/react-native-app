import React from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import CarListDetail from './CarListDetail';
import { connect } from 'react-redux';

class CarList extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    q: ''
  };

  render() {
    const { data } = this.props;
    if (data) {
      const renderList = data
        .sort((a, b) => {
          if (a.favorite) return -1;
        })
        .map((el, idx) => {
          return (
            <CarListDetail
              key={idx}
              id={el.vehicleIdx}
              idx={idx}
              description={el.description}
              capacity={el.capacity}
              licenseNumber={el.licenseNumber}
              favorite={el.favorite}
            />
          );
        });
      return (
        <View style={{ flex: 1 }}>
          <SearchBar
            style={{ flex: 0.1 }}
            containerStyle={{
              marginTop: 24,
              backgroundColor: '#ffffff',
              borderBottomWidth: 1,
              borderBottomColor: 'black'
            }}
            inputContainerStyle={{ backgroundColor: '#ffffff' }}
            icon={{
              type: 'font-awesome',
              name: 'search',
              style: { color: '#00bc45' }
            }}
            placeholder="차량 정보를 검색하세요"
            placeholderTextColor="gray"
            onChangeText={q => this.setState({ q })}
            value={this.state.q}
          />
          <ScrollView
            style={{ flex: 0.8 }}
            showsVerticalScrollIndicator={false}>
            {renderList}
          </ScrollView>
          <Text style={{ flex: 0.1, backgroundColor: '#00bc45' }}>Blank</Text>
        </View>
      );
    }
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: 'center' }}
      />
    );
  }
}

export default connect(state => ({ data: state.vehiclesData.data }))(CarList);
