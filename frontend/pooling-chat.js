const chat = document.getElementById("chat");
const msgs = document.getElementById("msgs");

// აქ შევინახავ ყველა შეტყობინებას
let allChat = [];

// პოლინინგის ინტერვალი მილილისთვის
const INTERVAL = 3000;

// ფორმის დამატების მომხმარებელი
chat.addEventListener("submit", function (e) {
  e.preventDefault();
  postNewMsg(chat.elements.user.value, chat.elements.text.value);
  chat.elements.text.value = "";
});

async function postNewMsg(user, text) {
  // გამოვიყენოთ /poll მინიჭების მომხმარებელი
  // დაწერე კოდი აქვე
}

async function getNewMsgs() {
  // პოლინინგის მომხმარებელი
  // დაწერე კოდი აქვე
}

function render() {
  // მანამდე მანამდე ყველა შეტყობინება მომხმარებელს გამოვიყენოთ
  // დაწერე კოდი აქვე
  const html = allChat.map(({ user, text, time, id }) =>
    template(user, text, time, id)
  );
  msgs.innerHTML = html.join("\n");
}

// მომხმარებელი და შეტყობინება, მას გამოვიყენოთ HTML სტრინგი
const template = (user, msg) =>
  `<li class="collection-item"><span class="badge">${user}</span>${msg}</li>`;

// გამოვიყენოთ პირველი მოთხოვნა
getNewMsgs();
