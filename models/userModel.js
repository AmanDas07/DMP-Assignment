import mongoose from 'mongoose'

const { Schema } = mongoose;

const userModel = new Schema({
    name: {
        type: "String",
        required: "true"
    },
    email: {
        type: "String",
        required: "true",
        unique: "true"
    },

    password: {
        type: "String",
        required: "true",
        unique: "true"
    }


}, { timestamps: true });

export default mongoose.model('Users', userModel);