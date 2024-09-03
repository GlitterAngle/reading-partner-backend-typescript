import dotenv from 'dotenv'
dotenv.config()
import mongoose from "mongoose";
import { EnvironmentVariables } from '../types/dbTypes';

const {DATABASE_URI} = process.env as unknown as EnvironmentVariables;

const db = mongoose.connection

mongoose.connect(DATABASE_URI)

db.on('connected', function(){
    console.log(`Connected to MongoDB ${db.name} at ${db.host}: ${db.port}`)
})