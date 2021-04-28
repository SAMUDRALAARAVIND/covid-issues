const fs = require("fs")
// const file = require("./issues.json")
// file.push({name:"swamy",issue:"none"})

// console.log(file)

// fs.writeFile("./issues.json",file,(err)=>{
// 	if(err) console.log("error")
// 	else console.log("success")
// })
var x = [{name:"aravind",issue:"No issue"}]
x.push({name:"Mowa",issue:"alludu"})
console.log(x)
x.push({name:"Aravind",date:new Date()})
var data = JSON.stringify(x)
data
fs.writeFile("./issues.json",data,(err)=>{
	if(err) console.log("err")
	else console.log("done")
})
