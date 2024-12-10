"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { schemas } from "@/validation/authValidation";
import { LoginFormValues } from "@/types/AuthType";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { initialLoginValues } from "@/constants/formInitialValues";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = async (data: LoginFormValues) => {
    try {
      const response = await signInWithEmailAndPassword(
        data.email,
        data.password
      );
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
      initialValues={initialLoginValues}
      validationSchema={schemas.login}
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

        <button
          type="submit"
          className="bg-slate-400 hover:bg-slate-500 rounded-3xl h-9 w-80"
        >
          Log in
        </button>
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>{" "}
          now!
        </p>
      </Form>
    </Formik>
  );
}
