import { User } from "@prisma/client";
import { prisma } from "../database/connection/prisma-client";
import { createUserDTO, updateUserDTO } from "../utils/dto/user-dto";

export async function createUser(request: createUserDTO): Promise<User>{
    const user = await prisma.user.create({
        data:{
            name: request.name,
            email: request.email,
            password: request.password,
            is_verified: true
        }
    });

    return user;
}

export async function listUser(): Promise<User[]>{
    const users = await prisma.user.findMany();
    return users;
}

export async function findUser(param: number | string): Promise<User | null >{

    if (typeof param === "string") {
        const user = await prisma.user.findFirst({ where: { email: param } });
        return user;
  
    } 

    else if (typeof param === "number") {
      const user = await prisma.user.findUnique({ where: { id: param } });
      return user;
    }
  
    return null;
}

export async function   searchUser(name: string): Promise<User[]>{
    const users = await prisma.user.findMany({
        where:{
            name:{
                contains: name,
                mode: "insensitive",
            }
        }
    })
    return users;
}

export async function updateUser(request: updateUserDTO): Promise<User>{
    const user = await prisma.user.update({
        where:{id: request.id},
        data:{
            ...(request.name && { name: request.name }),
            ...(request.email && { email: request.email }),
            updated_at: new Date()
        }
    });

    return user;
}

export async function deleteUser(id: number): Promise<void>{
    await prisma.user.delete({where:{id}})
}

export async function updatePassword(id: number, password: string): Promise<void>{
    await prisma.user.update({
        where:{id},
        data:{
            password
        }
    });
}

export async function updatePhoto(id: number, photo: string): Promise<void>{
    await prisma.user.update({
        where:{id},
        data:{
            photo
        }
    });
}

export async function updateCover(id: number, cover: string): Promise<void>{
    await prisma.user.update({
        where:{id},
        data:{
            cover
        }
    });
}