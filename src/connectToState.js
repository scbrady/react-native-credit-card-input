import React, { Component, PropTypes } from "react";
import CCFieldFormatter from "./CCFieldFormatter";
import CCFieldValidator from "./CCFieldValidator";
import compact from "lodash.compact";

export const InjectedProps = {
  focused: PropTypes.string,
  values: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  requiresCVC: PropTypes.bool,
};

export default function connectToState(CreditCardInput) {
  class StateConnection extends Component {
    static propTypes = {
      onChange: PropTypes.func.isRequired,
      requiresCVC: PropTypes.bool,
    };

    static defaultProps = {
      onChange: () => {},
      requiresCVC: true,
    };

    constructor() {
      super();
      this.state = {
        focused: "number",
        values: {},
        status: {},
      };
    }

    setValues = values => {
      const { status } = this.state
      const newValues = { ...this.state.values, ...values };
      const displayedFields = this._displayedFields();
      const formattedValues = (new CCFieldFormatter(displayedFields)).formatValues(newValues);
      const validation = (new CCFieldValidator(displayedFields)).validateValues(formattedValues);
      const newState = { values: formattedValues, ...validation };

      this.setCorrectFocus(status, validation.status);
      this.setState(newState);
      this.props.onChange(newState);
    };

    setCorrectFocus = (oldStatus, newStatus) => {
      if (oldStatus.number !== "valid" && newStatus.number === "valid") {
        this.focus("expiry");
      } else if (oldStatus.number === "valid" && newStatus.number !== "valid") {
        this.focus("number");
      }
    }

    focus = (field = "number") => {
      this.setState({ focused: field });
    };

    _displayedFields = () => {
      const { requiresCVC } = this.props;
      return compact([
        "number",
        "expiry",
        requiresCVC ? "cvc" : null,
      ]);
    };

    render() {
      return (
        <CreditCardInput
            {...this.props}
            {...this.state} />
      );
    }
  }

  return StateConnection;
}
