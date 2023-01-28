import styles from "../scss/Home.module.scss";
import List from "../component/List";
import React from "react";
import { useSelector } from "react-redux";
import { getList, setList } from "../redux/slices/list";
import { useTheme } from "../hooks/use-theme";
import { useAppDispatch } from "../hook";

const Home = () => {
  const { text } = useSelector((state: any) => state.list);
  const [getText, setText] = React.useState("");
  const dispatch = useAppDispatch();
  const { theme, setTheme } = useTheme();
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
  // React.useEffect(() => {
  //   dispatch(getList());
  // }, []);
  console.log(text);
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
