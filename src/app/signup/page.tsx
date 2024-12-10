"use client";

import { initialSignupValues } from "@/constants/formInitialValues";
import { schemas } from "@/validation/authValidation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { SignupFormValues } from "@/types/AuthType";
import { getAuth, updateProfile } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = async (data: SignupFormValues) => {
    try {
      const response = await createUserWithEmailAndPassword(
        data.email,
        data.password
      );
      if (response) {
        const authInstance = getAuth();
        if (authInstance.currentUser)
          await updateProfile(authInstance.currentUser, {
            displayName: data.name,
          });
      }
      if (response?.user.displayName) {
        document.cookie = `displayName=${response.user.displayName}; path=/;`;
      }
      console.log(response);
      if (response) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialSignupValues}
      validationSchema={schemas.signup}
      onSubmit={handleSubmit}
    >
      <Form className="w-[100vw] h-[100vh] flex flex-col gap-2 justify-center items-center">
        <div className="flex flex-col">
          <Field
            name="name"
            type="text"
            placeholder="Enter your name"
            className="p-2 w-96"
          />
          <ErrorMessage name="name">
            {(error) => (
              <span className="text-xs text-red-600 ml-1">{error}</span>
            )}
          </ErrorMessage>
        </div>

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

        <button
          type="submit"
          className="bg-slate-400 hover:bg-slate-500 rounded-3xl h-9 w-80"
        >
          Sign up
        </button>

        <p>
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>{" "}
          here!
        </p>
      </Form>
    </Formik>
  );
}
