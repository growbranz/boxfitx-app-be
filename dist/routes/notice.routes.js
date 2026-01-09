import express from "express";
import { NoticeModel } from "../models/notices.js";
import { auth } from "../middleware/auth.js";
export const NoticeRouter = express.Router();
/* =========================
   CREATE NOTICE (ADMIN)
========================= */
NoticeRouter.post("/", auth(["admin"]), async (req, res) => {
    try {
        const notice = await NoticeModel.create(req.body);
        res.json({ message: "Notice created", notice });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to create notice" });
    }
});
/* =========================
   GET ACTIVE NOTICES (DASHBOARD)
========================= */
NoticeRouter.get("/", async (req, res) => {
    try {
        const now = new Date();
        const notices = await NoticeModel.find({
            visible: true,
            $or: [{ expiryDate: null }, { expiryDate: { $gte: now } }],
        })
            .sort({ priority: -1, createdAt: -1 })
            .limit(6);
        res.json({ data: notices });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch notices" });
    }
});
/* =========================
   UPDATE NOTICE (ADMIN)
========================= */
NoticeRouter.put("/:id", auth(["admin"]), async (req, res) => {
    try {
        const notice = await NoticeModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!notice) {
            return res.status(404).json({ message: "Notice not found" });
        }
        res.json({ message: "Notice updated", notice });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update notice" });
    }
});
/* =========================
   DELETE NOTICE (ADMIN)
========================= */
NoticeRouter.delete("/:id", auth(["admin"]), async (req, res) => {
    try {
        const notice = await NoticeModel.findByIdAndDelete(req.params.id);
        if (!notice) {
            return res.status(404).json({ message: "Notice not found" });
        }
        res.json({ message: "Notice deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete notice" });
    }
});
/* GET SINGLE NOTICE (ADMIN) */
/* GET SINGLE NOTICE (ADMIN) */
NoticeRouter.get("/:id", auth(["admin"]), async (req, res) => {
    const notice = await NoticeModel.findById(req.params.id);
    if (!notice) {
        return res.status(404).json({ message: "Notice not found" });
    }
    res.json({ notice });
});
//# sourceMappingURL=notice.routes.js.map