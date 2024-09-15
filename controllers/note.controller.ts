import { validationResult } from 'express-validator';

import NoteService from '../services/note.service';

class NoteController {
  async getNotes(req: any, res: any) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const notes = await NoteService.getNotes();
      return res.status(200).json(notes);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getNoteByUserId(req: any, res: any) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { userId } = req.params;

      const notes = await NoteService.getNoteByUserId(userId);
      return res.status(200).json(notes);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getNoteById(req: any, res: any) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { id } = req.params;

      const note = await NoteService.getNoteById(id);
      return res.status(200).json(note);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async createNote(req: any, res: any) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { userId } = req.params;

      const note = req.body;
      const affectedRows = await NoteService.createNote(userId, note);

      return res.status(201).json({ affectedRows });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updateNote(req: any, res: any) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const note = req.body;

      const result = await NoteService.updateNote(id, note);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async deleteNote(req: any, res: any) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const result = await NoteService.deleteNote(id);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new NoteController();
