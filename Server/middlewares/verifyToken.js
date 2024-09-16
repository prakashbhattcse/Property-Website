const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const headerToken = req.headers["authorization"];

    if (!headerToken) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const token = headerToken;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID from token to request object
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      errorMessage: "Invalid token!",
      isTokenExpires: true,
    });
  }
};

module.exports = { verifyToken };
