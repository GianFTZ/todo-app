// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default async function handler(req, res) { 
  if (req.method === 'POST') {
    return await createTodo(req, res);

  }else if (req.method === 'DELETE') {
  //  return await deletedTodo(req, res)
  return await deletedTodo(req, res)
  }else if (req.method === 'GET') {
    return await readTodo(req, res)
  }
}

async function readTodo(req, res) {
  try {
    const allTodos = await prisma.todo.findMany();
    return res.status(200).json(allTodos, {sucess: true});
  } catch (err) {
    console.log(err)
    return res.status(500).json({err: "error reading todos", success: false});
  }
}

export async function getAlltodo() {
  const data = await prisma.todo.findMany();
  return data;
}

async function createTodo(req, res) {
  const body = req.body;
  try {
    const newEntry = await prisma.todo.create({
      data: {
        description: body.description
      }
  })
  return res.status(200).json(newEntry, {sucess: true});
  } catch (err) {
    console.error("Request error", err);
    res.status(500).json(
      {error: "Error creating", sucess: false});
  }
}


async function deletedTodo(req, res) {
  let body = req.body
  const allTodos = await prisma.todo.findMany();
  try {
    // está funcionando
    const deleteTodo = await prisma.todo.delete({
      where: { id: allTodos[body.id].id },
    });
    //////////////////
    return res.status(200).json(deleteTodo, {sucess: true});
  } catch (err) {
    console.log(err)
    return res.status(520).json({err: `erro ai o id é ${allTodos.length}, ${body.id} ele é ${allTodos[0].id}` , success: false});
  }
}
