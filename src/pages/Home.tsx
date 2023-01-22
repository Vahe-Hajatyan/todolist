import styles from "../scss/Home.module.scss";
import List from "../component/List";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import { addList } from "../redux/slices/list";
import { useTheme } from "../hooks/use-theme";

const Home = () => {
  const { text } = useSelector((state: any) => state.list);
  const [getText, setText] = React.useState("");
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();

  const addText = () => {
    if (getText !== "") {
      const objList = { text: getText.trim(), done: false, id: uuid() };
      dispatch(addList(objList));
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
  console.log(text.length);
  return (
    <>
      <div>
        <div className={styles.btnGroup}>
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
          <span id="add" onClick={addText}>
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
