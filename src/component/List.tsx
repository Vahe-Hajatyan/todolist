import styles from "../scss/Home.module.scss";
import { useDispatch } from "react-redux";
import { changingDone, removeListItem } from "../redux/slices/list";

const List = (props: any) => {
  const dispatch = useDispatch();
  const changDone = () => {
    let done = props.done;
    const obj = {
      text: props.text,
      done: !done,
      id: props.id,
    };
    //:(
    dispatch(changingDone(obj));
  };
  const removeList = () => {
    dispatch(removeListItem(props.id));
  };
  return (
    <li
      onClick={changDone}
      className={props?.done === true ? styles.checked : ""}
    >
      {props?.text}
      <span onClick={removeList} className={styles.close}>
        ×
      </span>
    </li>
  );
};

export default List;
