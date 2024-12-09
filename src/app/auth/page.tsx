"use client";

import { FormValues } from "@/types/AuthType";
import { schemas } from "@/validation/authValidation";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";

const initialValues = {
  email: "",
  password: "",
};

export default function Auth() {
  const handleSubmit = (
    data: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    console.log(data);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schemas.custom}
      onSubmit={handleSubmit}
    >
      <Form className="w-[100vw] h-[100vh] flex flex-col gap-2 justify-center items-center">
        <div className="flex flex-col">
          <Field
            name="email"
            type="email"
            placeholder="Enter your email"
            className="p-2 w-96"
          />
          <ErrorMessage name="email">
            {(error) => (
              <span className="text-xs text-red-600 ml-1">{error}</span>
            )}
          </ErrorMessage>
        </div>

        <div className="flex flex-col">
          <Field
            name="password"
            type="password"
            placeholder="Enter your Password"
            className="p-2 w-96"
          />
          <ErrorMessage name="password">
            {(error) => (
              <span className="text-xs text-red-600 ml-1">{error}</span>
            )}
          </ErrorMessage>
        </div>

        <div className="w-96 flex justify-between gap-4">
          <button className="flex-1 bg-slate-400 hover:bg-slate-500 rounded-3xl h-9">
            Log in
          </button>
          <button className="flex-1 bg-slate-400 hover:bg-slate-500 rounded-3xl h-9">
            Sign in
          </button>
        </div>
      </Form>
    </Formik>
  );
}
