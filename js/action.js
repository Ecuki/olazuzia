let counter = 0;
function remove(elements) {
  if (!elements) {
    return;
  } else if (elements.length) {
    for (let element of elements) {
      element.parentNode.removeChild(element);
    }
  } else {
    elements.parentNode.removeChild(elements);
  }
}

function getRandomTransform() {
  const height =
    Math.random() * ((window.innerHeight * 3) / 8 + 40) +
    ((window.innerHeight * 1) / 8 + 40);
  const randomPosition = parseInt(Math.random() * height);
  let value = counter % 2 ? randomPosition : -randomPosition;

  const translate = `translateY(${value}px) rotate(${
    counter % 2 ? "-" : "+"
  }45deg)`;
  return translate;
}
function handleLetterClick(e) {
  const letter = e.target;
  const text = letter.textContent;
  if (letter.classList.contains("letter--active")) return;
  letter.textContent = text;
  letter.classList.toggle("letter--active");

  letter.style.backgroundColor = letter.style.color;

  setTimeout(() => {
    // letter.textContent = "?";
    letter.classList.toggle("letter--active");
    letter.style.backgroundColor = "transparent";
  }, 2500);
}

function createSign(sign) {
  let letter = elementWithClass("span", ["letter letter--clear"]);

  counter = counter >= colors.length ? 0 : counter;
  letter.style.color = `#${colors[counter]}`;
  letter.style.display = "block";
  counter++;
  letter.textContent = sign;
  if (sign == " ") letter.innerHTML = "&nbsp;";
  letter.style.transform = getRandomTransform();
  setTimeout(() => {
    letter.addEventListener("click", e => handleLetterClick(e));
  }, 12000);

  return letter;
}

function createMessage(name) {
  const text = `cześć ${name}!`;
  const message = elementWithClass("div", ["welcoming-message"]);

  for (let sign of text) {
    const letter = createSign(sign);
    message.appendChild(letter);
  }
  return message;
}

function createArrow() {
  const arrow = elementWithClass("div", ["arrow"]);
  const arrowTop = elementWithClass("div", ["arrow-top"]);
  const arrowBottom = elementWithClass("div", ["arrow-bottom"]);

  arrow.appendChild(arrowTop);
  arrow.appendChild(arrowBottom);
  return arrow;
}
function createImage(name) {
  const image = elementWithClass("div", ["img"]);
  image.style.backgroundImage = `url('${name}.jpg')`;

  const arrowLeft = createArrow();
  const arrowRight = createArrow();
  arrowRight.classList.add("arrow-right");
  arrowLeft.classList.add("arrow-left");

  image.appendChild(arrowLeft);
  image.appendChild(arrowRight);
  return image;
}

function handleExitClick(e) {
  e.preventDefault();
  const contener = document.getElementById("message");
  remove(contener);
  createDoc();
}

function welcoming(name) {
  const contener = document.createElement("div");
  contener.setAttribute("id", "message");
  const image = createImage(name);
  const message = createMessage(name);
  const exit = createButton("exit");
  const write = createButton("write");

  exit.addEventListener("click", e => {
    handleExitClick(e);
  });
  write.addEventListener("click", e => {
    handleWriteClick(e, name);
  });

  contener.appendChild(message);
  contener.appendChild(image);
  contener.appendChild(exit);
  contener.appendChild(write);
  wrapper.appendChild(contener);

  setTimeout(() => {
    const letters = document.getElementsByClassName("letter");
    [...letters].forEach(letter => {
      letter.classList.remove("letter--clear");
      letter.style.transform = "none";
      letter.style.transform = "translateY(-200%)";
    });
  }, 12000);
}
function handleSideChoose(e) {
  const sides = document.querySelectorAll(".side");
  remove(sides);

  e.preventDefault;
  const name = e.target.name;
  welcoming(name);
}
function action() {
  window.removeEventListener("resize", createDoc);
  const buttons = document.querySelectorAll("button");
  for (let button of buttons) {
    button.addEventListener("click", e => {
      handleSideChoose(e);
    });
  }
  return;
}
