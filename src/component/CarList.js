import React from "react";
import { View, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CarListDetail from "./CarListDetail";
import SideMenu from "./SideMenu";

const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flex: 0.1,
  },
  searchBorder: {
    marginTop: 24,
    backgroundColor: "#ffffff",
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#666666",
  },
  searchInput: {
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    flex: 0.8,
  },
  bottom: {
    flex: 0.1,
    backgroundColor: "#00bc45",
  },
  loding: {
    flex: 1,
    justifyContent: "center",
  },
});

class CarList extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    login: PropTypes.bool.isRequired,
  };
  state = {
    q: "",
  };

  componentDidUpdate() {
    const { navigation, token, login } = this.props;
    if (token === null && !login) {
      navigation.navigate("InitialHome");
    }
  }

  render() {
    const { q } = this.state;
    const { data, login } = this.props;
    if (data && login) {
      const renderList = data
        .sort(a => {
          if (a.favorite) return -1;
        })
        .map((el, idx) => (
          <CarListDetail
            key={idx}
            id={el.vehicleIdx}
            idx={idx}
            description={el.description}
            capacity={el.capacity}
            licenseNumber={el.licenseNumber}
            favorite={el.favorite}
          />
        ));
      return (
        <View style={Style.container}>
          <SearchBar
            style={Style.searchContainer}
            containerStyle={Style.searchBorder}
            inputContainerStyle={Style.searchInput}
            searchIcon={{ size: 24, color: "#00ac3c" }}
            placeholder="차량 정보를 검색하세요"
            placeholderTextColor="#b2b2b2"
            onChangeText={q => this.setState({ q })}
            value={q}
          />
          <ScrollView
            style={Style.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {renderList}
          </ScrollView>
          <View style={Style.bottom}>
            <SideMenu />
          </View>
        </View>
      );
    }
    return <ActivityIndicator size="large" style={Style.loding} />;
  }
}

export default connect(state => ({
  data: state.vehiclesData.data,
  token: state.login.token,
  login: state.login.success,
}))(CarList);
