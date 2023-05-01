const express = require("express")
const { connection } = require("./db")
const {userRuter}=require("./routs/user.routs")
const {noteRouter}=require("./routs/Note.rout")
const {authenticate}=require("./middleware/auth.middleware")
const cors=require("cors")
require("dotenv").config()
const app = express();
app.use(express.json());
app.use(cors())
app.get("/", (req, res) => {
    res.send("HOME PAGE")
})

app.use("/users",userRuter)
app.use(authenticate);
app.use("/notes", noteRouter)






app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log(err.message);
  }
});