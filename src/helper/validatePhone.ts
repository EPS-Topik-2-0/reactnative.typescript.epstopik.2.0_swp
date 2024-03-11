export const isValidPhoneNumber = (input: string) => {
  const phoneNumberRegex = /^[0-9\b]+$/; // Validates a 10-digit phone number
  return phoneNumberRegex.test(input) && input.length>=9;
};
