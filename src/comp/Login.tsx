import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import "../sass/Login.scss";

type LoginProps = {
  checkCookies: () => void;
};

function Login({ checkCookies }: LoginProps) {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [wrongLog, setWrongLog] = useState<boolean>(false);

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
      setWrongLog(false);
      history.push("/");
    } else {
      setWrongLog(true);
    }
  };

  return (
    <div className="login wrapper">
      <div className="login__container">
        <form className="login__container_form">
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
            {wrongLog ? <div className="login__container_response"><p>Wrong login or password. Please try again.</p></div> : null}
          <button className="login__container_button" type="submit" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
