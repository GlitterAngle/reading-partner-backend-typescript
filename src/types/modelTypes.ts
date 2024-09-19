import mongoose from 'mongoose'

export interface UserInfo {
    username: string,
    email: string,
    password: string;
}

export interface UserInfoModel extends UserInfo, mongoose.Document {
    comparePassword(trypassword: string): Promise<boolean>;
}

export interface RecordingInfo{
    user: mongoose.Schema.Types.ObjectId,
    title: string, 
    scriptText: string,
    cueWord: string,
    actorAudioPath: string,
    readerAudioPath: string,
    createdAt: Date
}