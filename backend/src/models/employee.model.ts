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
        firstname: {type: String},
        lastname: {type: String},
        birthdate: {type: Date},
        gender: {type: String},
        education: {type: String},
        profile: {type: String},
        company: {type: String},
        jobExperience: {type: Number},
        salary: {type: Number},

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
