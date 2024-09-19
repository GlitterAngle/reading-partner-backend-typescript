import Router from 'express';
import { createNewRecording, getAllRecordings } from '../controllers/recordingController';
import isLoggedIn from '../middleware/isLoggedIn';
import upload from '../middleware/upload.js';

const router = Router();

router.get('/', getAllRecordings);

router.post('/recordings', isLoggedIn, upload.fields([
  { name: 'actorAudio'},
  { name: 'readerAudio'}
]), createNewRecording);

export default router;
