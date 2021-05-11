const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const fs = require("fs")
const port = process.env.PORT || 8080
const file = require("./issues.json")
const esamuday = require("./esamuday.json")


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

app.get("/getdata",(req,resp)=>{
	resp.json(file)
})




app.get("/esamuday",(req,resp)=>{
	resp.render("esamuday")
})

app.post("/",(req,resp)=>{
  var body = req.body;
  console.log(esamuday[body.cat][body.sub])
  resp.send(esamuday[body.cat][body.sub])
})
app.post("/products",(req,resp)=>{
	var data = req.body
	var arr = esamuday[data.cat][data.sub]
	var list = []
	for(var i=0;i<arr.length;i++){
		list.push(arr[i].name);
	}
	for(var i=0;i<list.length;i++)
		console.log(list[i])
	data = {
		data:list
	}
   resp.send(JSON.stringify(data));
})

app.post("/esamuday/getprice",(req,resp)=>{
	
	var data = req.body;
	// console.log({price:esamuday[data.cat][data.sub]})
	// resp.send({price:esamuday[data.cat][data.sub].price})
	var price;
	var arr = esamuday[data.cat][data.sub]
	for(var i=0;i<arr.length;i++){
		if(arr[i].name==data.product){
			price = arr[i].price
			console.log(price)
			break;
		}
	}
	resp.send(JSON.stringify({price:price}))
})

app.post("/esamuday/addproduct",(req,resp)=>{
	console.log("requested addproduct")
  var data = req.body 
  var product = {name:data.product,price:data.price}
  var handle = esamuday[data.cat]
  if(handle){
  		handle = handle[data.sub]
  		if(handle){
  			esamuday[data.cat][data.sub].push(product)
  		}
  		else{
          //create sub-category
          esamuday[data.cat][data.sub] = []
          esamuday[data.cat][data.sub].push(product)
  		}
  }
  else{
  	//create category
     esamuday[data.cat] = new Object()
     esamuday[data.cat][data.sub] = []
     esamuday[data.cat][data.sub].push(product)
  }

  data = JSON.stringify(esamuday)
		fs.writeFile("./esamuday.json",data,(err)=>{
			if(err) resp.send("<b styel='color:red'>Failed</b>")
			resp.send("<p style='color:green' >Successfully added your product</p>")
		})
    console.log("ended addproduct")
})

app.post("/esamuday/all",(req,resp)=>{
	resp.send(esamuday);
})
