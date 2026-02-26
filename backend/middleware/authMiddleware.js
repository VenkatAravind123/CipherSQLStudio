const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    if (!process.env.JWT_SECRET) return res.status(500).json({ message: "Server misconfigured" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const userId = payload?.sub;

    const user = await User.findById(userId).select("name email role");
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

exports.requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Forbidden" });
    next();
  };
};