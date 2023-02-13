import s from "../scss/Login.module.scss";
import { useTheme } from "../hooks/use-theme";
import React from "react";
import { useAppDispatch } from "../hook";
import { login, selectIsAuth } from "../redux/slices/auth";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const IsAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const { setTheme } = useTheme();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailDirty, setEmailDirty] = React.useState(false);
  const [passwordDirty, setPasswordDirty] = React.useState(false);
  const [emailErr, setEmailErr] = React.useState("email cannot be empty");
  const [passwordErr, setPasswordErr] = React.useState(
    "password cannot be empty"
  );
  const [formValid, setFormValid] = React.useState(false);
  const [loginValid, setLoginValid] = React.useState("");

  React.useEffect(() => {
    if (emailErr || passwordErr) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailErr, passwordErr]);

  const handlerBlur = (e: any) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };

  const emailHandler = (e: any) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailErr("incorrect email");
    } else {
      setEmailErr("");
    }
  };

  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 10) {
      setPasswordErr("password must be longer than 3 and less than 10");
      if (!e.target.value) {
        setPasswordErr("password cannot be empty");
      }
    } else {
      setPasswordErr("");
    }
  };

  const createUser = async () => {
    const params = {
      email,
      password,
    };
    const data = await dispatch(login(params));
    if (!data.payload) {
      setLoginValid("Failed to Login");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
  const handleLightThemeClick = () => {
    setTheme("light");
  };
  const handleDarkThemeClick = () => {
    setTheme("dark");
  };
  if (IsAuth) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <div className={s.btnGroup}>
        <button onClick={handleLightThemeClick} className={s.btn1}>
          Light
        </button>
        <button onClick={handleDarkThemeClick} className={s.btn2}>
          Dark
        </button>
      </div>
      <div className={s.container}>
        <div className={s.screen}>
          <div>
            <h2>Login</h2>
          </div>
          <div className={s.loginBloc}>
            <input
              value={email}
              onBlur={(e) => handlerBlur(e)}
              name="email"
              onChange={(e) => emailHandler(e)}
              type="text"
              placeholder="Email"
            />
            {emailDirty && emailErr && (
              <span className={s.error}>{emailErr}</span>
            )}
            <input
              value={password}
              onBlur={(e) => handlerBlur(e)}
              name="password"
              onChange={(e) => passwordHandler(e)}
              type="password"
              placeholder="Password"
            />
            {passwordDirty && passwordErr && (
              <span className={s.error}>{passwordErr}</span>
            )}
            <button
              disabled={!formValid}
              onClick={createUser}
              className={s.loginBtn}
            >
              login
            </button>
            {loginValid !== "" ? (
              <span className={s.error}>{loginValid}</span>
            ) : (
              ""
            )}
            <Link className={s.link} to={"/register"}>
              <p>if you want to register click here</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
