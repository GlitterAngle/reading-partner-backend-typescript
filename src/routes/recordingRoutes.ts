import Router from 'express';
import { createNewRecording, getAllUserRecordings, getSingleScript } from '../controllers/recordingController';
import isLoggedIn from '../middleware/isLoggedIn';
import upload from '../middleware/upload.js';

const router = Router();

// this is for testing
// router.get('/', getAllRecordings);

router.get('/:id', getAllUserRecordings)

router.get('/side/:id', getSingleScript)

router.post('/recordings', upload.fields([
  { name: 'actorAudio'},
  { name: 'readerAudio'}
]), createNewRecording);

export default router;
