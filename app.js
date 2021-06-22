let img = document.querySelector(".meme");

//#region File upload & download

let uploadBtn = document.querySelector(".fileInput");

function uploadImage() {
  let [imgSrc] = uploadBtn.files;
  if (imgSrc) {
    img.src = URL.createObjectURL(imgSrc);
  }
}

function downloadImage() {
  domtoimage.toBlob(document.querySelector(".image")).then(function (blob) {
    window.saveAs(blob, "meme.png");
  });
}

//#endregion

//#region Image editing

function editImage() {
  let imgPar = document.querySelector(".image");
  let xSlide = document.querySelector(".posX").value + "%";
  let ySlide = document.querySelector(".posY").value + "%";
  let rot = document.querySelector(".rotSlid").value + "deg";
  let scl = document.querySelector(".sclSlid").value + "%";
  let col = document.querySelector(".col").value;

  img.style.left = xSlide;
  img.style.top = ySlide;
  img.style.transform = `rotate(${rot})`;
  img.style.width = scl;
  imgPar.style.backgroundColor = col;

  console.log(col);

  document.querySelector(".posXval").innerText = xSlide;
  document.querySelector(".posYval").innerText = ySlide;
  document.querySelector(".rotVal").innerText = rot;
  document.querySelector(".sclVal").innerText = scl;
}

function reset() {
  document.querySelector(".posX").value = 0;
  document.querySelector(".posY").value = 0;
  document.querySelector(".rotSlid").value = 0;
  document.querySelector(".sclSlid").value = 100;
  editImage();
}

//#endregion

//#region Text
let currentText = 0;
let controls = document.querySelector(".controls");

function addTextSection() {
  let btn = document.querySelector(".btnCtrl");
  let textInput = document.createElement("input");

  // Parent
  let parent = document.createElement("div");
  parent.className = "textCtrl ctrlSec";
  parent.classList.add(currentText);

  // Title
  let secTitle = document.createElement("p");
  secTitle.className = "secTitle";
  secTitle.innerText = "Text";

  parent.appendChild(secTitle);

  // Input
  let secText = document.createElement("div");
  secText.className = "sec text";
  textInput.type = "text";
  textInput.placeholder = "Enter some meme text...";
  textInput.className = "memeInput";
  secText.appendChild(textInput);
  parent.appendChild(secText);

  // Position sliders
  let pos = document.createElement("div");
  pos.className = "pos";

  // Title
  let posTitle = document.createElement("p");
  posTitle.innerText = "Position";
  pos.appendChild(posTitle);

  // Slider X
  let sliderXparent = document.createElement("div");
  sliderXparent.className = "slider";

  let sliderXlabel = document.createElement("label");
  sliderXlabel.innerText = "X";
  sliderXparent.appendChild(sliderXlabel);

  let sliderX = document.createElement("input");
  sliderX.type = "range";
  sliderX.className = "posX";
  sliderX.value = "0";
  sliderXparent.appendChild(sliderX);

  let sliderXval = document.createElement("label");
  sliderXval.innerText = "0%";
  sliderXval.className = "xVal " + currentText;
  sliderXparent.appendChild(sliderXval);
  pos.appendChild(sliderXparent);

  // Slider Y
  let sliderYparent = document.createElement("div");
  sliderYparent.className = "slider";

  let sliderYlabel = document.createElement("label");
  sliderYlabel.innerText = "Y";
  sliderYparent.appendChild(sliderYlabel);

  let sliderY = document.createElement("input");
  sliderY.type = "range";
  sliderY.className = "posY";
  sliderY.value = "0";
  sliderYparent.appendChild(sliderY);

  let sliderYval = document.createElement("label");
  sliderYval.innerText = "0%";
  sliderYval.className = "yVal " + currentText;
  sliderYparent.appendChild(sliderYval);
  pos.appendChild(sliderYparent);

  // Scale
  let scl = document.createElement("div");
  scl.className = "scl sec";

  // Title
  let sclTitle = document.createElement("p");
  sclTitle.innerText = "Scale";
  scl.appendChild(sclTitle);

  // Slider
  let sclInput = document.createElement("input");
  sclInput.type = "range";
  sclInput.className = "sclTxt scl";
  sclInput.value = "0";
  scl.appendChild(sclInput);

  let sclval = document.createElement("label");
  sclval.innerText = "0%";
  sclval.className = "sclTxtVal " + currentText;
  scl.appendChild(sclval);

  // Rotation
  let rot = document.createElement("div");
  rot.className = "rot sec";

  // Title
  let rotTitle = document.createElement("p");
  rotTitle.innerText = "Rotation";
  rot.appendChild(rotTitle);

  // Slider
  let rotInput = document.createElement("input");
  rotInput.type = "range";
  rotInput.className = "rotTxt scl";
  rotInput.value = "0";
  rotInput.min = "-360";
  rotInput.max = "360";
  rot.appendChild(rotInput);

  let rotval = document.createElement("label");
  rotval.innerText = "0%";
  rotval.className = "rotTxtVal " + currentText;
  rot.appendChild(rotval);

  // Color
  let bg = document.createElement("div");
  bg.className = "sec bg";

  let bgTitle = document.createElement("p");
  bgTitle.innerText = "Color";
  bg.appendChild(bgTitle);

  let colorPar = document.createElement("div");
  colorPar.className = "slider";

  let color = document.createElement("input");
  color.type = "color";
  colorPar.appendChild(color);
  bg.appendChild(colorPar);

  let close = document.createElement("button");
  close.className = "closeBtn";
  close.classList.add(currentText);
  close.innerText = "X";

  parent.appendChild(pos);
  parent.appendChild(scl);
  parent.appendChild(rot);
  parent.appendChild(bg);
  parent.appendChild(close);

  controls.insertBefore(parent, btn);

  addTextToImg(currentText);

  currentText++;
}

let result = document.querySelector(".result");

function addTextToImg(currentTextIndex) {
  let t = document.createElement("p");
  t.className = "memeText";
  t.classList.add(currentTextIndex);
  t.innerText = "Your text here";
  t.style.position = "absolute";
  t.style.zIndex = "100";
  t.style.width = "10px";
  document.querySelector(".image").insertBefore(t, document.querySelector(".meme"));
}

function removeText(e) {
  let text = e.target;

  if (text.classList[0] === "closeBtn") {
    text.parentElement.remove();
    let textImg = document.querySelectorAll(".memeText");

    for (const texts of textImg) {
      if (texts.classList[1] == text.classList[1]) {
        texts.remove();
      }
    }

    textImg.innerText = "gone";

    currentText--;
  }
}

function updateText(e) {
  if (e.target.type == "text") {
    let input = e.target;
    let iP = input.parentElement;
    let parent = iP.parentElement;

    let textImg = document.querySelectorAll(".memeText");

    for (const texts of textImg) {
      if (texts.classList[1] == parent.classList[2]) {
        texts.innerText = input.value;
      }
    }
  }

  if (e.target.type == "range" && e.target.className == "posX") {
    let input = e.target;
    let iP = input.parentElement;
    let iPP = iP.parentElement;
    let parent = iPP.parentElement;

    let textImg = document.querySelectorAll(".memeText");

    for (const texts of textImg) {
      if (texts.classList[1] == parent.classList[2]) {
        texts.style.left = input.value + "%";
      }
    }

    for (const val of document.querySelectorAll(".xVal")) {
      if (val.classList[1] == parent.classList[2]) {
        val.innerText = input.value + "%";
      }
    }
  }

  if (e.target.type == "range" && e.target.className == "posY") {
    let input = e.target;
    let iP = input.parentElement;
    let iPP = iP.parentElement;
    let parent = iPP.parentElement;

    let textImg = document.querySelectorAll(".memeText");


    for (const texts of textImg) {
      if (texts.classList[1] == parent.classList[2]) {
        texts.style.top = input.value + "%";
      }
    }

    for (const val of document.querySelectorAll(".yVal")) {
      if (val.classList[1] == parent.classList[2]) {
        val.innerText = input.value + "%";
      }
    }
  }

  if (e.target.type == "range" && e.target.className == "sclTxt scl") {
    let input = e.target;
    let iP = input.parentElement;
    let parent = iP.parentElement;

    let textImg = document.querySelectorAll(".memeText");

    for (const texts of textImg) {
      if (texts.classList[1] == parent.classList[2]) {
        texts.style.fontSize = input.value + "px";
      }
    }

    for (const val of document.querySelectorAll(".sclTxtVal")) {
      if (val.classList[1] == parent.classList[2]) {
        val.innerText = input.value + "px";
      }
    }
  }

  if (e.target.type == "range" && e.target.className == "rotTxt scl") {
    let input = e.target;
    let iP = input.parentElement;
    let parent = iP.parentElement;

    let textImg = document.querySelectorAll(".memeText");

    for (const texts of textImg) {
      if (texts.classList[1] == parent.classList[2]) {
        texts.style.transform = `rotate(${input.value}deg)`
      }
    }

    for (const val of document.querySelectorAll(".rotTxtVal")) {
      if (val.classList[1] == parent.classList[2]) {
        val.innerText = input.value + "deg";
      }
    }
  }

  if (e.target.type == "color") {
    let input = e.target;
    let iP = input.parentElement;
    let iPP = iP.parentElement;
    let parent = iPP.parentElement;

    let textImg = document.querySelectorAll(".memeText");

    for (const texts of textImg) {
      if (texts.classList[1] == parent.classList[2]) {
        texts.style.color = input.value;
      }
    }
  }
}

//#endregion

//#region Event listeners

uploadBtn.addEventListener("change", uploadImage);
controls.addEventListener("input", updateText);
controls.addEventListener("click", removeText);

window.onload = reset();

window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  e.returnValue = "";
});

//#endregion
