import express from 'express';
import helmet from 'helmet';
import 'dotenv/config';
import cors from 'cors';
import pino from 'pino-http';



const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

app.get("/notes", (req, res) => {
  res.status(200).json({ message: "Retrieved all notes" });
});

app.get("/notes/:noteid", (req, res) => {
  const {noteid} = req.params;
  res.status(200).json({ message: `Retrieved note with ID: ${noteid}` });
});

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.message);
  const is_Prod = process.env.NODE_ENV === "production";
  res.status(500).json({ message: is_Prod ? "Something wemt wrong" : err.message });
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
