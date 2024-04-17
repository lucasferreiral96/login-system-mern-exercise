require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const usermodel = require("./models/userModel");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));


const checkUser = (req, res, next) => {
    const accesstoken = req.cookies.accesstoken;
    if(!accesstoken){
        if(newToken(req, res)){
            next();
        }
    }else{
        jwt.verify(accesstoken, ACCESS_TOKEN, (error, decoded)=>{
            if(error){
                return res.json({valid: false, message: "REFRESH token inválido"})
            }else{
                req.username = decoded.username;
                next();
            }
        })
    }
}

const newToken = (req, res) => {
    let exist = false;
    const refreshToken = req.cookies.refreshtoken;

    if(!refreshToken){
        return res.json({valid: false, message: "REFRESH token inválido não existe"})
    }else{
        jwt.verify(refreshToken, REFRESH_TOKEN, (error, decoded)=>{
            if(error){
                return res.json({valid: false, message: "Token inválido!"})
            }else{
                const accessToken = jwt.sign({username: username}, ACCESS_TOKEN, {expiresIn: '1m'})
                res.cookie("accesstoken", accessToken, {maxAge: 60000});
                exist = true;
            }
        })
    }

    return exist;
}



app.get("/", (req, res) => {
    res.send("Tudo certo");
})

app.get("/dashboard", checkUser, (req, res) => {
    return res.json({valid: true, message: "Autorizado"})
})

app.post("/signup", async (req, res) => {
    const {username, email, password} = req.body;

    const data = {
        username: username,
        email: email,
        password: password
    }

    await usermodel.insertMany([data]);

    console.log(req.body);
    return res.status(200).json("Tudo certo");
})

app.post("/login", (req, res) => {
    const {username, password} = req.body;
    usermodel.findOne({username}).then(user => {
        console.log(user);

        if(user){
            if(user.password === password){
                const accessToken = jwt.sign({username: username}, ACCESS_TOKEN, {expiresIn: "1m"});
                const refreshToken = jwt.sign({username: username}, REFRESH_TOKEN, {expiresIn: "5m"});
                
                res.cookie('accesstoken', accessToken, {maxAge: 60000});
                res.cookie('refreshtoken', refreshToken, {maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict'});
                return res.status(200).json({login: true})
            }
        }else{
            return res.status(400).json({login: false, Message: "Usuário ou senha inválidos!"});
        }
    }).catch(error => {
        console.log("Erro de login: "+error.message);
        return res.json({Erro: error.message})
    })
})

mongoose.connect("mongodb://localhost:27017/mernlogin").then((success) => {
    if(success){
        console.log("Conectado ao MongoDB");
    }

    app.listen(8080, () => {
        console.log("Server ON");
    })
}).catch((error) => {
    if(error){
        console.log("Erro MongoDB: "+error.message);
    }
})
