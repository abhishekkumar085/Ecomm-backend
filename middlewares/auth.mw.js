import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { secret } from '../configs/auth.config.js';

const verifySignUpBody = async (req, res, next) => {
  try {
    // Check for the name
    if (!req.body.name) {
      return res.status(400).send({
        message: 'Failed ! Name was not provided in request body',
      });
    }

    // Check for the email
    if (!req.body.email) {
      return res.status(400).send({
        message: 'Failed ! Email was not provided in request body',
      });
    }

    // Check for the userId
    if (!req.body.userId) {
      return res.status(400).send({
        message: 'Failed ! userId was not provided in request body',
      });
    }

    // Check if the user with the same userId is already present
    const user = await User.findOne({ userId: req.body.userId });

    if (user) {
      return res.status(400).send({
        message: 'Failed ! user with the same userId is already present',
      });
    }

    next();
  } catch (err) {
    console.log('Error while validating the request object', err);
    res.status(500).send({
      message: 'Error while validating the request body',
    });
  }
};

const verifySignInBody = async (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).send({
      message: 'userId is not provided',
    });
  }
  if (!req.body.password) {
    return res.status(400).send({
      message: 'password is not provided',
    });
  }
  next();
};

//  * Middleware to verify if the JWT token is valid

const verifyToken = (req, res, next) => {
  // Check if the Authorization header is present
  const authorizationHeader = req.headers['authorization'];

  if (!authorizationHeader) {
    return res.status(403).send({
      message: 'No Authorization header found : Unauthorized',
    });
  }

  // Split the Authorization header to get the token
  const [bearer, token] = authorizationHeader.split(' ');

  if (!token || bearer.toLowerCase() !== 'bearer') {
    return res.status(403).send({
      message: 'Invalid Authorization header format : Unauthorized',
    });
  }

  // If it's a valid token
  jwt.verify(token, secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized: Invalid token',
      });
    }
    const user = await User.findOne({ userId: decoded.id });
    if (!user) {
      return res.status(400).send({
        message: "Unauthorized: User for this token doesn't exist",
      });
    }
    // Set the user info in the req object
    req.user = user;
    next();
  });
};

//  * Middleware to check if the user is an ADMIN

const isAdmin = (req, res, next) => {
  const user = req.user;
  if (user && user.userType === 'ADMIN') {
    next();
  } else {
    return res.status(403).send({
      message: 'Only ADMIN users are allowed to access this endpoint',
    });
  }
};

export { verifySignUpBody, verifySignInBody, verifyToken, isAdmin };
