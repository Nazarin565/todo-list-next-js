import * as Yup from "yup";

const regex = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
};

const email = Yup.string()
  .matches(regex.email, "Enter correct email")
  .required("Email field is required");

const password = Yup.string()
  .matches(
    regex.password,
    "Password must contain at least 1 uppercase, 1 lowercase and 1 digit"
  )
  .min(8, "Min length is 8 symbols")
  .required("Password field is required");

export const schemas = {
  custom: Yup.object().shape({
    email,
    password,
  }),
};
