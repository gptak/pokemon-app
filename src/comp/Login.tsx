import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

type LoginProps = {
  checkCookies: () => void;
};

function Login({ checkCookies }: LoginProps) {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const properLogin = "user";
  const properPassword = "user1";
  const history = useHistory();

  const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLogin(e.target.value);
  };

  const handlePasswordInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value);
  };

  const handleLogin = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();

    if (login === properLogin && password === properPassword) {
      Cookies.set("logged", "true");
      checkCookies();
      history.push("/");
    } else {
      alert("Nieprawidłowe hasło!");
    }
  };

  return (
    <div className="login wrapper">
      <form>
        <input
          type="text"
          value={login}
          id="loginInput"
          placeholder="login"
          onChange={handleLoginInput}
        />
        <input
          type="password"
          value={password}
          id="passwordInput"
          placeholder="password"
          onChange={handlePasswordInput}
        />
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
