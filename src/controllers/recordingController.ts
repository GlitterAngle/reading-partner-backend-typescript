import Recording from "../models/recording";
import { Request, Response } from "express";
import { CustomeFileRecording } from "../types/controllerTypes";


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

const createNewRecording = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);

    //type cast req.files as what you exprect to recieve customeFileRecording extends express.multer.file
    const files= req.files as {[fieldname: string]: CustomeFileRecording[]}

    const { user, title, scriptText, cueWord } = req.body;
    const actorAudioPath = files.actorAudio[0].location;
    const readerAudioPath = files.readerAudio[0].location;

    const recording = new Recording({
      user,
      title,
      scriptText,
      cueWord,
      actorAudioPath,
      readerAudioPath,
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

const deleteRecording = async (req: Request,res: Response)=>{
    try {
        const recordingToDelete = req.params.user
        
    } catch (error) {
        
    }
}

export { createNewRecording, getAllRecordings, deleteRecording };
