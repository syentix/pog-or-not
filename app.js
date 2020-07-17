//
// ─── DEFINING SOME CONSTANTS ────────────────────────────────────────────────────
//

const POGCHAMP = ["pogchamp", "poggers", "pog"];
const LUL = ["lul", "lol"];
const FOURHEAD = ["4head", "5head"];

//
// ─── DEFINING NONSENSE EXCEPTION ────────────────────────────────────────────────
//

const BreakException = {};

//
// ─── GETTING SELECTOR FOR ELEMENTS IN HTML ──────────────────────────────────────
//

const versusElem = document.querySelector("#versus");
const streamerElem = document.getElementById("streamer");

//
// ─── CONNECTING TO TWITCH CHAT ──────────────────────────────────────────────────
//

let streamer = "jericho";
streamerElem.innerHTML = `Streamer: ${streamer.toUpperCase()} @ <a href="https://www.twitch.tv/${streamer}"><i class="fa fa-twitch" aria-hidden="true"></i></a>`;

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [streamer],
});

client.connect().catch(console.error);

//
// ──────────────────────────────────────────────────────────────── CONNECTED ─────
//

//
// ─── COUNTING ALL THE EMOTES ────────────────────────────────────────────────────
//

let counts = {
  lul: 0,
  fourHead: 0,
  pog: 0,
};

// ────────────────────────────────────────────────────────────────────────────────

client.on("message", (channel, tags, message, self) => {
  if (self) return;
  let messageParts = message.split(" ");
  // Looping through every word in message
  try {
    messageParts.forEach((word) => {
      if (POGCHAMP.includes(word.toLowerCase())) {
        console.log(message);
        counts.pog++;
        throw BreakException;
      } else if (FOURHEAD.includes(word.toLowerCase())) {
        console.log(message);
        counts.fourHead++;
        throw BreakException;
      } else if (LUL.includes(word.toLowerCase())) {
        console.log(message);
        counts.lul++;
        throw BreakException;
      }
    });
  } catch (e) {
    if (e !== BreakException) console.log(e);
  }
  versusElem.textContent = `${counts.lul} LULs vs. ${counts.pog} POGs vs. ${counts.fourHead} 4Heads`;
});

//
// ──────────────────────────────────────────────── COUNTED AND ADDED TO SITE ─────
//
