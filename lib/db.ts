import { prisma } from "./prisma";

export interface Todo {
    id: number;
    description: string;
}

export async function getAlltodo() {
    const data = await prisma.todo.findMany();
    return data;
}
