import logoWhite from "../../assets/logo_white.svg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "../../firebase";
import { FirebaseError } from "firebase/app";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import {
  SignUpFormFields,
  SignUpFormSchema,
} from "../../schemas/SignUpFormSchema";
import Input from "../../ui/Input";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormFields>({ resolver: zodResolver(SignUpFormSchema) });

  const onSubmit: SubmitHandler<SignUpFormFields> = async ({
    email,
    password,
  }) => {
    try {
      await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    } catch (e) {
      const error = e as FirebaseError;
      console.log(error.code);
      if (error.code === "auth/email-already-in-use")
        setError("email", { type: "manual", message: "Email already in use" });
      else {
        setError("root", {
          type: "manual",
          message: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  return (
    <div className="self-center w-full max-w-xl p-12 mx-4 text-white border rounded-lg bg-deepSpace border-coolGray justify-self-center">
      <div className="grid text-center justify-items-center">
        <img src={logoWhite} alt="Application logo" aria-hidden={true} />
        <h1 className="mt-5 text-2xl font-bold">Welcome to Note!</h1>
        <p className="mt-1">Please sign up to continue</p>
      </div>
      <form
        noValidate
        className="mt-10 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Email Address"
          id="email"
          type="email"
          autoComplete="email"
          placeholder="email@yahoo.com"
          {...register("email")}
          errorMessage={errors.email?.message}
          aria-invalid={errors.email ? "true" : "false"}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="Atleast 8 characters in total"
          {...register("password")}
          errorMessage={errors.password?.message}
          aria-invalid={errors.password ? "true" : "false"}
        />

        <Input
          label="Repeat password"
          id="repeat-password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters, must match password"
          {...register("repeatPassword")}
          errorMessage={errors.repeatPassword?.message}
          aria-invalid={errors.repeatPassword ? "true" : "false"}
        />
        {errors.root && (
          <span className="block text-red-500">{errors.root.message}</span>
        )}
        <div className="space-y-2">
          <button
            className="w-full py-3 rounded-md bg-background-4 hover:bg-background-5 focus-visible:bg-background-5 disabled:bg-background-5"
            aria-disabled={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
          <Link
            className="block text-center hover:underline focus-visible:underline"
            to="/auth/sign-in"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
