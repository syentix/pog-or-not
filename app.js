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

const pogElem = document.querySelector("#pog");
const lulElem = document.querySelector("#lul");
const fourHeadElem = document.querySelector("#four-head");
const streamerElem = document.getElementById("streamer");

let counts = {
  lul: 0,
  fourHead: 0,
  pog: 0,
};

const outputStreamerStats = (client, streamer) => {
  //
  // ─── CONNECTING TO TWITCH CHAT ──────────────────────────────────────────────────
  //

  client.connect().catch(console.error);

  setTimeout(() => {
    client
      .join(streamer)
      .then(() => {
        streamerElem.innerHTML = `Streamer: ${streamer.toUpperCase()} @ <a href="https://www.twitch.tv/${streamer}"><i class="fa fa-twitch" aria-hidden="true"></i></a>`;
        streamerElem.style = "color: #606c76;";
      })
      .catch((error) => {
        console.error(error);
        streamerElem.innerHTML = "Streamer not found. Try again.";
        streamerElem.style = "color: #FF4136;";
      });
  }, 1350);

  //
  // ──────────────────────────────────────────────────────────────── CONNECTED ─────
  //

  //
  // ─── COUNTING ALL THE EMOTES ────────────────────────────────────────────────────
  //

  client.on("message", (channel, tags, message, self) => {
    if (self) return;
    let messageParts = message.split(" ");
    // Looping through every word in message
    try {
      messageParts.forEach((word) => {
        if (POGCHAMP.includes(word.toLowerCase())) {
          counts.pog++;
          throw BreakException;
        } else if (FOURHEAD.includes(word.toLowerCase())) {
          counts.fourHead++;
          throw BreakException;
        } else if (LUL.includes(word.toLowerCase())) {
          counts.lul++;
          throw BreakException;
        }
      });
    } catch (e) {
      if (e !== BreakException) console.log(e);
    }

    // ────────────────────────────────────────────────────────────────────────────────

    const sum = Object.values(counts).reduce((t, n) => t + n);
    const ratio = (count) => {
      const result = ((count / sum) * 100).toFixed(2);
      return isNaN(result) ? 0 : result;
    };
    pogElem.textContent = `${counts.pog} POGs (${ratio(counts.pog)}%)`;
    lulElem.textContent = `${counts.lul} LULs (${ratio(counts.lul)}%)`;
    fourHeadElem.textContent = `${counts.fourHead} 4Heads (${ratio(
      counts.fourHead
    )}%)`;
  });

  //
  // ──────────────────────────────────────────────── COUNTED AND ADDED TO SITE ─────
  //
};

//
// ─── PREVENT RELOAD AND CHANGE STREAMER TO WATCH ────────────────────────────────
//

let client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: ["jericho"],
});

document.querySelector("#streamerForm").addEventListener("submit", (e) => {
  for (let key in counts) {
    counts[key] = 0;
  }
  e.preventDefault();
  client.disconnect();
  // Sanitize
  const sanitize = (string) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "/": "&#x2F;",
    };
    const reg = /[&<>"'/]/gi;
    return string.replace(reg, (match) => map[match]);
  };
  const streamer = sanitize(document.getElementById("usernameInput").value);

  client = new tmi.Client({
    connection: {
      secure: true,
      reconnect: true,
    },
    channels: [streamer],
  });

  document.getElementById("usernameInput").value = "";

  outputStreamerStats(client, streamer);
});

//
// ─── STANDARD STREAMER ──────────────────────────────────────────────────────────
//

outputStreamerStats(client, "jericho");
