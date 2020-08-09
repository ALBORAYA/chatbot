const voice = document.querySelector(".voice");
const voice2text = document.querySelector(".voice2text");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recorder = new SpeechRecognition();

function addHumanText(text) {
  const chatContainer = document.createElement("div");
  chatContainer.classList.add("chat-container");

  const chatBox = document.createElement("p");
  chatBox.classList.add("voice2text");

  const chatText = document.createTextNode(text);
  chatBox.appendChild(chatText);

  chatContainer.appendChild(chatBox);
  return chatContainer;
}

const chatContainer1 = document.createElement("div");

function addBotText(text) {
  chatContainer1.classList.add("chat-container");
  chatContainer1.classList.add("darker");
  const chatBox1 = document.createElement("p");
  chatBox1.classList.add("voice2text");
  const chatText1 = document.createTextNode(text);
  chatBox1.appendChild(chatText1);
  chatContainer1.appendChild(chatBox1);
  return chatContainer1;
}

function botVoice(message) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = "this is a test message";
  let array = [];

  if (message.includes("Leo cara de pedo")) {
    speech.text = " He is all that";
  }

  if (message.includes("Te bañaste hoy")) speech.text = "no";
  array.push(message);
  speech.text = " No " + array[0];

  speech.volume = 1;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
  let element = document.getElementById("container");
  element.appendChild(addBotText(speech.text));
}

recorder.onstart = () => {
  console.log("Voice activated");
};

recorder.onresult = (event) => {
  const resultIndex = event.resultIndex;
  const transcript = event.results[resultIndex][0].transcript;
  let element = document.getElementById("container");
  element.appendChild(addHumanText(transcript));
  botVoice(transcript);
};

voice.addEventListener("click", () => {
  recorder.start();
});
