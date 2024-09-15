import { v4 as uuidv4 } from 'uuid';

import query from '../lib/db';
import { formatColSet } from '../utils/common.util';

class UserModel {
  private tableName: string;

  constructor() {
    this.tableName = 'users';
  }

  findAll = async () => {
    try {
      const sql = `SELECT * FROM ${this.tableName}`;
      return await query(sql, []);
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

  create = async (user: any) => {
    try {
      const id = uuidv4();
      const { email, password, firstname, lastname, status } = user;

      const sql = `INSERT INTO ${this.tableName} (id, name, email, password, status) VALUES (?, ?, ?, ?, ?)`;
      const values = [id, email, password, firstname, lastname, status];

      const res: any = await query(sql, values);
      const affectedRows = res ? res.affectedRows : 0;

      return affectedRows;
    } catch (error) {
      throw error;
    }
  };

  update = async (params: any, email: string) => {
    try {
      const { colSet, values } = formatColSet(params);

      const sql = `UPDATE ${this.tableName} SET ${colSet} WHERE email = ?`;
      const res: any = await query(sql, [...values, email]);

      return res;
    } catch (error) {
      throw error;
    }
  };

  delete = async (email: string) => {
    try {
      const sql = `DELETE FROM ${this.tableName} WHERE email = ?`;
      const res: any = await query(sql, [email]);
      const affectedRows = res ? res.affectedRows : 0;

      return affectedRows;
    } catch (error) {
      throw error;
    }
  };
}

export default new UserModel();
