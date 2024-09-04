import Router from 'express';
import { createNewRecording, getAllRecordings } from '../controllers/recordingController';
import upload from '../middleware/upload.js';

const router = Router();

router.get('/', getAllRecordings);

router.post('/newRecording', upload.fields([
  { name: 'actorAudio', maxCount: 1 },
  { name: 'readerAudio', maxCount: 1 }
]), createNewRecording);

export default router;
