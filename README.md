[![Netlify Status](https://api.netlify.com/api/v1/badges/5836e7d1-1186-4d10-a9b1-401149973c7f/deploy-status)](https://app.netlify.com/sites/pog-or-not/deploys)
# Pog or not?

Website that counts the usage of emotes. Analyses the stream by pogness and 5headness...

By entering a streamer's username, a tmi.js client will enter the chat and count the amount of emotes that are recognized by my code: 
* pog, poggers
* lul, lol
* 4head, 5head

Then the website will display the amount of each category and give a ratio.
When changing the streamer, the count object gets reset and will diconnect from the previous channel and enters the new chat.

### TODO: 

* [X] https://github.com/tmijs/tmi.js - To listen to chat.
* [X] Get connection to chat.
* [X] Listen to emotes and count them (ONCE per message)
* [X] Show ratio of emotes.
* [ ] Give feedback to streamer (Nice little sentence/ funny comment).

__Small little project  powered by the folks @ [tmi.js](https://github.com/tmijs/tmi.js)__
