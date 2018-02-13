import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  Image,
  LayoutAnimation,
} from "react-native";

import Icons from "./Icons";
import CCInput from "./CCInput";
import { InjectedProps } from "./connectToState";

const INFINITE_WIDTH = 1000;

const s = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  icon: {
    width: 48,
    height: 40,
    resizeMode: "contain",
  },
  leftPart: {
    flex: 1,
    overflow: "hidden",
  },
  rightPart: {
    flex: 1,
    paddingLeft: 10,
    overflow: "hidden",
    flexDirection: "row",
  },
  numberInput: {
    width: INFINITE_WIDTH,
  },
  expiryInput: {
    width: 80,
  },
  cvcInput: {
    width: 80,
  },
  input: {
    color: "black",
    fontSize: 16,
  },
});

/* eslint react/prop-types: 0 */ // https://github.com/yannickcr/eslint-plugin-react/issues/106
export default class LiteCreditCardInput extends Component {
  static propTypes = {
    ...InjectedProps,

    placeholders: PropTypes.object,

    inputStyle: Text.propTypes.style,

    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,
  };

  static defaultProps = {
    placeholders: {
      number: "1234 5678 1234 5678",
      expiry: "MM/YY",
      cvc: "CVC",
    },
    validColor: "",
    invalidColor: "red",
    placeholderColor: "gray",
  };

  componentDidMount = () => this._focus(this.props.focused);

  componentWillReceiveProps = newProps => {
    if (this.props.focused !== newProps.focused) this._focus(newProps.focused);
  };

  _focus = field => {
    if (!field) return;
    LayoutAnimation.easeInEaseOut();
  }

  _inputProps = field => {
    const {
      inputStyle, validColor, invalidColor, placeholderColor,
      placeholders, values, status,
    } = this.props;

    return {
      inputStyle: [s.input, inputStyle],
      validColor, invalidColor, placeholderColor,
      ref: field,

      placeholder: placeholders[field],
      value: values[field],
      status: status[field],
    };
  };

  _iconToShow = () => {
    const { focused, values: { type } } = this.props;
    if (focused === "cvc" && type === "american-express") return "cvc_amex";
    if (focused === "cvc") return "cvc";
    if (type) return type;
    return "placeholder";
  }

  render() {
    const { focused } = this.props;
    const showRightPart = focused && focused !== "number";

    return (
      <View style={s.container}>
        {!showRightPart &&
          <View style={s.leftPart}>
            <CCInput {...this._inputProps("number")}
                containerStyle={s.numberInput} />
          </View>
        }
        <Image style={s.icon} source={Icons[this._iconToShow()]} />
        {showRightPart &&
          <View style={s.rightPart}>
            <CCInput {...this._inputProps("expiry")}
                containerStyle={s.expiryInput} />
            <CCInput {...this._inputProps("cvc")}
                containerStyle={s.cvcInput} />
          </View>
        }
      </View>
    );
  }
}
