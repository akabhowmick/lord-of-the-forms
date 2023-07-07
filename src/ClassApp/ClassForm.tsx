import { Component } from "react";
import { UserInformation } from "../types";
import {
  isCityValid,
  isEmailValid,
  isNameValid,
  isValidPhoneNumber,
} from "../utils/validations";
import { PhoneNumberState } from "../types";
import { ClassPhoneInput } from "./ClassTelephoneInput";
import { ClassTextField } from "./ClassTextField";

const firstNameErrorMessage =
  "First name must be at least 2 characters long and contain only letters";
const lastNameErrorMessage =
  "Last name must be at least 2 characters long and contain only letters";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

type State = {
  firstNameInput: string;
  lastNameInput: string;
  emailInput: string;
  cityInput: string;
  phoneNumberInput: PhoneNumberState;
  isSubmitted: boolean;
};

export class ClassForm extends Component<
  { handleUserInfo: (input: UserInformation) => void },
  State
> {
  state: State = {
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    cityInput: "",
    phoneNumberInput: ["", "", "", ""],
    isSubmitted: false,
  };
  render() {
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      cityInput,
      phoneNumberInput,
      isSubmitted,
    } = this.state;

    const isFirstNameValid = isNameValid(firstNameInput);
    const isLastNameValid = isNameValid(lastNameInput);
    const isEmailInputValid = isEmailValid(emailInput);
    const isCityInputValid = isCityValid(cityInput);
    const isPhoneNumberValid = isValidPhoneNumber(phoneNumberInput.join(""));

    const reset = () => {
      this.setState({
        firstNameInput: "",
        lastNameInput: "",
        emailInput: "",
        cityInput: "",
        phoneNumberInput: ["", "", "", ""],
        isSubmitted: false,
      });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      this.setState({ isSubmitted: true });
      if (
        isPhoneNumberValid &&
        isCityInputValid &&
        isEmailInputValid &&
        isLastNameValid &&
        isFirstNameValid
      ) {
        //set User and reset form
        this.props.handleUserInfo({
          firstName: firstNameInput,
          lastName: lastNameInput,
          email: emailInput,
          city: cityInput,
          phone: phoneNumberInput.join(""),
        });
        reset();
      } else {
        alert("one or more inputs contain errors");
      }
    };

    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <ClassTextField
          label="First Name"
          inputProps={{
            placeholder: "Bilbo",
            value: firstNameInput,
            onChange: (e) => {
              this.setState({ firstNameInput: e.target.value });
            },
          }}
          errorMessage={firstNameErrorMessage}
          shouldDisplayError={!isFirstNameValid && isSubmitted}
        />

        {/* last name input */}
        <ClassTextField
          label="Last Name"
          inputProps={{
            placeholder: "Baggins",
            value: lastNameInput,
            onChange: (e) => {
              this.setState({ lastNameInput: e.target.value });
            },
          }}
          errorMessage={lastNameErrorMessage}
          shouldDisplayError={!isLastNameValid && isSubmitted}
        />

        {/* Email Input */}
        <ClassTextField
          label="Email"
          inputProps={{
            placeholder: "bilbo@hobbiton-adventures.com",
            value: emailInput,
            onChange: (e) => {
              this.setState({ emailInput: e.target.value });
            },
          }}
          shouldDisplayError={isSubmitted && !isEmailInputValid}
          errorMessage={emailErrorMessage}
        />

        {/* City Input */}
        <ClassTextField
          inputProps={{
            placeholder: "Hobbiton",
            value: cityInput,
            onChange: (e) => {
              this.setState({ cityInput: e.target.value });
            },
            list: "cities",
          }}
          errorMessage={cityErrorMessage}
          shouldDisplayError={isSubmitted && !isCityInputValid}
          label="City"
        />

        {/* Phone Number */}
        <ClassPhoneInput
          errorMessage={phoneNumberErrorMessage}
          shouldShowError={isSubmitted && !isPhoneNumberValid}
          phoneNumberInput={phoneNumberInput}
          setPhoneNumberInput={(phoneNumberInput) => {
            this.setState({ phoneNumberInput });
          }}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
