import * as Yup from "yup";

const regex = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
};

const name = Yup.string()
  .min(2, "Min length is 2")
  .max(20, "Max length is 20")
  .required("Name is required");

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
  login: Yup.object().shape({
    email,
    password,
  }),
  signup: Yup.object().shape({
    name,
    email,
    password,
  }),
};
