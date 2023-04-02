app.factory("socketFactory", function () {
  var socket = io("http://localhost:8080");

  socket.on("connect", () => {
    console.log("Socket ID ----->", socket.id);
    const engine = socket.io.engine;
    engine.on("close", (reason) => {
      console.log("Close reason is  ", reason);
    });
  });

  return socket;
});
