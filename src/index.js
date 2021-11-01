import "./styles.css";

//必要な要素を取得
const button = document.getElementById("regBtn");
const todoList = document.getElementById("lists");
const defaultMsg = document.getElementById("defaultMsg");
const msgArea = document.getElementById("msgArea");
const textBox = document.getElementById("todo");

console.log("===========================================");

//todoの数が0のとき登録を促すメッセージを表示する
const toggleDefaultMsg = (todos) => {
  if (todos === 0) {
    defaultMsg.style.display = "";
    msgArea.style.display = "";
    console.log("zero");
  } else {
    defaultMsg.style.display = "none";
    msgArea.style.display = "none";
    console.log("no zero");
  }
};

//todoの削除関数(完了ボタンで発火)
const doneTasks = (doneBtn) => {
  const chosenTodo = doneBtn.nextElementSibling;
  console.log(chosenTodo.id);
  const chosenTask = doneBtn.closest(".itemWrap");
  console.log(chosenTask);
  todoList.removeChild(chosenTask);
  //todoTitleのidを取得して、それをキーとするLocalStorageの値を削除する
};

//todoの追加
const regTodo = (todo) => {
  const itemWrap = document.createElement("div"); //一番外の白枠
  const item = document.createElement("div"); //完了ボタンとTodoの枠(枠なし)
  const doneBtn = document.createElement("button"); //完了ボタン
  const todoTitle = document.createElement("div"); //Todoの内容

  itemWrap.className = "itemWrap";
  item.className = "item";
  todoTitle.className = "todoTitle";
  todoTitle.id = todo;
  doneBtn.className = "doneBtn fas fa-check";

  //完了ボタンのイベントリスナー
  doneBtn.addEventListener("click", (e) => {
    e.preventDefault();
    doneTasks(doneBtn);
    toggleDefaultMsg(todoList.childElementCount);
  });

  todoTitle.innerHTML = todo;
  item.appendChild(doneBtn);
  item.appendChild(todoTitle);
  itemWrap.appendChild(item);
  todoList.appendChild(itemWrap);
  textBox.value = ""; //テキストボックスを空にする
  toggleDefaultMsg(todoList.childElementCount);
};

//ローカルストレージのキーを取得
//デフォルトで入っているrunningと__test__は除外(codesandbox特有？）
//画面自動更新時に"CodeSandboxApp/sandbox/~~~"という値が入ってくる。必要であれば除外
const extKeys = Object.keys(localStorage).filter((item) => {
  return item !== "running" && item !== "__test__";
});

////main////

//ローカルストレージの内容をtodoListに表示
for (let i = 0; i < extKeys.length; i++) {
  console.log(extKeys[i]);
  regTodo(extKeys[i]);
}

// 追加ボタンを押した時のアクション
button.addEventListener("click", () => {
  const todo = document.getElementById("todo");
  localStorage.setItem(`${todo.value}`, "comment");

  console.log(localStorage.length);
  // console.log(localStorage.length);
  //テキストボックスに何も入っていない状態で追加ボタンが押されたらアラートを表示して追加しない
  if (todo.value === "") {
    alert("Todoが入力されていません!");
    return 0;
  }

  regTodo(todo.value);
});
