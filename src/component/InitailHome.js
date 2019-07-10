import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import * as Actions from '../Reducers/loginReducer';

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

  componentDidUpdate() {
    const { data, navigation } = this.props;
    if (data !== null) {
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
    const { userId, password, deviceType } = this.state;
    const { isLogin } = this.props;
    const userData = {
      userId,
      password,
      deviceType
    };

    isLogin(userData);
  };

  render() {
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
  data: state.login.data,
  token: state.login.token
});

const mapDispatchToProps = dispatch => ({
  isLogin: data => dispatch(Actions.login(data))
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
