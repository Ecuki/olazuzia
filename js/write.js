let messages = [];
const createTypewriter = name => {
  const typewriter = elementWithClass("div", ["typewriter"]);
  const input = elementWithClass("input", ["typewriter__input"]);
  input.placeholder = "Napisz coś...";
  const enter = createButton("enter");
  const textarea = elementWithClass("div", ["typewriter__textarea"]);
  const exit = createButton("exit");
  exit.addEventListener("click", e => {
    handleExitClick(e);
  });
  typewriter.appendChild(textarea);

  typewriter.appendChild(input);
  typewriter.appendChild(enter);
  wrapper.appendChild(typewriter);
  wrapper.appendChild(exit);
};

const addMessage = (text, name) => {
  const date = new Date().toISOString();
  const ymd = date.slice(0, 10);
  const time = date.slice(11, 19);
  const message = {
    id: new Date().valueOf(),
    author: name,
    text,
    date: time + ` ` + ymd
  };

  messages.push(message);
};

const handleDeleteMessage = (e, id) => {
  messages = messages.filter(message => message.id !== id);

  remove(document.getElementById(id));
  refreshTextarea();
};
const createMessageView = message => {
  const messageView = elementWithClass("div", [
    `message message-${message.author}`
  ]);
  messageView.setAttribute("id", message.id);

  for (let element in message) {
    if (!(element === "id")) {
      const details = elementWithClass("span", [`message-${element}`]);
      details.textContent = `${message[element]}`;
      messageView.appendChild(details);
    }
  }

  const deleteMessage = createButton("delete");
  messageView.appendChild(deleteMessage);
  deleteMessage.addEventListener("click", e => {
    handleDeleteMessage(e, message.id);
  });

  return messageView;
};

const refreshTextarea = () => {
  const textarea = document.querySelector(".typewriter__textarea");
  textarea.innerHTML = "";

  for (let message of messages) {
    const messageView = createMessageView(message);

    textarea.appendChild(messageView);
  }

  textarea.scrollTop = textarea.scrollHeight;
};

const handleTextSend = (e, name) => {
  e.preventDefault();

  const input = document.querySelector(".typewriter__input");
  const text = input.value;
  input.value = "";
  if (text) {
    addMessage(text, name);
    refreshTextarea();
  }
};

// movies.sort(function(a, b) {
//   var dateA = new Date(a.release), dateB = new Date(b.release);
//   return dateA - dateB;
// });

const enableWriting = name => {
  const enter = document.querySelector(".button__enter");

  enter.addEventListener("click", e => {
    handleTextSend(e, name);
  });
};

const handleWriteClick = (e, name) => {
  e.preventDefault();
  const everthing = document.querySelector(".wrapper > *");
  remove(everthing);
  createTypewriter();
  enableWriting(name);
};
