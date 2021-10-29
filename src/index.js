import "./styles.css";

const button = document.getElementById("regBtn");
const todoList = document.getElementById("lists");

// 追加ボタンを押した時のアクション
button.addEventListener("click", () => {
  //追加するtodoをテキストボックスから取得
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
  todoTitle.className = "todoTitle"; //追加する要素にitemというclassをつける
  doneBtn.className = "doneBtn fas fa-check";

  doneBtn.addEventListener("click", (e) => {
    e.preventDefault();
    delTasks(doneBtn);
  });

  //削除機能を実装
  const delTasks = (doneBtn) => {
    const chosenTask = doneBtn.closest(".itemWrap");
    console.log(chosenTask);
    todoList.removeChild(chosenTask);
  };

  //htmlに追加
  todoTitle.innerHTML = todo.value; //追加する要素の中にテキストボックスから取得した値を入れる

  item.appendChild(doneBtn); //削除ボタンを追加
  item.appendChild(todoTitle); //要素を追加

  itemWrap.appendChild(item);
  todoList.appendChild(itemWrap);

  todo.value = ""; //テキストボックスを空にする
});
