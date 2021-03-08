const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt"); 
const uploader = require("./../config/cloudinary");
const UserModel =require("../models/users")

// const protectAdminRoute = require("./../middlewares/protectAdminRoute") 
// COMMENTED THIS TO AVOID THE MODULE ERROR//

router.get("/signin", (req, res, next)=>res.render("signin"))

router.post("/signin", async(req, res, next)=>{
    const {email, password}=req.body;
    const foundUser = await UserModel.findOne({ email: email });
    console.log("-----ETAPE 1---------", foundUser);
  if (!foundUser) {
    //   Display an error message telling the user that either the password
    // or the email is wrong
    console.log("-----ETAPE 2---------");
    req.flash("error", "Invalid credentials");
    res.redirect("/signin");

    // res.render("auth/signin.hbs", { error: "Invalid credentials" });
  } else {
    // https://www.youtube.com/watch?v=O6cmuiTBZVs
    console.log("-----ETAPE 3---------");
    const isSamePassword = await bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
      // Display an error message telling the user that either the password
      // or the email is wrong
      req.flash("error", "Invalid credentials");
      res.redirect("/signin");
      // res.render("auth/signin.hbs", { error: "Invalid credentials" });
    } else {
      // everything is fine so :
      // Authenticate the user...
      const userObject = foundUser.toObject();
      delete userObject.password; // remove password before saving user in session
      // console.log(req.session, "before defining current user");
      req.session.currentUser = userObject; // Stores the user in the session (data server side + a cookie is sent client side)
      req.flash("success", "Successfully logged in...");
      res.redirect("/");
    }
  }
})

router.get("/signup", (req, res, next)=>{
  res.render('signup')
})

router.post("/signup", async (req, res, next)=>{
     try {
    const newUser = { ...req.body };
    console.log("NEW USER HERE", newUser)
    const foundUser = await UserModel.findOne({ email: newUser.email });
    console.log("FOUND USER",foundUser)
    console.log("-----ETAPE 1---------");
    if (foundUser) {
      console.log("-----ETAPE 2---------");
      req.flash("warning", "Email already registered");
      res.redirect("/signup");
    } else {
      console.log("-----ETAPE 3---------");
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      console.log("PASSWORD HERE," , hashedPassword)
    
      const dbRes = await UserModel.create(newUser);
      console.log("DBRESULT", dbRes);
      console.log("NEW USER HERE", newUser);
      req.flash("success", "Congrats ! You are now registered !");
      res.redirect("/signin");
    }
  } catch (err) {
    let errorMessage = "";
    for (field in err.errors) {
      errorMessage += err.errors[field].message + "\n";
    }
    console.log("-------ETAPE 4-------");
    req.flash("error", errorMessage);
    res.redirect("/signup");
  }
})

router.get("/signout", (req, res, next)=>{
  console.log(req.session);
  req.session.destroy(function (err) {
    
    // cannot access session here anymore
    res.redirect("/signin");
  });
})

router.get("/logout", (req, res, next)=>{
  res.redirect("/")
})

router.get("/home", (req, res, next)=>{
  res.redirect("/")
})


module.exports = router;