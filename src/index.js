import "./styles.css";

//HTMLから必要な要素を取得
const button = document.getElementById("regBtn");
const todoList = document.getElementById("lists");
const defaultMsg = document.getElementById("defaultMsg");
const msgArea = document.getElementById("msgArea");
const textBox = document.getElementById("todo");
const textArea = document.getElementById("comment");

//todoの数をチェック:todoの数が0のとき登録を促すメッセージを表示する
const toggleDefaultMsg = (todos) => {
  if (todos === 0) {
    defaultMsg.style.display = "";
    msgArea.style.display = "";
  } else {
    defaultMsg.style.display = "none";
    msgArea.style.display = "none";
  }
};

//todoを画面に表示する処理:todoとcommentを引数に取り、画面に表示させる
const displayTodo = (todo, comment) => {
  //必要なHTML要素を作成
  const itemWrap = document.createElement("div");
  const item = document.createElement("div");
  const doneBtn = document.createElement("button");
  const todoTitle = document.createElement("div");
  const commentWrap = document.createElement("div");

  //css用のクラスを付与
  itemWrap.className = "itemWrap";
  item.className = "item";
  todoTitle.className = "todoTitle";
  commentWrap.className = "comment";
  doneBtn.className = "doneBtn fas fa-check";

  //完了ボタンのイベントリスナー:todoの削除とtodo数チェックを実行
  doneBtn.addEventListener("click", () => {
    localStorage.removeItem(todo);
    displayUpdate(getLocalStorageKeys());
    toggleDefaultMsg(todoList.childElementCount);
  });

  //以下画面に表示する処理
  todoTitle.innerHTML = todo;
  commentWrap.innerHTML = comment;
  item.appendChild(doneBtn);
  item.appendChild(todoTitle);
  item.appendChild(commentWrap);
  itemWrap.appendChild(item);
  todoList.appendChild(itemWrap);
  textBox.value = ""; //テキストボックスを空にする
  textArea.value = "";
  toggleDefaultMsg(todoList.childElementCount);
};

//todo表示の更新処理:locasStorageのキーを配列で受け取りtodo表示
const displayUpdate = (keys) => {
  // 現在の画面上のtodoを削除
  const list = document.getElementById("lists");
  while (list.lastChild) {
    list.removeChild(list.lastChild);
  }

  //表示用の関数呼び出し
  for (let i = 0; i < keys.length; i++) {
    displayTodo(keys[i], localStorage.getItem(keys[i]));
  }
};

//入力値チェック:エラーがあればエラーメッセージを返す、なければnull
const inputCheck = (todo, keys) => {
  let msg = null;
  if (todo.value === "") {
    msg = "Todoが入力されていません!";
  } else if (keys.includes(todo.value)) {
    msg = "Todoが重複しています!";
  }
  return msg;
};

//localStorageのキーを取得:不要なキーを削除した配列を返す
const getLocalStorageKeys = () => {
  let keys = Object.keys(localStorage).filter((item) => {
    return (
      item !== "running" &&
      item !== "__test__" &&
      item.indexOf("CodeSandboxApp/sandboxes/") === -1
    );
  });
  return keys;
};

////main////

//リロード前のlocalStorageを取得すして表示する(発展の課題)
displayUpdate(getLocalStorageKeys());

// 追加ボタンを押した時のアクション
button.addEventListener("click", () => {
  const msg = inputCheck(textBox, getLocalStorageKeys());

  //エラーメッセージがnullならtodoをlocalStorageに追加する
  if (msg === null) {
    localStorage.setItem(textBox.value, textArea.value);
    displayUpdate(getLocalStorageKeys());
  } else {
    alert(msg);
  }
});
