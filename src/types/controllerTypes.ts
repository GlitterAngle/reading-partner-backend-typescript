import { Express } from "express"

export interface CustomeFileRecording extends Express.Multer.File{
    location: string
}

