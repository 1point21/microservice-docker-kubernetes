const express = require("express")
const cors = require("cors")
const fridgeRouter = require("./router")

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/fridge", fridgeRouter)

// SEND ERROR MESSAGE
app.use((err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    } else {
      next(err);
    }
  });
  
// ANY OTHER INTERNAL SERVER ERROR
app.use((err, req, res, next) => {
    res.status(500).send({ msg: "Internal Server Error" });
  });

module.exports = app