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
    displayUpdate(getLocalStorageKeys());
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

//ローカルストレージの内容をtodoListに反映
const displayUpdate = (keys) => {
  // 画面上のtodoを削除
  const list = document.getElementById("lists");
  while (list.lastChild) {
    list.removeChild(list.lastChild);
  }

  //表示
  for (let i = 0; i < keys.length; i++) {
    console.log(keys[i]);
    regTodo(keys[i]);
  }
};

//入力値チェック
const inputCheck = (todo, keys) => {
  let msg = null;

  if (todo.value === "") {
    msg = "Todoが入力されていません!";
  } else if (keys.includes(todo.value)) {
    msg = "Todoが重複しています!";
  }
  return msg;
};

//localStorageからtodoを取得:todoとは関係ないものは除外
const getLocalStorageKeys = () => {
  let keys = Object.keys(localStorage).filter((item) => {
    return (
      item !== "running" &&
      item !== "__test__" &&
      item !== "CodeSandboxApp/sandboxes/veg7e"
    );
  });
  console.log(keys);
  return keys;
};

////main////

//初回のlocalStorageを読み込み
displayUpdate(getLocalStorageKeys());

// 追加ボタンを押した時のアクション
button.addEventListener("click", () => {
  const todo = document.getElementById("todo");
  const msg = inputCheck(todo, getLocalStorageKeys());

  //エラーメッセージがnullならtodoをlocalStorageに追加する
  if (msg === null) {
    localStorage.setItem(todo.value, "comment");
    displayUpdate(getLocalStorageKeys());
  } else {
    alert(msg);
  }
});
