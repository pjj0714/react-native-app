import React from 'react';
import { Text, View, TextInput, ScrollView } from 'react-native';
import { SearchBar, colors } from 'react-native-elements';
import CarListDetail from './CarListDetail';
import Icon from 'react-native-vector-icons/AntDesign';

class CarList extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigation } = this.props;
    const { data } = navigation.state.params;
    const renderList = data.map((el, idx) => {
      return (
        <CarListDetail
          key={idx}
          description={el.description}
          capacity={el.capacity}
          licenseNumber={el.licenseNumber}
          favorite={el.favorite}
        />
      );
    });
    return (
      // <View style={{ flex: 1 }}>
      //   <Text style={{ backgroundColor: 'red', flex: 0.1 }} />
      //   <Text style={{ backgroundColor: 'blue', flex: 0.8 }} />
      //   <Text style={{ backgroundColor: 'pink', flex: 0.1 }} />
      // </View>
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
          // TextInput style={{ marginTop: 24, fontSize: 24, height: 48 }}
          placeholder="차량 정보를 검색하세요"
          placeholderTextColor="gray"
        />
        <ScrollView style={{ flex: 0.8 }} showsVerticalScrollIndicator={false}>
          {renderList}
        </ScrollView>
        <Text style={{ flex: 0.1, backgroundColor: '#00bc45', marginTop: 16 }}>
          Blank
        </Text>
      </View>
    );
  }
}

export default CarList;
