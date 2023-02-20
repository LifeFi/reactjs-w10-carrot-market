import { useState } from "react";
import { useForm } from "react-hook-form";
import { FieldErrors } from "react-hook-form/dist/types";

interface LoginForm {
  username: string;
  password: string;
  email: string;
  errors?: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    reset,
    resetField,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onBlur",
  });
  const onValid = (data: LoginForm) => {
    console.log("I'm valid");
    setError("errors", { message: "Backend is offline" });
    // reset();
    resetField("password");
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  console.log(watch("email"));
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)} className="flex flex-col">
      <input
        {...register("username", {
          required: "Username is required",
          minLength: {
            message: "the Uesrname shold be longer than 5 chars",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      ></input>
      {errors.username?.message}
      <input
        {...register("email", {
          required: "Email is required",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "Gmail is not allowed",
          },
        })}
        type="email"
        placeholder="Email"
        className={`${Boolean(errors.email) ? "border-red-500" : ""}`}
      ></input>
      {errors.email?.message}
      <input
        {...register("password", { required: true })}
        type="password"
        placeholder="Password"
      ></input>
      {errors.password?.message}
      <input type="submit" value="Create Account" />
    </form>
  );
}
