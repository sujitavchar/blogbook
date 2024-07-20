const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const JWT_SECRET = "sujit's jwt token key";

// Route 1  POST  end point: /api/auth/createUser
router.post(
  "/createUser",
  [
    body("name").isLength({ min: 1 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("dob")
      .isISO8601()
      .withMessage("Date of birth is required and must be a valid date"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, dob } = req.body; //body destructuring
    try {
      // Check if user with the same email already exists
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      //hashing passwords
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt); //gensalt generates salt and add it to the hash value created by hash function

      // If email is unique, create the user
      const newUser = new User({ name, email, password: hashedPassword, dob });

      await newUser.save(); // saves user into database

      const payload = {
        user: {
          id: newUser.id,
        },
      };

      const jwttoken = jwt.sign(payload, JWT_SECRET);

      res.json({ jwttoken });
      //res.json(newUser);  //returns response of request(req)
    } catch (err) {
      console.error("Error saving user:", err);
      res.status(400).json({ error: err.message });
    }
  }
);

// route 2   POST :  authentication using login creds
// end point: /api/auth/createUser/login
router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; //body destructuring

    try {
      //checking if user exist
      const newUser = await User.findOne({ email });

      if (!newUser) {
        return res.status(400).json({ error: "Wrong credentials" });
      }

      // comparing entered password and database password

      const passwordCompare = await bcrypt.compare(password, newUser.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Wrong credentials" });
      }

      const payload = {
        user: {
          id: newUser.id,
        },
      };
      const jwttoken = jwt.sign(payload, JWT_SECRET);

      res.json({ jwttoken });
    } catch (err) {
      console.error("Error saving user:", err);
      res.status(400).json({ error: err.message });
    }
  }
);

//Route 3: end point api/auth/getuser

//authentication while fetching user details

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send({ user });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(400).json({ error: err.message });
  }
});
module.exports = router;
