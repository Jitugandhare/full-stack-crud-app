const express = require("express");
const {UserModel}=require("../models/User.model")
const jwt = require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userRuter = express.Router()


userRuter.post("/register", async(req, res) => {
    const {name,email,pass} = (req.body)
    try {
        bcrypt.hash(pass, 5,  async(err, hash)=> {
          // Store hash in your password DB.
            if (err) {
                res.send({ msg: "something went wrong", error: err.message });
            } else {
                const user = new UserModel({ name, email, pass: hash })
                await user.save()
                res.send({ msg: "New user registered" });
            }
        });
        
    }
    catch (err) {
        res.send({ msg: "something went wrong","error":err.message});
    }
})



userRuter.post("/login", async(req, res) => {
    const { email, pass } = (req.body)
    try {
        const user = await UserModel.find({ email})
        if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, (err, result)=> {
              // result == true
                if (result) {
                     let token = jwt.sign({ userID:user[0]._id}, "masai");
                     res.send({ msg: "Login in", token: token });
                } else {
                    res.send({
                      msg: "something went wrong",
                      error: err.message,
                    });
                }
            });

           
        } else {
            res.send({ msg: "Wrong credentials"});
        }
    } catch (err) {
        res.send({"msg":"something went wrong","error":err.message})
    }
})





module.exports = {
    userRuter
}
