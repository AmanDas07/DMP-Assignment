import userModel from '../models/userModel.js'
import { hashed, comparePassword } from '../utils/helpers.js';
import jwt from 'jsonwebtoken';

export const registerController = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!name) {
        return res.status(400).send("Name is Required");
    }

    if (!email) {
        return res.status(400).send("Email is Required");
    }

    if (!password) {
        return res.status(400).send("Password is Required");
    }
    //[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$

    const isValidEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    }

    if (!isValidEmail(email)) {
        return response.status(400).send("Invalid Email");
    }

    if (password.length < 8) {
        return response.status(400).send("Password too short");
    }

    try {

        const save = async () => {
            const exist = await userModel.findOne({ email: email });
            if (exist) {
                return res.status(400).send("Email already Registered");
            }
            else {
                const hashedPassword = await hashed(password);
                const user = new userModel({ name, email, password: hashedPassword });
                await user.save().then(() => {
                    return res.status(200).send('User Registered');
                })
            }
        }

        save();
    } catch (error) {

    }


}


export const loginController = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await userModel.findOne({ email: email });

        if (!user) { return res.status(400).send("Invalid User") };
        const match = await comparePassword(password, user.password);
        if (!match) { return res.status(400).send("Invalid Credentials") }


        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        user.password = undefined;


        return res.status(200).json({
            token,
            user,
        })


    } catch (error) {
        console.log(error);
        return res.status(400).send("Error, Try Again")
    }
}