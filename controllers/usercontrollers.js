const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { first_name, last_name, phone, address, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "Please enter the required fields." });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password);

    const newUser = {
      first_name,
      last_name,
      phone,
      address,
      email,
      password: hashedPassword,
    };

    await knex("users").insert(newUser);
    res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).json({ message: "Failed registration" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter the required fields" });
  }

  try {
    const user = await knex("users").where({ email }).first();
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await knex("users").where({ id: req.user.id }).first();
    if (user) delete user.password;
    res.json(user);
  } catch (error) {
    console.error("Fetch user error:", error);
    res.status(500).json({ message: "Unable to fetch user" });
  }
};
