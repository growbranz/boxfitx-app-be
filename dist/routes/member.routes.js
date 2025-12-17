import express from "express";
import { MemberModel } from "../models/members.js";
import ExcelJS from "exceljs";
export const MemberRouter = express.Router();
//member creation post req (/api/members)
MemberRouter.post("/", async (req, res) => {
    try {
        const payload = req.body;
        const member = await MemberModel.create(payload);
        res.status(201).json({
            message: "Member Created Successfully",
            member,
        });
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
        });
    }
});
//member update or edit post request (/api/members/:id)
MemberRouter.post("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const update = req.body;
        const MemberFind = await MemberModel.findByIdAndUpdate(id, update);
        if (!MemberFind) {
            return res.status(404).json({
                message: "Member Not found",
            });
        }
        res.status(200).json({
            message: "updated member",
            MemberFind,
        });
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
        });
    }
});
//get the single member using the Id  get request(/api/member/:id)
MemberRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const member = await MemberModel.findById(id);
        if (!member) {
            return res.status(404).json({
                message: "No Member Found",
            });
        }
        res.status(200).json({
            Member: member,
        });
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
        });
    }
});
// archieve the member (soft delete) patch request
MemberRouter.patch("/:id/archive", async (req, res) => {
    try {
        const id = req.params.id;
        const Member = await MemberModel.findByIdAndUpdate(id, { archived: true }, { new: true });
        if (!Member) {
            return res.status(404).json({
                message: "Member Not Found",
            });
        }
        res.status(200).json({
            Member: Member,
        });
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
        });
    }
});
//assign the membership plans (or) set start/end date payment
MemberRouter.post("/:id/assign", async (req, res) => {
    try {
        const { id } = req.params;
        const { planType, startDate, expiryDate, paymentMode } = req.body;
        const member = await MemberModel.findById(id);
        if (!member) {
            return res.status(404).json({ message: "No Member Found" });
        }
        const membershipUpdate = {};
        if (planType)
            membershipUpdate.planType = planType;
        if (startDate)
            membershipUpdate.startDate = new Date(startDate);
        if (expiryDate)
            membershipUpdate.expiryDate = new Date(expiryDate);
        if (paymentMode)
            membershipUpdate.paymentMode = paymentMode;
        member.membership = {
            ...member.membership,
            ...membershipUpdate,
        };
        await member.save();
        res.status(200).json({
            message: "Membership assigned successfully",
            member,
        });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
});
/**
 * GET /api/members
 * Advanced member listing with filters, search & pagination
 */
MemberRouter.get("/", async (req, res) => {
    try {
        const { search, planType, status, archived = "false", page = "1", limit = "20", sort = "-createdAt", minAge, maxAge, gender, } = req.query;
        // ✅ Build MongoDB query safely
        const query = {};
        // Archived filter
        query.archived = archived === "true";
        // Search filter (name, phone, email)
        if (search) {
            const s = search.toString();
            query.$or = [
                { fullName: { $regex: s, $options: "i" } },
                { number: { $regex: s, $options: "i" } },
                { email: { $regex: s, $options: "i" } },
            ];
        }
        // Membership plan filter
        if (planType) {
            query["membership.planType"] = planType;
        }
        // Status filter
        if (status) {
            query.status = status;
        }
        // Gender filter
        if (gender) {
            query.gender = gender;
        }
        // Age filter → DOB range
        if (minAge || maxAge) {
            const now = new Date();
            query.dob = {};
            if (maxAge) {
                query.dob.$gte = new Date(now.getFullYear() - Number(maxAge), now.getMonth(), now.getDate());
            }
            if (minAge) {
                query.dob.$lte = new Date(now.getFullYear() - Number(minAge), now.getMonth(), now.getDate());
            }
        }
        // Pagination
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;
        // Fetch members
        const members = await MemberModel.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limitNumber)
            .lean({ virtuals: true });
        // Total count
        const total = await MemberModel.countDocuments(query);
        return res.status(200).json({
            success: true,
            data: members,
            meta: {
                total,
                page: pageNumber,
                limit: limitNumber,
                totalPages: Math.ceil(total / limitNumber),
            },
        });
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            error: e.message,
        });
    }
});
//export using the excel js
MemberRouter.get("/export/excel", async (req, res) => {
    try {
        const { archived = "false" } = req.query;
        const members = await MemberModel.find({
            archived: archived === "true",
        }).lean({ virtuals: true });
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Members");
        worksheet.columns = [
            { header: "Full Name", key: "fullName", width: 25 },
            { header: "Age", key: "age", width: 8 },
            { header: "Gender", key: "gender", width: 10 },
            { header: "Phone", key: "number", width: 15 },
            { header: "Email", key: "email", width: 30 },
            { header: "Plan Type", key: "planType", width: 15 },
            { header: "Start Date", key: "startDate", width: 15 },
            { header: "Expiry Date", key: "expiryDate", width: 15 },
            { header: "Status", key: "status", width: 12 },
            { header: "Payment Mode", key: "paymentMode", width: 15 },
            { header: "Height (cm)", key: "heightCm", width: 12 },
            { header: "Weight (kg)", key: "weightCm", width: 12 },
        ];
        members.forEach((m) => {
            worksheet.addRow({
                fullName: m.fullName,
                gender: m.gender,
                number: m.number,
                email: m.email,
                planType: m.membership?.planType || "",
                startDate: m.membership?.startDate
                    ? new Date(m.membership.startDate).toLocaleDateString()
                    : "",
                expiryDate: m.membership?.expiryDate
                    ? new Date(m.membership.expiryDate).toLocaleDateString()
                    : "",
                status: m.status,
                paymentMode: m.membership?.paymentMode || "",
                heightCm: m.heightCm,
                weightCm: m.weightCm,
            });
        });
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=members.xlsx");
        await workbook.xlsx.write(res);
        res.end();
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
});
//# sourceMappingURL=member.routes.js.map