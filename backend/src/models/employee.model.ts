import {Schema, model} from 'mongoose';

export const EmployeeSchema = new Schema(
    {
        firstname: {type: String, required:true},
        lastname: {type: Number, required:true},
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

export const EmployeeModel = model('employee', EmployeeSchema);
