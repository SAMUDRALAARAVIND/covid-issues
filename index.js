const express = require("express")
const app = express()
app.use("views","views")
app.use("view engine","ejs")

const port = process.env.PORT || 8080

app.listen(port,()=>{
	console.log("app is listening on port "+port)
})

app.get("/",(req,resp)=>{
	resp.send("hello world")
})