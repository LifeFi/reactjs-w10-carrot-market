import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Forms() {
  const { register, handleSubmit } = useForm();
  const onValid = () => {
    console.log("I'm valid");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("username", { required: true })}
        type="text"
        placeholder="Username"
        required
      ></input>
      <input
        {...register("email", { required: true })}
        type="email"
        placeholder="Email"
        required
      ></input>
      <input
        {...register("password", { required: true })}
        type="password"
        placeholder="Password"
        required
      ></input>
      <input type="submit" value="Create Account" />
    </form>
  );
}
