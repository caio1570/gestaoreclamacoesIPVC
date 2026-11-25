
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                mensagem: 'Introduza o email e a palavra-passe.'
            });
        }

     
        const emailNormalizado = email.trim().toLowerCase();

        if (!emailNormalizado.endsWith('@ipvc.pt')) {
            return res.status(400).json({
                mensagem: 'Utilize um email institucional do UniPVC.'
            });
        }

    
        const utilizador = await User.findOne({
            email: emailNormalizado
        });

        if (!utilizador) {
            return res.status(401).json({
                mensagem: 'Email ou palavra-passe incorretos.'
            });
        }

      
        const passwordCorreta = await bcrypt.compare(
            password,
            utilizador.password
        );

        if (!passwordCorreta) {
            return res.status(401).json({
                mensagem: 'Email ou palavra-passe incorretos.'
            });
        }

    
        const token = jwt.sign(
            { id: utilizador._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

    
        res.status(200).json({
            mensagem: 'Login efetuado com sucesso!',
            token,
            utilizador: {
                id: utilizador._id,
                nome: utilizador.nome,
                email: utilizador.email,
                tipo: utilizador.tipo
            }
        });

    } catch (erro) {
        console.error('Erro no login:', erro);

        res.status(500).json({
            mensagem: 'Erro ao iniciar sessão.'
        });
    }
};
