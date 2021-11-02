import "./styles.css";

//必要な要素を取得
const button = document.getElementById("regBtn");
const todoList = document.getElementById("lists");
const defaultMsg = document.getElementById("defaultMsg");
const msgArea = document.getElementById("msgArea");
const textBox = document.getElementById("todo");

console.log("===========================================");

//todo重複チェック:localStorageのキーにtodo名を使用しているので画面とズレる可能性があるため制限

//todo数チェック:todoの数が0のとき登録を促すメッセージを表示する
const toggleDefaultMsg = (todos) => {
  if (todos === 0) {
    defaultMsg.style.display = "";
    msgArea.style.display = "";
  } else {
    defaultMsg.style.display = "none";
    msgArea.style.display = "none";
  }
};

//todoの追加関数:todoListとlocalStorageにtodoを追加
const regTodo = (todo) => {
  //必要なHTML要素を作成
  const itemWrap = document.createElement("div");
  const item = document.createElement("div");
  const doneBtn = document.createElement("button");
  const todoTitle = document.createElement("div");

  //css用のクラスを付与
  itemWrap.className = "itemWrap";
  item.className = "item";
  todoTitle.className = "todoTitle";
  doneBtn.className = "doneBtn fas fa-check";

  //完了ボタンのイベントリスナー:todoの削除とtodo数チェックを実行
  doneBtn.addEventListener("click", () => {
    localStorage.removeItem(todo);
    displayUpdate();
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

//ローカルストレージの内容をtodoListに表示
const displayUpdate = () => {
  // 既存の要素を削除
  const list = document.getElementById("lists");
  while (list.lastChild) {
    list.removeChild(list.lastChild);
  }

  //localStorageからtodoを取得
  let extKeys = Object.keys(localStorage).filter((item) => {
    return item !== "running" && item !== "__test__";
  });

  //表示
  for (let i = 0; i < extKeys.length; i++) {
    console.log(extKeys[i]);
    regTodo(extKeys[i]);
  }
};

////main////

displayUpdate();

// 追加ボタンを押した時のアクション
button.addEventListener("click", () => {
  //todoをlocalStorageに追加
  //localStorageの内容を画面に反映
  //todoをlocalStorageから削除
  //localStorageの内容を画面に反映
  const todo = document.getElementById("todo");
  //テキストボックスに何も入っていない状態で追加ボタンが押されたらアラートを表示して追加しない
  if (todo.value === "") {
    alert("Todoが入力されていません!");
    return 0;
  }
  localStorage.setItem(todo.value, "comment");
  // console.log(list);
  // while (list.lastChild) {
  //   list.removeChild(list.lastChild);
  // }

  displayUpdate();
  // console.log(localStorage.length);
  // console.log(localStorage.length);

  // console.log(extKeys.findIndex((key) => key === todo.value));
  // console.log(extKeys);
  // regTodo(todo.value);
});
