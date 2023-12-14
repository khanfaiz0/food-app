import { Router } from "express";
import { sample_foods, sample_employees } from "../data";
import asyncHandler from 'express-async-handler'
import { EmployeeModel ,Employee } from "../models/employee.model";
import { log } from "console";

const router = Router()

router.get("/seed",asyncHandler(
    async(req, res) => {
        const foodsCount = await EmployeeModel.countDocuments();
        if(foodsCount > 0){
        res.send("seed is already done!");
        return;
    }
        console.log("faizan");
        
        await EmployeeModel.create(sample_employees);
        res.send("seed is done");
}))


router.get("/",asyncHandler(
    async(req, res) => {
        const employee = await EmployeeModel.find()
    res.send(employee)
}))

router.post('/create',asyncHandler(
    async(req,res)=>{
        const {firstname, lastname, birthdate, gender, education, profile, company, jobExperience, salary} =req.body
        const user = await EmployeeModel.findOne({firstname});
        if(user){
            res.status(400).send("User already exist!");
            return;
        }

        

        const newEmp:Employee ={
            firstname,
            lastname,
            birthdate,
            gender,
            education,
            profile,
            company,
            jobExperience,
            salary
        }

        const dbUser = await EmployeeModel.create(newEmp);
        console.log(dbUser);
        return
        

    }
  ))

  router.delete('/:id', asyncHandler(
    async (req, res) => {
    const { id } = req.params;
  
    try {
      // Use findByIdAndDelete to delete the employee by ID
      const deletedEmployee = await EmployeeModel.findByIdAndDelete(id);
  
      if (deletedEmployee) {
        res.status(200).json({ message: 'Employee deleted successfully', data: deletedEmployee });
      } else {
        res.status(404).json({ message: 'Employee not found' });
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  ));
  



export default router