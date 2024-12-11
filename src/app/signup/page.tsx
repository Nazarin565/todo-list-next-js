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
            displayName: data.name.trim(),
          });
      }
      if (response?.user.displayName) {
        localStorage.setItem("displayName", response.user.displayName);
      }
      if (response?.user.uid) {
        localStorage.setItem("userUID", response.user.uid);
      }
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
      <div className="p-12 flex justify-center items-center h-[100vh]">
        <Form className="bg-white rounded-lg shadow-lg p-14 max-w-[800px] w-full flex flex-col items-center gap-2">
          <div className="flex flex-col w-3/4">
            <Field
              name="name"
              type="text"
              placeholder="Enter your name"
              className="p-2 border border-gray-400"
            />
            <ErrorMessage name="name">
              {(error) => (
                <span className="text-xs text-red-600 ml-1">{error}</span>
              )}
            </ErrorMessage>
          </div>

          <div className="flex flex-col w-3/4">
            <Field
              name="email"
              type="email"
              placeholder="Enter your email"
              className="p-2 border border-gray-400"
            />
            <ErrorMessage name="email">
              {(error) => (
                <span className="text-xs text-red-600 ml-1">{error}</span>
              )}
            </ErrorMessage>
          </div>

          <div className="flex flex-col w-3/4">
            <Field
              name="password"
              type="password"
              placeholder="Enter your Password"
              className="p-2 border border-gray-400"
            />
            <ErrorMessage name="password">
              {(error) => (
                <span className="text-xs text-red-600 ml-1">{error}</span>
              )}
            </ErrorMessage>
          </div>

          <button
            type="submit"
            className="bg-slate-400 hover:bg-slate-500 rounded-3xl h-9 w-2/4"
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
      </div>
    </Formik>
  );
}
