import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { spawn } from 'child_process';
import multer from 'multer'
import path from 'path'
const app = express();
app.use(express.static('Files'))
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });
// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/ClusterOfColors', upload.single('file'), (req, res) => {
  try {
    const imagePath = req.file.path;
    const pythonProcess = spawn('python', ['Python/clusterOfColors.py', imagePath]);
    let result = '';
    pythonProcess.stdout.on('data', (data) => {
        // console.log(`Python script stdout: ${data}`);
      result += data.toString();
    });
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python script stderr: ${data}`);
    });
    pythonProcess.on('close', (code) => {
      console.log(`Python script process exited with code ${code}`);
      res.json({ resultPath:result });
    })
  } catch (error) {
    console.log(error);
    res.json({ error })
  }
});
app.post('/BackgroundRemover', upload.single('file'), (req, res) => {
  try {
    const imagePath = req.file.path;
    const pythonProcess = spawn('python', ['Python/backgroundRemover.py', imagePath]);
    let result = '';
    pythonProcess.stdout.on('data', (data) => {
        // console.log(`Python script stdout: ${data}`);
      result += data.toString();
    });
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python script stderr: ${data}`);
    });
    pythonProcess.on('close', (code) => {
      console.log(`Python script process exited with code ${code}`);
      res.json({ resultPath:result });
    })
  } catch (error) {
    console.log(error);
    res.json({ error })
  }
});
app.post('/ClusterFromImage', upload.single('file'), (req, res) => {
  try {
    const imagePath = req.file.path;
    const pythonProcess = spawn('python', ['Python/clusterFromImage.py', imagePath]);
    let result = '';
    pythonProcess.stdout.on('data', (data) => {
        // console.log(`Python script stdout: ${data}`);
      result += data.toString();
    });
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python script stderr: ${data}`);
    });
    pythonProcess.on('close', (code) => {
      console.log(`Python script process exited with code ${code}`);
      res.json({ resultPath:result });
    })
  } catch (error) {
    console.log(error);
    res.json({ error })
  }
});


// Start the server
const port = process.env.PORT || 8002;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
