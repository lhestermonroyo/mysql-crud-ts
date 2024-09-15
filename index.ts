import express from 'express';
import userRouter from './routes/user.route';
import noteRouter from './routes/note.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);
app.use('/note', noteRouter);

app.listen(3000, () => {
  try {
    console.log('🚀 Server started at port:', 3000);
  } catch (error) {
    console.error('❌ Error starting server:', error);
  }
});
