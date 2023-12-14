import {Schema, model} from 'mongoose';

export interface Employee{
    firstname:string;
    lastname: string;
    birthdate: Date;
    gender:string;
    education: string;
    profile: string;
    company: string;
    jobExperience: number;
    salary:number;

}

export const EmployeeSchema = new Schema<Employee>(
    {
        firstname: {type: String, required:true},
        lastname: {type: String, required:true},
        birthdate: {type: Date},
        gender: {type: String},
        education: {type: String, required:true},
        profile: {type: String, required:true},
        company: {type: String, required:true},
        jobExperience: {type: Number, required:true},
        salary: {type: Number, required:true},

    },{
        timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
    }
);

export const EmployeeModel = model<Employee>('employee', EmployeeSchema);
