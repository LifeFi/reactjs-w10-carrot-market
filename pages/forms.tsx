import { useState } from "react";

export default function Forms() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [emailErrors, setEmailErrors] = useState("");

  const onUsernameChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };
  const onEmailChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === "" || email === "" || password === "") {
      setFormErrors("all Fields are required");
    }

    console.log(username, email, password);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={username}
        onChange={onUsernameChange}
        type="text"
        placeholder="Username"
      ></input>
      <input
        value={email}
        onChange={onEmailChange}
        type="email"
        placeholder="Email"
      ></input>
      {emailErrors}
      <input
        value={password}
        onChange={onPasswordChange}
        type="password"
        placeholder="Password"
      ></input>
      <input type="submit" value="Create Account" />
      {formErrors}
    </form>
  );
}
