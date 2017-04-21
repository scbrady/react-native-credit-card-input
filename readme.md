
# React Native Credit Card Input
Easy (and good looking) credit-card input for your React Native Project 💳 💳

This is a fork that only has controlled input, will not work with the keyboard

<p align="center">
<img src="https://github.com/sbycrosz/react-native-credit-card-input/blob/master/preview-ios-lite.gif?raw=true" width=200/>
<img src="https://github.com/sbycrosz/react-native-credit-card-input/blob/master/preview-android-lite.gif?raw=true" width=200/>
</p>

Code:

```js
<LiteCreditCardInput onChange={this._onChange} />
```


# Features
* Lite version for smaller screens (or if skeuomorphic is not really your thing)
* Credit-card input validations & formatting
* Works on both Android and iOS

# Usage

```bash
npm i --save react-native-credit-card-input
```

then add these lines in your react-native codebase

```js
import { LiteCreditCardInput } from "react-native-credit-card-input";

<LiteCreditCardInput onChange={this._onChange} />

// Note: You'll need to enable LayoutAnimation on android to see LiteCreditCardInput's animations
// UIManager.setLayoutAnimationEnabledExperimental(true);

```

And then on your onChange handler:

```js
_onChange => form => console.log(form);

// will print:
{
  valid: true, // will be true once all fields are "valid" (time to enable the submit button)
  values: { // will be in the sanitized and formatted form
  	number: "4242 4242",
  	expiry: "06/19",
  	cvc: "300",
  	type: "visa", // will be one of [null, "visa", "master-card", "american-express", "diners-club", "discover", "jcb", "unionpay", "maestro"]
  	name: "Sam",
  	postalCode: "34567",
  },
  status: {  // will be one of ["incomplete", "invalid", and "valid"]
	number: "incomplete",
	expiry: "incomplete",
	cvc: "incomplete",
	name: "incomplete", 
	postalCode: "incomplete",
  },
};

// Notes: 
// cvc, name, & postalCode will only be available when the respective props is enabled (e.g. requiresName, requiresCVC)
```

# Props

## LiteCreditCardInput
| Property | Type | Description |
| --- | --- | --- |
|onChange | PropTypes.func | Receives a `formData` object every time the form changes |
|placeholders | PropTypes.object | Defaults to <br/>`{ number: "1234 5678 1234 5678", expiry: "MM/YY", cvc: "CVC" }` |
|inputStyle | Text.propTypes.style | Style for credit-card form's textInput |
|validColor | PropTypes.string | Color that will be applied for valid text input. Defaults to: "{inputStyle.color}" |
|invalidColor | PropTypes.string | Color that will be applied for invalid text input. Defaults to: "red" |
|placeholderColor | PropTypes.string | Color that will be applied for text input placeholder. Defaults to: "gray" |

# Methods
## setValues
Set values into credit card form


```js
	// sets 4242 on credit card number field
	// other fields will stay unchanged
	this.refs.CCInput.setValues({ number: "4242" });
```
