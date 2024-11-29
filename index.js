const express = require("express");
const port = 3311;
const app = express();
const ws = require("ws");

//intializing the array of objects which will contain the data the user will submit in a form of object
//obj = {name,age,number,gender}
let listOfObjs = [];

//setting up the port the server will listen to
const server = app.listen(port, () => {
  console.log("server connected");
});

//setting up a websocker to our server
const webSocket = new ws.Server({ server });

webSocket.on("connection", async (wss) => {

  //when a client first connects to the server, they will get the array of object
  await clients(JSON.stringify(listOfObjs));

  await console.log("connection success");

  await wss.on("message", async (msg) => {

    //server recieves a new object and here we're turning it to json
    let obj = await JSON.parse(msg);

    await console.log(obj);
    
    //pushing the new object to the array of object to save it
    await listOfObjs.push(obj);

    //checking the array contents
    await listOfObjs.forEach(async (d) => {
      console.log(d);
    })

    //sending the array of objects to each open client
    await clients(JSON.stringify(listOfObjs));

  });

});

app.get("/", (req, res) => {
  //sending the html page to response to the get request "/"
  res.sendFile(__dirname + "/index.html")
});

//a function that iterates on each client and sending them the array of objects
function clients(msg) {
  webSocket.clients.forEach((item) => {
    if (item.readyState == item.OPEN) {
      item.send(msg);
    }
  })
}