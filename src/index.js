import "./styles.css";

//必要な要素を取得
const button = document.getElementById("regBtn");
const todoList = document.getElementById("lists");
const defaultMsg = document.getElementById("defaultMsg");
const msgArea = document.getElementById("msgArea");

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

// 追加ボタンを押した時のアクション
button.addEventListener("click", () => {
  const todo = document.getElementById("todo");

  //テキストボックスに何も入っていない状態で追加ボタンが押されたらアラートを表示して追加しない
  if (todo.value === "") {
    alert("Todoが入力されていません!");
    return 0;
  }

  //追加するtodo用の要素を作成
  const itemWrap = document.createElement("div"); //一番外の白枠
  const item = document.createElement("div"); //完了ボタンとTodoの枠(枠なし)
  const doneBtn = document.createElement("button"); //完了ボタン
  const todoTitle = document.createElement("div"); //Todoの内容

  //css用にクラスを設定
  itemWrap.className = "itemWrap";
  item.className = "item";
  todoTitle.className = "todoTitle";
  doneBtn.className = "doneBtn fas fa-check";

  //完了ボタンのイベントリスナー
  doneBtn.addEventListener("click", (e) => {
    e.preventDefault();
    delTasks(doneBtn);
    toggleDefaultMsg(todoList.childElementCount);
  });

  //todoの削除関数(完了ボタンで発火)
  const delTasks = (doneBtn) => {
    const chosenTask = doneBtn.closest(".itemWrap");
    console.log(chosenTask);
    todoList.removeChild(chosenTask);
  };

  //htmlに追加
  todoTitle.innerHTML = todo.value;
  item.appendChild(doneBtn);
  item.appendChild(todoTitle);
  itemWrap.appendChild(item);
  todoList.appendChild(itemWrap);
  todo.value = ""; //テキストボックスを空にする
  toggleDefaultMsg(todoList.childElementCount);
});
