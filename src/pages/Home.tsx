import styles from "../scss/Home.module.scss";
import List from "../component/List";
import React from "react";
import { useSelector } from "react-redux";
import { setList, getList } from "../redux/slices/list";
import { useTheme } from "../hooks/use-theme";
import { useAppDispatch } from "../hook";
import { logout } from "../redux/slices/auth";
import { Link, Navigate } from "react-router-dom";

const Home = () => {
  const { text } = useSelector((state: any) => state.list);
  const [getText, setText] = React.useState("");
  const dispatch = useAppDispatch();
  const { setTheme } = useTheme();
  const addList = async () => {
    if (getText !== "") {
      const params = { text: getText.trim(), done: false };
      dispatch(setList(params));
      setText("");
    }
  };
  document.getElementById("text")?.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
      document.getElementById("add")?.click();
    }
  });

  const handleLightThemeClick = () => {
    setTheme("light");
  };
  const handleDarkThemeClick = () => {
    setTheme("dark");
  };
  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
  };
  React.useEffect(() => {
    dispatch(getList());
  }, []);

  if (!window.localStorage.getItem("token")) {
    return <Navigate to={"/register"} />;
  }

  return (
    <>
      <div>
        <div className={styles.btnGroup}>
          <Link to={"/register"}>
            <button onClick={handleLogout} className={styles.logout}>
              logout
            </button>
          </Link>
          <button onClick={handleLightThemeClick} className={styles.btn1}>
            Light
          </button>
          <button onClick={handleDarkThemeClick} className={styles.btn2}>
            Dark
          </button>
        </div>
        <div className={styles.header}>
          <p>TODOLIST</p>
          <input
            id="text"
            type="text"
            placeholder="add task"
            value={getText}
            onChange={(e) => setText(e.target.value)}
          />
          <span id="add" onClick={addList}>
            add
          </span>
        </div>
      </div>
      <div>
        {text.length !== 0 ? (
          <ul className={styles.list}>
            {text?.map((obj: any) => (
              <List {...obj} key={obj.id} />
            ))}
          </ul>
        ) : (
          <div className={styles.warning}>you have no tasks</div>
        )}
      </div>
    </>
  );
};

export default Home;
