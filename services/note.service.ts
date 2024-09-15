import NoteModel from '../models/note.model';

class NoteService {
  async getNotes() {
    try {
      return await NoteModel.findAll();
    } catch (err) {
      throw err;
    }
  }

  async getNoteByUserId(userId: string) {
    try {
      return await NoteModel.find({ user_id: userId });
    } catch (error) {
      throw error;
    }
  }

  async getNoteById(id: string) {
    try {
      return await NoteModel.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async createNote(userId: string, note: any) {
    try {
      return await NoteModel.create(userId, note);
    } catch (error) {
      throw error;
    }
  }

  async updateNote(id: string, note: any) {
    try {
      return await NoteModel.update(id, note);
    } catch (error) {
      throw error;
    }
  }

  async deleteNote(id: string) {
    try {
      return await NoteModel.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default new NoteService();
