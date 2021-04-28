const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const fs = require("fs")
const port = process.env.PORT || 8080
const file = require("./issues.json")



console.log(file[0].name+"		"+file[0].issue)
app.use(bodyParser.urlencoded({extended:true}))
app.set("views","views")
app.set("view engine","ejs")



app.listen(port,()=>{
	console.log("app is listening on port "+port)
})

app.get("/",(req,resp)=>{
	resp.render("home")
})
app.post("/",(req,resp)=>{
	var data = req.body
	if(data.name==""){
		data.name = "Anonymous"
	}
	if(data.issue==""){
		resp.redirect("/")
	}
	else{
		var d = new Date()
		var year = d.getFullYear()
		var day = d.getDate()
		var month = d.getMonth()+1
	 	data.date = day.toString()+"-"+month.toString()+"-"+year.toString()
		file.unshift(data)
		data = JSON.stringify(file)
		fs.writeFile("./issues.json",data,(err)=>{
			if(err) resp.send("An error occured")

			resp.send("Your post has been added successfully!"+"<br><a href='/all/issues/'>View all posts here..</a>")
		})
	}
})

app.get("/all/issues",(req,resp)=>{
	resp.render("all",{file:file})
})