import jwt from "jsonwebtoken";
import { JWT_ADMIN_PASSWORD } from "../config/config.js";
import type { AuthPayload } from "../types/jwt.js";

export const auth = (roles: ("admin" | "member")[] = []) => {
  return (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD) as AuthPayload;

      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
