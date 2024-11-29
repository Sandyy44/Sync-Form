const express = require("express");
const port = 3311;
const app = express();
const ws = require("ws");
let listOfObjs = [];

const server = app.listen(port, () => {
  console.log("server connected");
});
const webSocket = new ws.Server({ server });
webSocket.on("connection", async (wss) => {
  await clients(JSON.stringify(listOfObjs));
  await console.log("connection success");
  await wss.on("message", async (msg) => {
    let obj = await JSON.parse(msg);
    await console.log("obj");

    await console.log(obj);
    await listOfObjs.push(obj);
    await console.log("list");
    await listOfObjs.forEach(async (d) => {
      console.log(d);
    })
    await clients(JSON.stringify(listOfObjs));
  });

});

app.get("/", (req, res) => {

  res.sendFile(__dirname + "/index.html")
});

function clients(msg) {
  webSocket.clients.forEach((item) => {
    if (item.readyState == item.OPEN) {
      item.send(msg);
    }
    else {
      console.log("client is connected");
    }
  })
}