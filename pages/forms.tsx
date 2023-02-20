import { useState } from "react";
import { useForm } from "react-hook-form";
import { FieldErrors } from "react-hook-form/dist/types";

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

export default function Forms() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const onValid = (data: LoginForm) => {
    console.log("I'm valid");
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
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
      <input
        {...register("email", { required: "Email is required" })}
        type="email"
        placeholder="Email"
      ></input>
      <input
        {...register("password", { required: true })}
        type="password"
        placeholder="Password"
      ></input>
      <input type="submit" value="Create Account" />
    </form>
  );
}
