import express from "express";
import { TrainerModel } from "../models/trainers.js";
import { auth } from "../middleware/auth.js";

export const TrainerRouter = express.Router();

/**
 * POST /api/trainers
 * Create trainer (Admin only)
 */
TrainerRouter.post("/", auth(["admin"]), async (req, res) => {
  try {
    const trainer = await TrainerModel.create(req.body);
    res.status(201).json({
      message: "Trainer created successfully",
      trainer,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * GET /api/trainers
 * List trainers with filters
 */
TrainerRouter.get("/", auth(["admin"]), async (req, res) => {
  try {
    const { status, archived = "false", search } = req.query;

    const query: any = {
      archived: archived === "true",
    };

    if (status) query.status = status;

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const trainers = await TrainerModel.find(query).sort("-createdAt");

    res.status(200).json({
      total: trainers.length,
      data: trainers,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * GET /api/trainers/:id
 * Single trainer profile
 */
TrainerRouter.get("/:id", auth(["admin"]), async (req, res) => {
  try {
    const trainer = await TrainerModel.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    res.json(trainer);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * POST /api/trainers/:id
 * Update trainer
 */
TrainerRouter.post("/:id", auth(["admin"]), async (req, res) => {
  try {
    const trainer = await TrainerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    res.json({
      message: "Trainer updated successfully",
      trainer,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * PATCH /api/trainers/:id/archive
 * Archive trainer (soft delete)
 */
TrainerRouter.patch("/:id/archive", auth(["admin"]), async (req, res) => {
  try {
    const trainer = await TrainerModel.findByIdAndUpdate(
      req.params.id,
      { archived: true },
      { new: true }
    );

    res.json({
      message: "Trainer archived",
      trainer,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * PATCH /api/trainers/:id/toggle
 * Activate / Inactivate trainer
 */
TrainerRouter.patch("/:id/toggle", auth(["admin"]), async (req, res) => {
  try {
    const trainer = await TrainerModel.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    trainer.status = trainer.status === "active" ? "inactive" : "active";
    await trainer.save();

    res.json({
      message: "Trainer status updated",
      trainer,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});
