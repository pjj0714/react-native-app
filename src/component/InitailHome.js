import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import * as LoginActions from '../Reducers/loginReducer';
import * as VehiclesActions from '../Reducers/vehiclesDataReducer';

class InitailHome extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    userId: '',
    password: '',
    deviceType: Platform.OS,
    keep: false
  };

  componentDidMount() {
    this.keepLoggedInHandler();
  }

  async keepLoggedInHandler() {
    try {
      const { vehiclesGetData, navigation, keepLoggedIn } = this.props;
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      if (token) {
        keepLoggedIn(token);
        vehiclesGetData(token);
        navigation.navigate('CarList');
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate() {
    const { data, navigation, login } = this.props;
    if (login) {
      navigation.navigate('CarList', { data });
    }
  }

  onPressCheckBox = () => {
    const { keep } = this.state;
    this.setState({ keep: !keep });
  };

  onChangeUserIdText = e => {
    this.setState({
      userId: e
    });
  };

  onChangePasswordText = e => {
    this.setState({
      password: e
    });
  };

  getData = () => {
    const { userId, password, deviceType, keep } = this.state;
    const { isLogin } = this.props;
    const userData = {
      userId,
      password,
      deviceType,
      keep
    };

    isLogin(userData);
  };

  render() {
    console.log(this.props.data);
    return (
      <View style={Style.container}>
        <View style={Style.topBlanck} />
        <View style={Style.img}>
          <Icon name="picture" size={120} />
        </View>
        <KeyboardAvoidingView // text and textinput container
          style={Style.textContainer}
          behavior="padding"
          enabled>
          <Text style={Style.text}>ID</Text>
          <TextInput //Id
            style={Style.textInput}
            onChangeText={e => this.onChangeUserIdText(e)}
          />
          <Text style={Style.text}>Password</Text>
          <TextInput // password
            style={Style.textInput}
            secureTextEntry
            onChangeText={e => this.onChangePasswordText(e)}
          />
          <View style={Style.checkBoxContainer}>
            <Icon
              name="checksquareo"
              size={18}
              color={this.state.keep ? '#00bc45' : 'black'}
              onPress={this.onPressCheckBox}
            />
            <Text style={Style.checkBoxText} onPress={this.onPressCheckBox}>
              로그인 상태 유지
            </Text>
          </View>
        </KeyboardAvoidingView>
        <View style={Style.btnContainer}>
          <TouchableOpacity style={Style.loginBtn} onPress={this.getData}>
            <Text style={Style.loginBtnText}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Style.passwordBtn}>
            <Text style={Style.passwordBtnText}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  data: state.vehiclesData.data,
  token: state.login.token,
  login: state.login.success
});

const mapDispatchToProps = dispatch => ({
  isLogin: data => dispatch(LoginActions.login(data)),
  vehiclesGetData: token => dispatch(VehiclesActions.fetchRequest(token)),
  keepLoggedIn: token => dispatch(LoginActions.loginSuccess(token))
});

const Style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  img: {
    flex: 2
  },
  topBlanck: {
    flex: 1
  },
  textContainer: {
    flex: 2
  },
  text: {
    marginBottom: 6,
    fontSize: 14
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    height: hp('6%'),
    width: wp('80%'),
    marginBottom: 10,
    borderRadius: 5
  },
  checkBoxContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  checkBoxText: {
    marginLeft: 8
  },
  btnContainer: {
    flex: 2,
    marginTop: 25
  },
  loginBtn: {
    backgroundColor: '#00bc45',
    marginBottom: 8,
    padding: 14,
    borderRadius: 5,
    width: wp('80%')
  },
  loginBtnText: {
    color: '#deffffff',
    fontSize: 16,
    alignSelf: 'center'
  },
  passwordBtn: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 16,
    borderRadius: 5,
    padding: 14,
    width: wp('80%')
  },
  passwordBtnText: {
    color: '#00bc45',
    fontSize: 16,
    alignSelf: 'center'
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitailHome);
