import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ mensagem: 'Backend a funcionar!' });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Servidor iniciado na porta ${PORT}`);
    });
};

startServer();