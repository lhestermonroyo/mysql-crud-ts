import express from 'express';
import noteRouter from '../controllers/note.controller';
import { createNoteValidator } from '../middleware/validator.middleware';
import { checkAuth } from '../utils/auth.util';

const router = express.Router();

router.get('/', checkAuth, noteRouter.getNotes);
router.get('/:userId', checkAuth, noteRouter.getNoteByUserId);
router.get('/note/:id', checkAuth, noteRouter.getNoteById);
router.post('/:userId', checkAuth, createNoteValidator, noteRouter.createNote);
router.put('/:id', checkAuth, createNoteValidator, noteRouter.updateNote);
router.delete('/:id', checkAuth, noteRouter.deleteNote);

export default router;
