
require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/app'));
app.use(bodyParser.json());

// Forbids a user to go to endpoints by changing link in the browser
app.use((req, res, next) => {
  if (!req.headers.referer || !req.headers.referer.startsWith(process.env.API_URL)) {
    return res.status(403).json({ error: 'Access forbidden' });
  }
  next();
});

let users = [
  { "username": "jdoe1990", "firstName": "John", "lastName": "Doe", "email": "johndoe@mail.com", "type": "Driver", "password": '11111111a', "repeatPassword": '11111111a' },
  { "username": "asmith1985", "firstName": "Alice", "lastName": "Smith", "email": "alice.smith@mail.com", "type": "Driver", "password": '11111111a', "repeatPassword": '11111111a' },
  { "username": "bwilson92", "firstName": "Bob", "lastName": "Wilson", "email": "bob.wilson@mail.com", "type": "Admin", "password": '11111111a', "repeatPassword": '11111111a' },
  { "username": "cjohnson88", "firstName": "Charlie", "lastName": "Johnson", "email": "charlie.j@mail.com", "type": "Driver", "password": '11111111a', "repeatPassword": '11111111a' },
  { "username": "dthomas79", "firstName": "David", "lastName": "Thomas", "email": "david.t@mail.com", "type": "Driver", "password": '11111111a', "repeatPassword": '11111111a' },
  { "username": "ejackson81", "firstName": "Emma", "lastName": "Jackson", "email": "emma.j@mail.com", "type": "Driver", "password": '11111111a', "repeatPassword": '11111111a' },
  { "username": "fanderson87fanderson87fanderson87fanderson87fanderson87fanderson87fanderson87fanderson87fanderson87fanderson87fanderson87fanderson87fanderson87", "firstName": "Frank", "lastName": "Anderson", "email": "frank.a@mail.com", "type": "Driver", "password": '11111111a', "repeatPassword": '11111111a' },
  { "username": "gwhite93", "firstName": "Grace", "lastName": "White", "email": "grace.w@mail.com", "type": "Admin", "password": '11111111a', "repeatPassword": '11111111a' },
  { "username": "hhall76", "firstName": "Hannah", "lastName": "Hall", "email": "hannah.h@mail.com", "type": "Driver", "password": '11111111a', "repeatPassword": '11111111a' },
  { "username": "ijames90", "firstName": "Isaac", "lastName": "James", "email": "isaac.j@mail.com", "type": "Driver", "password": '11111111a', "repeatPassword": '11111111a' },
  { "username": "jkent95", "firstName": "Jack", "lastName": "Kent", "email": "jack.k@mail.com", "type": "Driver", "password": '11111111a', "repeatPassword": '11111111a' },
  { "username": "kmiller89", "firstName": "Karen", "lastName": "Miller", "email": "karen.m@mail.com", "type": "Driver", "password": '11111111a', "repeatPassword": '11111111a' },
  { "username": "lmartin86", "firstName": "Luke", "lastName": "Martin", "email": "luke.mluke.mluke.mluke.mluke.mluke.mluke.mluke.mluke.mluke.mluke.m@mail.com", "type": "Driver", "password": '11111111a', "repeatPassword": '11111111a' },
  { "username": "mmorris77", "firstName": "Megan", "lastName": "Morris", "email": "megan.m@mail.com", "type": "Admin", "password": '11111111a', "repeatPassword": '11111111a' },
  { "username": "nroberts82", "firstName": "Noah", "lastName": "Roberts", "email": "noah.r@mail.com", "type": "Driver", "password": '11111111a', "repeatPassword": '11111111a' },
  { "username": "owright84", "firstName": "Olivia", "lastName": "Wright", "email": "olivia.w@mail.com", "type": "Driver", "password": '11111111a', "repeatPassword": '11111111a' },
  { "username": "pbailey91", "firstName": "Paul", "lastName": "Bailey", "email": "paul.b@mail.com", "type": "Driver", "password": '11111111a', "repeatPassword": '11111111a' },
  { "username": "qscott83", "firstName": "Quinn", "lastName": "Scott", "email": "quinn.s@mail.com", "type": "Driver", "password": '11111111a', "repeatPassword": '11111111a' },
  { "username": "rlee80", "firstName": "Rachel", "lastName": "Lee", "email": "rachel.l@mail.com", "type": "Driver", "password": '11111111a', "repeatPassword": '11111111a' },
  { "username": "scooper78", "firstName": "Samuel", "lastName": "Cooper", "email": "samuel.c@mail.com", "type": "Admin", "password": '11111111a', "repeatPassword": '11111111a' }
];

// Validation Functions
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
const validateUserType = (type) => ['Admin', 'Driver'].includes(type);

// Middleware for validation
const validateUserData = (user, currentUsername = null) => {
  const { username, firstName, lastName, email, password, type } = user;
  
  if (!username || !firstName || !lastName || !email || !password || !type) {
    return 'All fields are required';
  }
  
  // Check if the username is being updated and validate only if it's different
  if (currentUsername !== username && users.some(existingUser => existingUser.username === username)) {
    return 'User with such username already exists';
  }
  
  if (!validateEmail(email)) {
    return 'Invalid email address';
  }
  
  if (!validatePassword(password)) {
    return 'Password must be at least 8 characters long, and contain at least one letter and one number';
  }

  if (!validateUserType(type)) {
    return 'User type must be either "Admin" or "Driver"';
  }

  return null;
};

// 1) Get list of users
app.get('/api/v1.0/users', (req, res) => {
  res.json(users);
});

// 2) Create a new user
app.post('/api/v1.0/users', (req, res) => {
  const validationError = validateUserData(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const newUser = { ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 3) Update an existing user
app.put('/api/v1.0/users/:username', (req, res) => {
  const username = req.params.username;
  const userIndex = users.findIndex(user => user.username === username);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const validationError = validateUserData(req.body, username);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  users[userIndex] = { ...req.body, username };
  res.json(users[userIndex]);
});

// 4) Delete a user
app.delete('/api/v1.0/users/:username', (req, res) => {
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
