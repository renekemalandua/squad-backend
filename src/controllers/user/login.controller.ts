import { Request, Response } from 'express';
import { compare} from 'bcrypt';
import { findUser } from '../../models/user-model';
import { AppError } from '../../utils/errors/app-error';
import { sign } from 'jsonwebtoken';


export async function login(request: Request, response: Response): Promise<Response>{
  const {email, password} = request.body;

  try {

      const user = await findUser(email);

      if (!user) {
          return response.status(400).json({status:false, message: "a conta não existe" });
      }

      const matchPassword = await compare(password, user.password);

      if(!matchPassword){
        return response.status(400).json({status:false, message: "palavra passe incorreta" });
      }
 
      const JWT_SECRET = process.env.JWT_SECRET;
      if (!JWT_SECRET) {
        throw new AppError("Chave secreta não fornecida!");
      }
      
      const token = sign(
          {
            userId: user.id,
          },
          JWT_SECRET,
          {
            algorithm: "HS256",
            expiresIn: "2h",
          }
      );

      const userlogin = {
          id: user.id,
          email: user.email,
          name: user.name,
          photo: user.photo,
          cover: user.cover,
          token
        };

      return response.status(200).json({status:true, message:"Usuario logado com sucesso", userlogin: userlogin});
  } catch (error) {
      return response.status(400).json({message: "Login falhou", data: error});
  }
}