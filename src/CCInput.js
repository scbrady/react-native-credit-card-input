import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
} from "react-native";

export default class CCInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    status: PropTypes.oneOf(["valid", "invalid", "incomplete"]),

    containerStyle: View.propTypes.style,
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
