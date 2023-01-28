import styles from "../scss/Home.module.scss";
import { deleteList, updateList } from "../redux/slices/list";
import { useAppDispatch } from "../hook";

const List = (props: any) => {
  const dispatch = useAppDispatch();
  const changDone = () => {
    let done = props.done;
    const obj = {
      done: !done,
      _id: props._id,
      text: props.text,
    };
    dispatch(updateList(obj));
    //:(
  };
  const removeList = () => {
    dispatch(deleteList(props._id));
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
