import s from "../scss/Register.module.scss";
import { useTheme } from "../hooks/use-theme";
import React from "react";
import { useAppDispatch } from "../hook";
import { register, selectIsAuth } from "../redux/slices/auth";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const Register = () => {
  const IsAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const { setTheme } = useTheme();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [nameDirty, setNameDirty] = React.useState(false);
  const [emailDirty, setEmailDirty] = React.useState(false);
  const [passwordDirty, setPasswordDirty] = React.useState(false);
  const [nameErr, setNameErr] = React.useState("name cannot be empty");
  const [emailErr, setEmailErr] = React.useState("email cannot be empty");
  const [passwordErr, setPasswordErr] = React.useState(
    "password cannot be empty"
  );
  const [formValid, setFormValid] = React.useState(false);
  const [registerValid, setRegisterValid] = React.useState("");

  React.useEffect(() => {
    if (nameErr || emailErr || passwordErr) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameErr, emailErr, passwordErr]);

  const handlerBlur = (e: any) => {
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;
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
    if (e.target.value.length < 3) {
      setPasswordErr("password must be longer than 3");
      if (!e.target.value) {
        setPasswordErr("password cannot be empty");
      }
    } else {
      setPasswordErr("");
    }
  };
  const nameHandler = (e: any) => {
    setName(e.target.value);
    if (e.target.value.length < 3) {
      setNameErr("name must be longer than 3");
      if (!e.target.value) {
        setNameErr("name cannot be empty");
      }
    } else {
      setNameErr("");
    }
  };

  const createUser = async () => {
    const params = {
      name,
      email,
      password,
    };
    const data = await dispatch(register(params));
    if (!data.payload) {
      setRegisterValid("Failed to register");
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
            <h2>Sign Up</h2>
          </div>
          <div className={s.loginBloc}>
            <input
              value={name}
              onBlur={(e) => handlerBlur(e)}
              name="name"
              onChange={(e) => nameHandler(e)}
              type="text"
              placeholder="Name"
            />
            {nameDirty && nameErr && <span className={s.error}>{nameErr}</span>}
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
              sign up
            </button>
            {registerValid !== "" ? (
              <span className={s.error}>{registerValid}</span>
            ) : (
              ""
            )}
            <Link className={s.link} to={"/login"}>
              <p>if you want to login click here</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
