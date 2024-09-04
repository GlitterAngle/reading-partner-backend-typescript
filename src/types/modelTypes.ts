import mongoose from 'mongoose'

export interface UserInfo {
    username: string,
    email: string,
    password: string;
}

export type PasswordCallback = (err:Error | null | undefined, isMatch:boolean) => void

export interface RecordingInfo{
    user: mongoose.Schema.Types.ObjectId,
    title: string, 
    scriptText: string,
    cueWord: string,
    actorAudioPath: string,
    readerAudioPath: string,
    createdAt: Date
}