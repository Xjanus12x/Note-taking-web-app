import { UseFormRegister } from "react-hook-form";
import { SignUpFormFields } from "../schemas/SignUpFormSchema";
import { InputHTMLAttributes, forwardRef } from "react";
import { SignInFormFields } from "../schemas/SignInFormSchema";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  isSrOnlyLabel?: boolean;
  errorMessage?: string;
  register?: UseFormRegister<SignUpFormFields | SignInFormFields>;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, isSrOnlyLabel, errorMessage, register, ...rest }, ref) => (
    <div className="grid gap-0.5">
      <label className={`${isSrOnlyLabel ? "sr-only" : ""}`} htmlFor={rest.id}>
        {label}
      </label>
      <input
        ref={ref}
        className={`px-4 py-3 bg-transparent border rounded-md border-coolGray ${rest.className}`}
        {...register} // Only include if `register` is provided
        {...rest}
      />
      {errorMessage && <span className="text-red-500">{errorMessage}</span>}
    </div>
  )
);

export default Input;
