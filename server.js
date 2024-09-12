const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const chatRoutes = require("./routes/chat");
const userMessage = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins

app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use('/api/userMessage', userRoutes);
app.use('/api/messages', messageRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
