import express from 'express';
import mongoose,{ Schema } from 'mongoose';
import env from 'dotenv';
import axios from 'axios';
import cors from 'cors';
import bodyParser from 'body-parser';

env.config()

const app = express();
const port = process.env.port || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.databaseLink,{ dbName: "Lonots_tech"}).then(() => {
    console.log("Connected to Database")
}).catch((err) => {
    console.log(err)
})

const db = mongoose.connection;
db.on('error',console.error.bind(console,"connection error"));
db.once('open',() => {
    console.log("Connted to the databse");
});


const assignmentSchema = new mongoose.Schema({
    id: Number,
    name: { type: String, required: true },
    description: String,
    tasks: [
        {
            id:Number,
            title: String,
            completed: { type: Boolean, default: false },
        },
    ],
    accepted: { type: Boolean, default: false },
},{
   collection:'Assignments',versionKey:false 
});

const Assignment = mongoose.model("Assignments",assignmentSchema);

app.get('/projects', async (req,res) => {
    try{
        const projectArr = await Assignment.find();
        res.json(projectArr);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
})


app.put('/update/:id',async (req,res) => {
    const { id } = req.params;
    const updateData = req.body;
    try{
        const updateAssignment =await Assignment.findOneAndUpdate(
            { id },
            updateData,
            { new : true }
        );

        if (!updateAssignment) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.json(updateAssignment);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Update Error' });
    }
})

app.listen(port, () => {
    console.log(`listing at port ${port}`)
})




