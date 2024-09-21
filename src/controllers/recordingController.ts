import Recording from "../models/recording";
import { Request, Response } from "express";
import { CustomeFileRecording } from "../types/controllerTypes";
// import mongoose from "mongoose";


//this get all is for testing
const getAllRecordings = async (req: Request, res: Response) : Promise<Response>=> {
  try {
    const recordings = await Recording.find();
    return res.status(200).json(recordings);
  } catch (error) {
    if(error instanceof Error){
        return res.status(500).json({message: error.message})
    }else{
       return res.status(500).json({message: "Unknown Error Occured"})
    }
  }
};

const getAllUserRecordings = async (req: Request, res: Response) : Promise<Response>=> {
  try {
    const userid = req.params.id
    const recordings = await Recording.find({user: userid});
    return res.status(200).json(recordings);
  } catch (error) {
    if(error instanceof Error){
        return res.status(500).json({message: error.message})
    }else{
       return res.status(500).json({message: "Unknown Error Occured"})
    }
  }
};

const getSingleScript = async (req: Request, res: Response): Promise<Response> =>{
  console.log('route hit')
  try{
    const recordingId = req.params.id
    const recordings = await Recording.find({_id: recordingId});
    return res.status(200).json(recordings);
  }catch(error){
    if(error instanceof Error){
      return res.status(500).json({message: error.message})
    }else{
      return res.status(500).json({message: "Unknonw Error Occured"})
    }
  }
}

const createNewRecording = async (req: Request, res: Response): Promise<Response> => {
  try {
    //type cast req.files as what you exprect to recieve customeFileRecording extends express.multer.file
    const files= req.files as {[fieldname: string]: CustomeFileRecording[]}

    const { user, title, scriptText, cueWord } = req.body;
    //adjust from only storing the first url to storing all file urls in an array
    const actorAudioPath = files?.actorAudio?.map(file=>file.location)||[];
    const readerAudioPath = files?.readerAudio?.map(file=>file.location)||[];

    //removed this because it's ok to have just one audio file depending on script
    // if (!actorAudioPath || !readerAudioPath) {
    //   return res.status(400).json({ message: "Required files are missing" });
    // }

    const recording = new Recording({
      user,
      title,
      scriptText,
      cueWord,
      //store the array of audio paths
      actorAudioPath: actorAudioPath,
      readerAudioPath: readerAudioPath,
    });

    await recording.save();
    return res.status(201).json(recording);
  } catch (error) {
    if(error instanceof Error){
        return res.status(500).json({ message: error.message });
    }else{
        return res.status(500).json({message: "Unknown Error Occured "})
    }
  }
};

const editRecording = async(req: Request, res: Response):Promise<Response>=>{
  try {
    const recordingToEdit = req.params.id
    const audioPayload = req.files as {[fieldname: string]: CustomeFileRecording[]}
    const recordingEdit = await Recording.findOneAndUpdate({_id: recordingToEdit}, audioPayload, {new: true})
    return res.status(200).json({
      recordingEdit
    })
  } catch (error) {
    if(error instanceof Error){
      return res.status(500).json({
        message: 'Error editing audio',
        error: error.message
      })
    } else {
      return res.status(500).json({
        message: 'Unknown error occured'
      })
    }
  }
}

const deleteSide = async (req: Request,res: Response):Promise<Response>=>{
    try {
        const sideId = req.params.id
        const deleteSide = await Recording.findByIdAndDelete(sideId)
        return res.status(200).json({
          deleteSide
        })
    } catch (error) {
        if(error instanceof Error){
          return res.status(500).json({
            message: 'Error deleting side',
            error: error.message
          })
        }else{
          return res.status(500).json({
            message: 'Unknown error occured'
          })
        }
    }
}

export { 
  createNewRecording, 
  getAllUserRecordings, 
  getSingleScript, 
  editRecording, 
  deleteSide,
  getAllRecordings
};
