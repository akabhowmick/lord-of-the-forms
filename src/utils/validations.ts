import { allCities } from "./all-cities";

export const isEmailValid = (emailAddress: string) => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
};

export function isAllNumbers(phoneInput: string) {
  return !phoneInput.match(/[^0-9]/);
}

export const isValidPhoneNumber = (phoneInput: string) => {
  return isAllNumbers(phoneInput) && phoneInput.length == 7;
};

export const isCityValid = (cityInput: string) => {
  return allCities.find(
    (city) => city.toLowerCase() === cityInput.toLowerCase()
  );
};

export const isNameValid = (nameInput: string) => {
  return nameInput.length >= 2 && !/[^a-zA-Z]/.test(nameInput);
};
