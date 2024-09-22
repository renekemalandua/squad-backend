export interface createUserDTO {
    name: string,
    email: string,
    password: string
}

export interface updateUserDTO {
    id: number,
    name?: string,
    email?: string,
}