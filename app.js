const express = require("express")

const mongoose = require("mongoose")
const Shoe = require("./models/shoe")

const app = express()
app.use(express.urlencoded({ extended : true }))
app.set("view engine","ejs")
//app.listen(3000)

const dbURL = "mongodb+srv://ShoeStruck:YQ9QJNR@shoes.hhjyfzm.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dbURL)
.then(()=>{
    console.log("mongo connected")
    app.listen(3000)
}).catch((err)=>{
    console.log(err)
})

app.get("/ShoeStruck/sign-up",(req,res)=>{
    res.render("sign-up",{title: "sign-up"})
})

app.get("/ShoeStruck/log-in",(req,res)=>{
    res.render("log-in",{title:"log-in"})
})

app.get("/",(req,res)=>{
    res.redirect("/ShoeStruck/sign-up")
})

app.get("/ShoeStruck",(req,res)=>{
    res.redirect("/ShoeStruck/sign-up")
})

app.post("/ShoeStruck/sign-up",(req,res)=>{
    //console.log(req.body)
    const shoe = new Shoe(req.body)
    shoe.save().then((result)=>{
        res.redirect("/ShoeStruck/log-in")
    }).catch((err)=>{
        console.log(err)
    })
})

app.post("/ShoeStruck/log-in",(req,res)=>{
    Shoe.findOne({email: req.body.email,password: req.body.password}).then((result)=>{
        console.log(result)
        if(result != null){
            
            res.redirect("/ShoeStruck/home")    
        
            app.get("/ShoeStruck/home",(req,res)=>{
                res.render("index",{title:"HOME"})
            })

            app.get("/ShoeStruck/profile",(req,res)=>{

                res.render("profile",{title:"PROFILE",data:result})
            
            })

            app.get("/ShoeStruck/cart",(req,res)=>{
                res.render("cart",{title:"CART"})
            })

            app.get("/ShoeStruck/men/casual",(req,res)=>{
                res.render("men_casual",{title:"MEN-CASUAL"})
            })

            app.get("/ShoeStruck/men/formal",(req,res)=>{
                res.render("men_formal",{title:"MEN-FORMAL"})
            })

            app.get("/ShoeStruck/men/sport",(req,res)=>{
                res.render("men_sport",{title:"MEN-SPORT"})
            })

            app.get("/ShoeStruck/women/casual",(req,res)=>{
                res.render("women_casual",{title:"WOMEN-CASUAL"})
            })

            app.get("/ShoeStruck/women/formal",(req,res)=>{
                res.render("women_formal",{title:"WOMEN-FORMAL"})
            })

            app.get("/ShoeStruck/women/sport",(req,res)=>{
                res.render("women_sport",{title:"WOMEN-SPORT"})
            })

            app.get("/ShoeStruck/kid/casual",(req,res)=>{
                res.render("kid_casual",{title:"KID-CASUAL"})
            })

            app.get("/ShoeStruck/kid/formal",(req,res)=>{
                res.render("kid_formal",{title:"KID-FORMAL"})
            })

            app.get("/ShoeStruck/kid/sport",(req,res)=>{
                res.render("kid_sport",{title:"KID-SPORT"})
            })




        }else
            console.log("Your Email and Password does't match")
    }).catch((err)=>{
        console.log(err)
    })
})

