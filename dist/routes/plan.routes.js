import express from "express";
import { PlanModel } from "../models/plans.js";
export const PlanRouter = express.Router();
//create or add the plan management post request
PlanRouter.post("/", async (req, res) => {
    try {
        const payload = req.body;
        const Plan = await PlanModel.create(payload);
        res.status(201).json({
            message: "Plan Created successfully",
            Plans: Plan,
        });
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
        });
    }
});
//edit or update the plan management post request
PlanRouter.post("/:id/edit", async (req, res) => {
    try {
        const id = req.params.id;
        const update = req.body;
        const plan = await PlanModel.findByIdAndUpdate(id, update, {
            new: true,
            runValidators: true,
        });
        if (!plan) {
            return res.status(404).json({
                message: "plan not found",
            });
        }
        res.status(200).json({
            message: "Updated the plans sucessfully",
            Plan: plan,
        });
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
        });
    }
});
//delete the plan management delete request
PlanRouter.delete("/:id/delete", async (req, res) => {
    try {
        const id = req.params.id;
        const deletePlan = await PlanModel.findByIdAndDelete(id);
        res.status(200).json({
            message: "plan deleted sucessfully",
        });
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
        });
    }
});
//get all the plans
PlanRouter.get("/", async (req, res) => {
    try {
        const plan = await PlanModel.find();
        res.status(200).json({
            plan,
        });
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
        });
    }
});
//enable or disable the plan patch request
PlanRouter.patch("/:id/toggle", async (req, res) => {
    try {
        const { id } = req.params;
        const plan = await PlanModel.findById(id);
        if (!plan) {
            return res.status(404).json({
                message: "Plan not found ",
            });
        }
        plan.isActive = !plan.isActive;
        await plan.save();
        res.status(200).json({
            message: `plan has Isactive status changed`,
            plan,
        });
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
        });
    }
});
//# sourceMappingURL=plan.routes.js.map