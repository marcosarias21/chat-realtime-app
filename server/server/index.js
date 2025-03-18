import express from "express";

const port = 3000

const app = express()

app.get('/', (req, res) => {
  res.send("Este es el chat")
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})