/* 
Project by Bernardo Balestrini 14/8/2020
Chatbox only use with chrome */

const voice = document.querySelector(".voice");
const voice2text = document.querySelector(".voice2text");
let questionCount = 0;
let noArray = [];
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recorder = new SpeechRecognition();
const ul = document.getElementById("nos");

function addHumanText(text) {
  const chatContainer = document.createElement("div");
  const timeStamp = document.createElement("p");
  timeStamp.innerText = moment().format("ddd/Do/MM/Y h:mm:ss a");
  chatContainer.classList.add("human-chat-container");
  const chatBox = document.createElement("p");
  chatBox.classList.add("voice2text");
  const chatText = document.createTextNode(text);
  chatBox.appendChild(chatText);
  chatContainer.appendChild(chatBox);
  chatBox.appendChild(timeStamp);
  document.querySelector(".chat-box").scrollTop = 1000;
  return chatContainer;
}

const chatContainer1 = document.createElement("div");

function addBotText(text) {
  const chatContainer1 = document.createElement("div");
  const timeStamp = document.createElement("p");
  timeStamp.innerText = moment().format("ddd/Do/MM/Y h:mm:ss a");
  chatContainer1.classList.add("robot-chat-container");
  chatContainer1.classList.add("darker");
  const chatBox1 = document.createElement("p");
  chatBox1.classList.add("voice2text");
  const chatText1 = document.createTextNode(text);
  chatBox1.appendChild(chatText1);
  chatBox1.appendChild(timeStamp);
  chatContainer1.appendChild(chatBox1);
  document.querySelector(".chat-box").scrollTop = 1000;
  return chatContainer1;
}

function botVoice(message) {
  questionCount++;
  console.log(questionCount);
  const speech = new SpeechSynthesisUtterance();
  speech.text = "sorry, Please try again";

  if (message.includes("yes") || message.includes("no")) {
    if (questionCount === 1) {
      speech.text = "Hi! What would you like to know today?";

      if (message.includes("no")) {
        console.log("hit");
        noArray.push({
          question: "Hi! What would you like to know today?",
          message,
        });
      }
    }
  }
  if (message.includes("yes") || message.includes("no")) {
    if (questionCount === 2) {
      speech.text = "In what country are you right now?";

      if (message.includes("no")) {
        noArray.push({
          question: "In what country are you right now?",
          message,
        });
      }
    }
  }

  if (message.includes("yes") || message.includes("no")) {
    if (questionCount === 3) {
      if (message.includes("no")) {
        noArray.push({
          question: "In what city?",
          message,
        });
      }
      speech.text = "In what city?";
    }
  }

  if (questionCount === 4 && message.includes("Barcelona")) {
    speech.text = "It is currently 27 degrees celsius.";
    if (questionCount === 4) {
      if (message.includes("no")) {
        noArray.push({
          question: "Hi! What would you like to know today?",
          message,
        });
      }
    }
  }
  if (questionCount === 4) {
    const list = noArray
      .map((nos) => {
        return `<li>
        <div>You said no to: </div>
        <div>${nos.question} </div>
      </li>`;
      })
      .join("");

    ul.innerHTML = list;
  }

  speech.volume = 1;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
  let element = document.getElementById("robot");
  element.appendChild(addBotText(speech.text));
}

recorder.onstart = () => {
  console.log("Voice activated");
};

recorder.onresult = (event) => {
  const resultIndex = event.resultIndex;
  const transcript = event.results[resultIndex][0].transcript;
  let element = document.getElementById("human");
  element.appendChild(addHumanText(transcript));
  botVoice(transcript);
};

voice.addEventListener("click", () => {
  recorder.start();
});
