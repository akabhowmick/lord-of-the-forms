import { useState } from "react";
import { FunctionalTextField } from "./FunctionalTextField";
import { PhoneNumberState, UserInformation } from "../types";
import {
  isCityValid,
  isEmailValid,
  isNameValid,
  isValidPhoneNumber,
} from "../utils/validations";
import { FunctionalPhoneInput } from "./FunctionalTelephoneInput";

const firstNameErrorMessage =
  "First name must be at least 2 characters long and contain only letters";
const lastNameErrorMessage =
  "Last name must be at least 2 characters long and contain only letters";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({
  handleUserInfo,
}: {
  handleUserInfo: (newUserData: UserInformation) => void;
}) => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState<PhoneNumberState>([
    "",
    "",
    "",
    "",
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  //validate the state inputs as they update
  const isFirstNameValid = isNameValid(firstNameInput);
  const isLastNameValid = isNameValid(lastNameInput);
  const isEmailInputValid = isEmailValid(emailInput);
  const isCityInputValid = isCityValid(cityInput);
  const isPhoneNumberValid = isValidPhoneNumber(phoneNumberInput.join(""));

  const reset = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setCityInput("");
    setPhoneNumberInput(["", "", "", ""]);
    setIsSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (
      isPhoneNumberValid &&
      isCityInputValid &&
      isEmailInputValid &&
      isLastNameValid &&
      isFirstNameValid
    ) {
      //set User and reset form
      handleUserInfo({
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
      <FunctionalTextField
        label="First Name"
        inputProps={{
          placeholder: "Bilbo",
          value: firstNameInput,
          onChange: (e) => {
            setFirstNameInput(e.target.value);
          },
        }}
        errorMessage={firstNameErrorMessage}
        shouldDisplayError={!isFirstNameValid && isSubmitted}
      />

      {/* last name input */}
      <FunctionalTextField
        label="Last Name"
        inputProps={{
          placeholder: "Baggins",
          value: lastNameInput,
          onChange: (e) => {
            setLastNameInput(e.target.value);
          },
        }}
        errorMessage={lastNameErrorMessage}
        shouldDisplayError={!isLastNameValid && isSubmitted}
      />

      {/* Email Input */}
      <FunctionalTextField
        label="Email"
        inputProps={{
          placeholder: "bilbo-baggins@adventurehobbits.net",
          value: emailInput,
          onChange: (e) => {
            setEmailInput(e.target.value);
          },
        }}
        errorMessage={emailErrorMessage}
        shouldDisplayError={!isEmailInputValid && isSubmitted}
      />

      {/* City Input */}
      {/* Passed in extra list prop since datalist is provided in the App.tsx */}
      <FunctionalTextField
        label="City"
        inputProps={{
          placeholder: "Hobbiton",
          value: cityInput,
          onChange: (e) => {
            setCityInput(e.target.value);
          },
          list: "cities",
        }}
        errorMessage={cityErrorMessage}
        shouldDisplayError={!isCityInputValid && isSubmitted}
      />

      {/* Phone Input */}
      <FunctionalPhoneInput
        errorMessage={phoneNumberErrorMessage}
        shouldShowError={isSubmitted && !isPhoneNumberValid}
        phoneNumberInput={phoneNumberInput}
        setPhoneNumberInput={setPhoneNumberInput}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
