export const SignUpPasswordRules = [
  {
    label: "At least one uppercase letter.",
    regex: "[A-Z]",
  },
  {
    label: "At least one lowercase letter.",
    regex: "[a-z]",
  },
  {
    label: "At least one number.",
    regex: "[0-9]",
  },
  {
    label: "Your password should not contain any spaces.",
    regex: "^[\\S]*$",
  },

  {
    label: "Must be at least 5 characters long.",
    isValid: (value: string) => value.length > 2,
  },
  {
    label: "Must be no longer than 20 characters.",
    isValid: (value: string) => value !== "" && value.length <= 20,
  },
];
