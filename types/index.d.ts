interface IUserPayload {
  email: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
}

interface IUser {
  id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  created_at: string;
}

interface INotePayload { 
  title: string;
  content: string;
}