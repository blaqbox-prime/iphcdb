import {Schema, model, models} from 'mongoose';

import mongoose from 'mongoose';



const addressSchema = new Schema({
    street: String,
    suburb: String,
    city: String,
    province: String,
    postal_code: String,
});

const memberSchema = new Schema({
    firstNames: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    contact: {
        type: String,
        required: true,
    },
    dateOfBirth:{
        type: Date,
        required: true,
    },
    address: {
        type: addressSchema,
        required: true, 
    },
    employmentStatus: {
        type: String,
        required: true,
        default: 'Unemployed',
        enum: ['Employed','Self-Employed','Unemployed']
    },
    isSeekingWork: {
        type: Boolean,
        required: true,
        default: false,
    },
    isMarried: {
        type: Boolean,
        required: true,
        default: false
    },
    spouse: [mongoose.Types.ObjectId],
    children:[mongoose.Types.ObjectId],
    occupation: {
        type: Map,
        of: String
    },
    password: {
        type: String,
        min: 6,
        required: true,
    } 
}, {timestamps: true});

const MemberModel = models.Member || model('Member',memberSchema);

module.exports = {MemberModel};