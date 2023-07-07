export const capitalize = (input: string) => {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

export const formatPhoneNumber = (phoneNumber: string) => {
    return `${phoneNumber.slice(0, 2)}-${phoneNumber.slice(2, 4)}-${phoneNumber.slice(4, 6)}-${phoneNumber.slice(6, 7)}`;
}