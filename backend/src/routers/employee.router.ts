import { Router } from "express";
import { sample_foods, sample_tags } from "../data";
import asyncHandler from 'express-async-handler'
import { EmployeeModel } from "../models/employee.model";

const router = Router()

router.get("/",asyncHandler(
    async(req, res) => {
        const employee = await EmployeeModel.find()
    res.send(employee)
}))



export default router