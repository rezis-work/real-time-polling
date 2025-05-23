const chat = document.getElementById("chat");
const msgs = document.getElementById("msgs");

// აქ შევინახავ ყველა შეტყობინებას
let allChat = [];

// პოლინინგის ინტერვალი მილილისთვის
const INTERVAL = 3000;

let timeToMakeNextRequest = 0;

// ფორმის დამატების მომხმარებელი
chat.addEventListener("submit", function (e) {
  e.preventDefault();
  postNewMsg(chat.elements.user.value, chat.elements.text.value);
  chat.elements.text.value = "";
});

async function postNewMsg(user, text) {
  const data = {
    user,
    text,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch("/poll", options);
  const json = await res.json();
}

async function getNewMsgs() {
  let json;
  try {
    const res = await fetch("/poll");
    json = await res.json();

    if (res.status >= 400) {
      throw new Error("request did not succeed" + res.status);
    }

    allChat = json.msg;
    render();
    failedTries = 0;
  } catch (error) {
    console.error("polling error", error);
    failedTries++;
  }
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

const BACKOFF = 5000;
let failedTries = 0;
async function rafTimer(time) {
  if (timeToMakeNextRequest <= time) {
    await getNewMsgs();
    timeToMakeNextRequest =
      performance.now() + INTERVAL + failedTries * BACKOFF;
  }
  requestAnimationFrame(rafTimer);
}

requestAnimationFrame(rafTimer);
