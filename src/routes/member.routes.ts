import express from "express";
import { MemberModel } from "../models/members.js";
import ExcelJS from "exceljs";
import { userModel } from "../models/user.js";
import bcrypt from "bcryptjs";
import { auth } from "../middleware/auth.js";

export const MemberRouter = express.Router();

//member creation post req (/api/members)

MemberRouter.post("/", auth(["admin"]), async (req, res) => {
  try {
    const payload = req.body;
    const member = await MemberModel.create(payload);
    res.status(201).json({
      message: "Member Created Successfully",
      member,
    });
  } catch (e: any) {
    res.status(500).json({
      error: e.message,
    });
  }
});
//create the login for the member
MemberRouter.post("/create-member-login", auth(["admin"]), async (req, res) => {
  try {
    const { memberId, password } = req.body;
    const member = await MemberModel.findById(memberId);
    if (!member) {
      return res.status(404).json({
        message: "No Member Found",
      });
    }
    const existing = await userModel.findOne({ email: member.email });
    if (existing) {
      return res.status(400).json({
        message: "login already exists",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const User = await userModel.create({
      email: member.email,
      password: hash,
      role: "member",
      member: member._id,
    });
    res.status(201).json({
      message: "Member Login Created Succesfully",
      User,
    });
  } catch (e: any) {
    res.status(500).json({
      erro: e.message,
    });
  }
});

//member update or edit post request (/api/members/:id)

MemberRouter.post("/:id", auth(["admin"]), async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const MemberFind = await MemberModel.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
    if (!MemberFind) {
      return res.status(404).json({
        message: "Member Not found",
      });
    }
    res.status(200).json({
      message: "updated member",
      MemberFind,
    });
  } catch (e: any) {
    res.status(500).json({
      error: e.message,
    });
  }
});

//get the single member using the Id  get request(/api/member/:id)

MemberRouter.get("/:id", auth(["admin"]), async (req, res) => {
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
  } catch (e: any) {
    res.status(500).json({
      error: e.message,
    });
  }
});

// archieve the member (soft delete) patch request
MemberRouter.patch("/:id/archive", auth(["admin"]), async (req, res) => {
  try {
    const id = req.params.id;
    const Member = await MemberModel.findByIdAndUpdate(
      id,
      { archived: true },
      { new: true }
    );
    if (!Member) {
      return res.status(404).json({
        message: "Member Not Found",
      });
    }
    res.status(200).json({
      Member: Member,
    });
  } catch (e: any) {
    res.status(500).json({
      error: e.message,
    });
  }
});

//assign the membership plans (or) set start/end date payment

MemberRouter.post("/:id/assign", auth(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    const { planType, startDate, expiryDate, paymentMode } = req.body;

    const member = await MemberModel.findById(id);
    if (!member) {
      return res.status(404).json({ message: "No Member Found" });
    }

    const membershipUpdate: any = {};

    if (planType) membershipUpdate.planType = planType;
    if (startDate) membershipUpdate.startDate = new Date(startDate);
    if (expiryDate) membershipUpdate.expiryDate = new Date(expiryDate);
    if (paymentMode) membershipUpdate.paymentMode = paymentMode;

    member.membership = {
      ...member.membership,
      ...membershipUpdate,
    };

    await member.save();

    res.status(200).json({
      message: "Membership assigned successfully",
      member,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * GET /api/members
 * Advanced member listing with filters, search & pagination
 */
MemberRouter.get("/", auth(["admin"]), async (req, res) => {
  try {
    const {
      search,
      planType,
      status,
      archived = "false",
      page = "1",
      limit = "20",
      sort = "-createdAt",
      minAge,
      maxAge,
      gender,
      year,
      month,
    } = req.query;

    // ✅ Build MongoDB query safely
    const query: any = {};

    // Archived filter
    query.archived = archived === "true";

    // Search filter (name, phone, email)
    if (search) {
      const s = search.toString().trim();

      // check if search is numeric (phone search)
      const isNumberSearch = /^[0-9]+$/.test(s);

      if (isNumberSearch) {
        query.number = Number(s);
      } else {
        query.$or = [
          { fullName: { $regex: s, $options: "i" } },
          { email: { $regex: s, $options: "i" } },
        ];
      }
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
        query.dob.$gte = new Date(
          now.getFullYear() - Number(maxAge),
          now.getMonth(),
          now.getDate()
        );
      }

      if (minAge) {
        query.dob.$lte = new Date(
          now.getFullYear() - Number(minAge),
          now.getMonth(),
          now.getDate()
        );
      }
    }

    /* ---------------- YEAR & MONTH FILTER ---------------- */
    if (year) {
      const y = Number(year);
      let startDate = new Date(y, 0, 1); // Jan 1
      let endDate = new Date(y + 1, 0, 1); // Jan 1 next year

      if (month) {
        const m = Number(month) - 1; // JS month = 0 based
        startDate = new Date(y, m, 1);
        endDate = new Date(y, m + 1, 1);
      }

      query["membership.startDate"] = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    // Pagination
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch members
    const members = await MemberModel.find(query)
      .sort(sort as string)
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
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      error: e.message,
    });
  }
});

//export using the excel js

MemberRouter.get("/export/excel", auth(["admin"]), async (req, res) => {
  try {
    const {
      search,
      planType,
      status,
      archived = "false",
      gender,
      year,
      month,
    } = req.query;

    const query: any = {};

    // Archived
    query.archived = archived === "true";

    // Search
    if (search) {
      const s = search.toString().trim();
      const isNumberSearch = /^[0-9]+$/.test(s);

      if (isNumberSearch) {
        query.number = Number(s);
      } else {
        query.$or = [
          { fullName: { $regex: s, $options: "i" } },
          { email: { $regex: s, $options: "i" } },
        ];
      }
    }

    // Filters
    if (planType) query["membership.planType"] = planType;
    if (status) query.status = status;
    if (gender) query.gender = gender;

    // Year & Month
    if (year) {
      const y = Number(year);
      let startDate = new Date(y, 0, 1);
      let endDate = new Date(y + 1, 0, 1);

      if (month) {
        const m = Number(month) - 1;
        startDate = new Date(y, m, 1);
        endDate = new Date(y, m + 1, 1);
      }

      query["membership.startDate"] = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    const members = await MemberModel.find(query).lean({ virtuals: true });

    /* ---------------- EXCEL ---------------- */

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Members");

    worksheet.columns = [
      { header: "Full Name", key: "fullName", width: 25 },
      { header: "Gender", key: "gender", width: 10 },
      { header: "Phone", key: "number", width: 15 },
      { header: "Email", key: "email", width: 30 },
      { header: "Plan Type", key: "planType", width: 15 },
      { header: "Start Date", key: "startDate", width: 15 },
      { header: "Expiry Date", key: "expiryDate", width: 15 },
      { header: "Status", key: "status", width: 12 },
      { header: "Payment Mode", key: "paymentMode", width: 15 },
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
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=members_filtered.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});
