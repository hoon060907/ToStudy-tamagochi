import { useState, useEffect, useRef } from "react";
import TodoTemplate from "./TodoTemplate";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";
import { ref, set, onValue } from "firebase/database";
import { auth, db } from "../firebase";
import './StudyListPage.scss';
import Tamagochi from "./Tamagochi";
import Swal from "sweetalert2";

const StudyListPage = () => {
  // const [,updateState] = useState();
  // const forceUpdate = useCallback(() => updateState({}), []);
  // const todos = useRef([]);
  const [todos, setTodos] = useState([]);
  const [level, setLevel] = useState();
  const date = useRef(new Date());
  useEffect(() => {
    // date.current = new Date();
    const Ref = ref(db, `users/${auth.currentUser.uid}`);
    onValue(Ref, (snapshot) => {
      const todosdata = snapshot.val().todos;
      setTodos(todosdata);
      const leveldata = snapshot.val().lv;
      setLevel(leveldata);
    });
    console.log(auth.currentUser);
  }, []);
  
  const nextId = useRef(null);

  const onInsert = text => {
    date.current = new Date();
    nextId.current = date.current.getTime();
    console.log(nextId.current);
    const todo = {
      id: nextId.current,
      text,
      checked: false
    };
    // todos.current = todos.current.concat(todo);
    // nextId.current = date.getTime();
    // nextId.current = date.getTime();
    set(ref(db, `users/${auth.currentUser.uid}/todos`), todos.concat(todo));
    setTodos(todos.concat(todo));
    // console.log(todos);
  };

  const onRemove = id => {
    // todos.current = todos.current.filter(todo => todo.id !== id);
    set(ref(db, `users/${auth.currentUser.uid}/todos`), todos.filter(todo => todo.id !== id));
    setTodos(todos.filter(todo => todo.id !== id));
    // forceUpdate();
  };

  const onToggle = id => {
    set(ref(db, `users/${auth.currentUser.uid}/todos`), todos.map(todo => todo.id === id ? { ...todo, checked: true } : todo));
    setTodos(
      todos.map(todo =>
          todo.id === id ? { ...todo, checked: true } : todo
      ),
    );
    
    if(level%10==0 && level<=60){
      Swal.fire({
        showConfirmButton: false,
        imageUrl: `images/${level/10+1}.png`,
        title: '다마고치 성장',
        text: `lv.${level+1}`,
        timer: 5000,
        background: 'linear-gradient(#E38F9F, #F5BFBD)'
      })
    }
  }
  const levelUp = () => {
    set(ref(db, `users/${auth.currentUser.uid}/lv`), level+1);
    setLevel(level+1);
  }

  return (
    <div className="container">
      <div className="tamagochi">
        <Tamagochi level={level} />
        <strong>Lv.{level}</strong>
      </div>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} levelUp={levelUp} />
      </TodoTemplate>
    </div>
  );
};

export default StudyListPage;