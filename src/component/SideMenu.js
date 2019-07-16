import React from "react";
import { View } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import Icon from "react-native-vector-icons/Feather";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as AuthActions from "../Reducers/loginReducer";

class SideMenu extends React.PureComponent {
  static propTypes = {
    logoutHandler: PropTypes.func.isRequired,
  };

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    const { logoutHandler } = this.props;
    logoutHandler();
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  render() {
    return (
      <View>
        <Menu
          ref={this.setMenuRef}
          button={(
            <Icon
              name="menu"
              size={24}
              color="#ffffff"
              style={{ margin: 16 }}
              onPress={this.showMenu}
            />
)}
        >
          <MenuItem onPress={this.hideMenu}>Logout</MenuItem>
          <MenuItem onPress={this.hideMenu}>Menu item 2</MenuItem>

          <MenuDivider />
          <MenuItem onPress={this.hideMenu}>Menu item 4</MenuItem>
        </Menu>
      </View>
    );
  }
}

export default connect(
  null,
  dispatch => ({ logoutHandler: () => dispatch(AuthActions.logout()) }),
)(SideMenu);
