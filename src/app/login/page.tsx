"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { schemas } from "@/validation/authValidation";
import { LoginFormValues } from "@/types/AuthType";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { initialLoginValues } from "@/constants/formInitialValues";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (data: LoginFormValues) => {
    try {
      const response = await signInWithEmailAndPassword(
        data.email,
        data.password
      );

      if (!response) {
        setError("Invalid data. Please try again or sign up");
        return;
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
      initialValues={initialLoginValues}
      validationSchema={schemas.login}
      onSubmit={handleSubmit}
    >
      <div className="p-12 flex justify-center items-center h-[100vh]">
        <Form className="bg-white rounded-lg shadow-lg p-14 max-w-[800px] w-full flex flex-col items-center gap-2">
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

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="bg-slate-400 hover:bg-slate-500 rounded-3xl h-9 w-2/4"
          >
            Log in
          </button>
          <p className="">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>{" "}
            now!
          </p>
        </Form>
      </div>
    </Formik>
  );
}
