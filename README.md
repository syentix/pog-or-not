[![Netlify Status](https://api.netlify.com/api/v1/badges/5836e7d1-1186-4d10-a9b1-401149973c7f/deploy-status)](https://app.netlify.com/sites/pog-or-not/deploys)
# Pog or not?

Website that counts the usage of emotes. Analyses the stream by pogness and 5headness...

This is currently in a very early stage. For now the streamer has to be hardcoded, since I didn't really get far that night i made this app.
Later on you should be able to input any streamer by username and the streamer will be added to a database. 

### TODO: 

* [X] https://github.com/tmijs/tmi.js - To listen to chat.
* [X] Get connection to chat.
* [X] Listen to emotes and count them (ONCE per message)
* [X] Show ratio of emotes.
* [ ] Give feedback to streamer (Nice little sentence/ funny comment).

### Ideas: 
* [ ] Add streamer to database and count can be updated every 10 mins
* [ ] The latest count will be shown, if streamer was inputted
