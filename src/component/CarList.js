import React from 'react';
import { View } from 'react-native';
import CarListDetail from './CarListDetail';

class CarList extends React.Component {
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
    return <View>{renderList}</View>;
  }
}
export default CarList;
