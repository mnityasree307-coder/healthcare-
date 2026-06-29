const express = require('express');
const router = express.Router();

// Mock user database (in a real app, this would be a database)
const users = [
  {
    id: 1,
    name: 'Demo User',
    email: 'demo@healthcare.com',
    password: 'demo123' // In production, this would be hashed
  }
];

// Login endpoint
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ 
      success: false,
      message: 'Email and password are required' 
    });
  }

  // Find user
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ 
      success: false,
      message: 'Invalid email or password' 
    });
  }

  // Generate mock token (in production, use JWT)
  const token = 'mock-jwt-token-' + Date.now();

  // Return user data (exclude password)
  res.json({
    success: true,
    message: 'Login successful',
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    token
  });
});

// Register endpoint
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ 
      success: false,
      message: 'Name, email, and password are required' 
    });
  }

  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ 
      success: false,
      message: 'User with this email already exists' 
    });
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password // In production, hash this password
  };

  users.push(newUser);

  // Generate mock token
  const token = 'mock-jwt-token-' + Date.now();

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    },
    token
  });
});

// Logout endpoint
router.post('/logout', (req, res) => {
  // In a real app with JWT, you might want to blacklist the token
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

// Verify token endpoint
router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'No token provided' 
    });
  }

  // In production, verify the JWT token
  // For demo, just check if token exists
  if (token.startsWith('mock-jwt-token-')) {
    res.json({
      success: true,
      message: 'Token is valid'
    });
  } else {
    res.status(401).json({ 
      success: false,
      message: 'Invalid token' 
    });
  }
});

// Get current user endpoint
router.get('/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'No token provided' 
    });
  }

  // In production, decode JWT to get user ID
  // For demo, return the first user
  const user = users[0];

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

module.exports = router;
