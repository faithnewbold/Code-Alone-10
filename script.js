// Name: Faith Newbold
// Description: Chap app handler

// Star Wars–themed chat data
const chatData = {
  general: [
    {
      sender: "Luke Skywalker",
      text: "May the Force be with you, everyone.",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "Always",
      fromSelf: true,
    },
    {
      sender: "Leia Organa",
      text: "Focus, team. We have a new transmission from Hoth Command.",
      fromSelf: false,
    },
  ],

  planning: [
    {
      sender: "Han Solo",
      text: "I've got a bad feeling about this mission...",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "It's just a quick hyperspace jump.",
      fromSelf: true,
    },
    {
      sender: "Chewbacca",
      text: "Rrrrghh!",
      fromSelf: false,
    },
    {
      sender: "Han Solo",
      text: "Chewie agrees. We should double-check the nav-computer.",
      fromSelf: false,
    },
  ],

  feedback: [
    {
      sender: "Obi-Wan Kenobi",
      text: "Remember: The Force will be with you, always.",
      fromSelf: false,
    },
    {
      sender: "Yoda",
      text: "Do or do not. There is no try.",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "Wise words",
      fromSelf: true,
    },
  ],
};

// channel selection
let currentChannel = "general";

function changeChannel(event) {
  const clickedChannel = event.currentTarget;
  const newChannel = clickedChannel.dataset.channel;

  // removing active status from old channel
  const activeChannel = document.querySelector('.channel.active');
  if (activeChannel) {
    activeChannel.classList.remove("active");
  }

  // adding active status to new channel
  clickedChannel.classList.add("active");

  // update header to show the current channels name
  const header = document.getElementById('channel-title');
  header.textContent = clickedChannel.textContent;

  // populate messages for that chat in the window
  currentChannel = newChannel;
  populateMessages(newChannel);
}


// populate messages
function populateMessages(channelName) {
  const chatContainer = document.getElementById("chat-messages");
  const template = document.querySelector("template");

  // remove old messages
  chatContainer.innerHTML = "";

  // get messages for the selected channel
  const messages = chatData[channelName]

  // add each message
  messages.forEach((msg) => {
    const messageElement = template.content.cloneNode(true);

    // get the message elements to be shown
    const messages = messageElement.querySelector(".message");
    const senderElement = messageElement.querySelector(".sender");
    const textElement = messageElement.querySelector(".text");

    senderElement.textContent = `${msg.sender}:`;
    textElement.textContent = msg.text;

    // apply special styling if the message is from you
    if (msg.fromSelf) {
      messages.classList.add("self");
    };

    // append new element to the chat container
    chatContainer.appendChild(messageElement);
  });
}


// sending messages
function sendMessage() {
  const input = document.getElementById("message-input");
  const text = input.value.trim();
  if (text === "") {
    return;
  }

  // add messages to the chat data object
  const newMessage = { sender: "You", text, fromSelf: true };
  chatData[currentChannel].push(newMessage);

  // add new messages to the screen
  const chatContainer = document.getElementById("chat-messages");
  const template = document.querySelector("template");
  const messageElement = template.content.cloneNode(true);
  const messages = messageElement.querySelector(".message");
  const senderElement = messageElement.querySelector(".sender");
  const textElement = messageElement.querySelector(".text");

  // style as a user message
  senderElement.textContent = "You:";
  textElement.textContent = text;
  messages.classList.add("self");

  chatContainer.appendChild(messages);

  // clear the input box
  input.value = "";
}


// initialize listeners
function initializeEventListeners() {
  // channel button listeners
  const channels = document.querySelectorAll(".channel");
  channels.forEach((btn) => {
    btn.addEventListener("click", changeChannel);
  });

  // send button handler
  const sendBtn = document.querySelector(".chat-input button");
  sendBtn.addEventListener("click", sendMessage);
}

// initialize app
window.addEventListener("DOMContentLoaded", () => {
  initializeEventListeners();
  populateMessages("general");
})