import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  ViewPropTypes,
} from "react-native";

export default class CCInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    status: PropTypes.oneOf(["valid", "invalid", "incomplete"]),

    containerStyle: ViewPropTypes.style,
    inputStyle: Text.propTypes.style,
    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,
  };

  static defaultProps = {
    value: "",
    status: "incomplete",
    containerStyle: {},
    inputStyle: {},
  };

  render() {
    const { value, placeholder, status,
            containerStyle, inputStyle,
            validColor, invalidColor, placeholderColor } = this.props;
    return (
      <View style={[containerStyle]}>
        { value ?
          <Text ref="input"
              style={[
                inputStyle,
                ((validColor && status === "valid") ? { color: validColor } :
                  (invalidColor && status === "invalid") ? { color: invalidColor } :
                    {}),
              ]} >
            {value}
          </Text> :
          <Text
              style={[
                inputStyle,
                { color: placeholderColor },
              ]} >
            {placeholder}
          </Text>
        }
      </View>
    );
  }
}
