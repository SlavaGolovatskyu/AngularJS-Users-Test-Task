const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();

// In-memory user data
let users = [
  { "username": "jdoe1990", "firstName": "John", "lastName": "Doe", "email": "johndoe@mail.com", "type": "User" },
  { "username": "asmith1985", "firstName": "Alice", "lastName": "Smith", "email": "alice.smith@mail.com", "type": "User" },
  { "username": "bwilson92", "firstName": "Bob", "lastName": "Wilson", "email": "bob.wilson@mail.com", "type": "Administrator" },
  { "username": "cjohnson88", "firstName": "Charlie", "lastName": "Johnson", "email": "charlie.j@mail.com", "type": "User" },
  { "username": "dthomas79", "firstName": "David", "lastName": "Thomas", "email": "david.t@mail.com", "type": "Moderator" },
  { "username": "ejackson81", "firstName": "Emma", "lastName": "Jackson", "email": "emma.j@mail.com", "type": "User" },
  { "username": "fanderson87fanderson87fanderson87fanderson87fanderson87fanderson87fanderson87fanderson87fanderson87fanderson87fanderson87fanderson87fanderson87", "firstName": "Frank", "lastName": "Anderson", "email": "frank.a@mail.com", "type": "User" },
  { "username": "gwhite93", "firstName": "Grace", "lastName": "White", "email": "grace.w@mail.com", "type": "Administrator" },
  { "username": "hhall76", "firstName": "Hannah", "lastName": "Hall", "email": "hannah.h@mail.com", "type": "User" },
  { "username": "ijames90", "firstName": "Isaac", "lastName": "James", "email": "isaac.j@mail.com", "type": "User" },
  { "username": "jkent95", "firstName": "Jack", "lastName": "Kent", "email": "jack.k@mail.com", "type": "Moderator" },
  { "username": "kmiller89", "firstName": "Karen", "lastName": "Miller", "email": "karen.m@mail.com", "type": "User" },
  { "username": "lmartin86", "firstName": "Luke", "lastName": "Martin", "email": "luke.mluke.mluke.mluke.mluke.mluke.mluke.mluke.mluke.mluke.mluke.m@mail.com", "type": "User" },
  { "username": "mmorris77", "firstName": "Megan", "lastName": "Morris", "email": "megan.m@mail.com", "type": "Administrator" },
  { "username": "nroberts82", "firstName": "Noah", "lastName": "Roberts", "email": "noah.r@mail.com", "type": "User" },
  { "username": "owright84", "firstName": "Olivia", "lastName": "Wright", "email": "olivia.w@mail.com", "type": "User" },
  { "username": "pbailey91", "firstName": "Paul", "lastName": "Bailey", "email": "paul.b@mail.com", "type": "Moderator" },
  { "username": "qscott83", "firstName": "Quinn", "lastName": "Scott", "email": "quinn.s@mail.com", "type": "User" },
  { "username": "rlee80", "firstName": "Rachel", "lastName": "Lee", "email": "rachel.l@mail.com", "type": "User" },
  { "username": "scooper78", "firstName": "Samuel", "lastName": "Cooper", "email": "samuel.c@mail.com", "type": "Administrator" }
];

app.use(bodyParser.json());

// Validation Functions
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
const validateUserType = (type) => ['Admin', 'Driver'].includes(type);

// Middleware for validation
const validateUserData = (user) => {
  const { username, firstName, lastName, email, password, user_type } = user;
  
  if (!username || !firstName || !lastName || !email || !password || !user_type) {
    return 'All fields are required';
  }
  
  if (users.some(existingUser => existingUser.username === username)) {
    return 'Username must be unique';
  }
  
  if (!validateEmail(email)) {
    return 'Invalid email address';
  }
  
  if (!validatePassword(password)) {
    return 'Password must be at least 8 characters long, and contain at least one letter and one number';
  }

  if (!validateUserType(user_type)) {
    return 'User type must be either "Admin" or "Driver"';
  }

  return null;
};

// 1) Get list of users
app.get('api/v1.0/users', (req, res) => {
  res.json(users);
});

// 2) Create a new user
app.post('api/v1.0/users', (req, res) => {
  const validationError = validateUserData(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const newUser = { ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 3) Update an existing user
app.put('api/v1.0/users/:username', (req, res) => {
  const username = req.params.username;
  const userIndex = users.findIndex(user => user.username === username);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const validationError = validateUserData(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  users[userIndex] = { ...req.body, username };
  res.json(users[userIndex]);
});

// 4) Delete a user
app.delete('api/v1.0/users/:username', (req, res) => {
  const username = req.params.username;
  const userIndex = users.findIndex(user => user.username === username);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser[0]);
});

// Start the server
const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
