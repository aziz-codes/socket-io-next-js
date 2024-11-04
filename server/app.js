import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const users = [];
io.on("connection", (socket) => {
  console.log("socket connected with id of", socket.id);

  socket.on("userEvent", (user) => {
    console.log("user event is ", user);
    const newUser = {
      id: socket.id,
      name: user.name,
      age: user.age,
    };
    users.push(newUser);
    io.emit("message", users);
    console.log("new user event emitted");
  });
});

io.listen(5000, () => {
  console.log("socket server is runnning");
});
