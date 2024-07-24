import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())

const port = process.env.PORT;

const mongoConnect = async () => {
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Connected to Database".bgGreen.white);
    }).catch((error) => {
        console.log(error);
    })
}

mongoConnect();

const routesDirectory = "./routes";
fs.readdirSync(routesDirectory).map(fileName => {
    const routePath = path.join(routesDirectory, fileName);

    import('./' + routePath)
        .then(module => app.use('/api', module.default || module));
});


app.get("/", (req, res) => {
    res.send("<h1>Welcome</h1>");
})

app.listen(port, () => {
    console.log(`Server running on ${port}`.bgCyan.white);
})