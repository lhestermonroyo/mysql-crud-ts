import { v4 as uuidv4 } from 'uuid';

import query from '../lib/db';
import { formatColSet } from '../utils/common.util';

class NoteModel {
  private tableName: string;

  constructor() {
    this.tableName = 'notes';
  }

  findAll = async () => {
    try {
      const sql = `SELECT * FROM ${this.tableName}`;
      return await query(sql, []);
    } catch (error) {
      throw error;
    }
  };

  find = async (params: any) => {
    try {
      const { colSet, values } = formatColSet(params);

      const sql = `SELECT * FROM ${this.tableName} WHERE ${colSet}`;
      return await query(sql, [...values]);
    } catch (error) {
      throw error;
    }
  };

  findOne = async (params: any) => {
    try {
      const { colSet, values } = formatColSet(params);

      const sql = `SELECT * FROM ${this.tableName} WHERE ${colSet}`;
      const res: any = await query(sql, [...values]);

      return res[0];
    } catch (error) {
      throw error;
    }
  };

  create = async (userId: any, note: any) => {
    try {
      const id = uuidv4();
      const { title, content } = note;

      const sql = `INSERT INTO ${this.tableName} (id, user_id, title, content, status) VALUES (?, ?, ?, ?, ?)`;
      const values = [id, userId, title, content, status];

      const res: any = await query(sql, values);
      const affectedRows = res ? res.affectedRows : 0;

      return affectedRows;
    } catch (error) {
      throw error;
    }
  };

  update = async (id: any, note: any) => {
    try {
      const { colSet, values } = formatColSet(note);

      const sql = `UPDATE ${this.tableName} SET ${colSet} WHERE id = ?`;
      const res: any = await query(sql, [...values, id]);

      return res;
    } catch (error) {
      throw error;
    }
  };

  delete = async (id: any) => {
    try {
      const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
      const res: any = await query(sql, [id]);
      const affectedRows = res ? res.affectedRows : 0;

      return affectedRows;
    } catch (error) {
      throw error;
    }
  };
}

export default new NoteModel();
