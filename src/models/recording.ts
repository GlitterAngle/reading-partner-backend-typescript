import mongoose, {Schema} from 'mongoose'
import { RecordingInfo } from '../types/modelTypes'

const recordingSchema : Schema<RecordingInfo> = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    title: { type: String, required: true },
    scriptText: { type: String, required: true },
    cueWord: { type: String, required: true },
    actorAudioPath: { type: String, required: true },
    readerAudioPath: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

const Recording = mongoose.model('Recording', recordingSchema)

export default Recording 