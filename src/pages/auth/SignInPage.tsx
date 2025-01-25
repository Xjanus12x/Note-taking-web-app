import { SubmitHandler, useForm } from "react-hook-form";
import logoWhite from "../../assets/logo_white.svg";
import google from "../../assets/icons/icons8-google.svg";
import Input from "../../ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignInFormFields,
  SignInFormSchema,
} from "../../schemas/SignInFormSchema";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import { FirebaseAuth, provider } from "../../firebase";

export default function SignInPage() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormFields>({ resolver: zodResolver(SignInFormSchema) });

  const handleLoginWithEmailAndPassword: SubmitHandler<
    SignInFormFields
  > = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(FirebaseAuth, email, password);
    } catch (e) {
      const error = e as FirebaseError;
      if (error.code === "auth/invalid-credential")
        setError("root", { message: "Invalid email or password" });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(FirebaseAuth, provider);
    } catch (e) {
      setError("root", { message: "Google login failed" });
    }
  };

  return (
    <div className="self-center w-full max-w-xl p-12 mx-4 text-white bg-black border rounded-lg border-coolGray justify-self-center">
      <div className="grid text-center justify-items-center">
        <img src={logoWhite} alt="Application logo" aria-hidden={true} />
        <h1 className="mt-5 text-2xl font-bold">Welcome to Note!</h1>
        <p className="mt-1">Please log to continue</p>
      </div>
      <form
        noValidate
        className="mt-10 space-y-4 "
        onSubmit={handleSubmit(handleLoginWithEmailAndPassword)}
      >
        <Input
          label="Email Address"
          id="email"
          type="email"
          autoComplete="username"
          placeholder="email@yahoo.com"
          {...register("email")}
          errorMessage={errors.email?.message}
          aria-invalid={errors.email ? "true" : "false"}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="Atleast 8 characters in total"
          autoComplete="current-password"
          {...register("password")}
          errorMessage={errors.password?.message}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.root && (
          <span className="text-red-500">{errors.root.message}</span>
        )}
        <div className="grid gap-4">
          <button
            className="py-3 rounded-md bg-background-4 hover:bg-background-5 focus-visible:bg-background-5 disabled:bg-background-5"
            aria-disabled={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>

          <div className="relative text-center before:absolute before:h-0.5 before:top-2/4 before:w-full before:right-0 before:bg-white before:z-10">
            <span className="relative z-20 px-5 bg-deepSpace">Or</span>
          </div>

          <button
            className="flex justify-center gap-2 py-3 text-black bg-white rounded-md hover:bg-white/50 hover:text-white focus-visible:text-white focus-visible:bg-white/50"
            type="button"
            onClick={handleGoogleLogin}
          >
            <img className="size-6" src={google} alt="Google icon" />
            Continue with Google
          </button>

          <Link
            className="block text-center hover:underline focus-visible:underline"
            to="/auth/sign-up"
          >
            Don't have an account? Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
