import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(cors());
app.use(express.json());


app.get('/health', (req, res) => {
    res.json({ mensagem: 'Backend a funcionar!' });
});


app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Servidor iniciado na porta ${PORT}`);
    });
};

startServer();
