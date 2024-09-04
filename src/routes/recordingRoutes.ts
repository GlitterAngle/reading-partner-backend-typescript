import Router from 'express';
import { createNewRecording, getAllRecordings } from '../controllers/recordingController';
import upload from '../middleware/upload.js';

const router = Router();

router.get('/', getAllRecordings);

router.post('/recordings', upload.fields([
  { name: 'actorAudio'},
  { name: 'readerAudio'}
]), createNewRecording);

export default router;
