import { Hono } from "hono";
import { User } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import { env } from 'hono/adapter'
import { decode, sign, verify } from 'hono/jwt';
import { signupInput, signinInput } from "@rahul2005/medium-common2";

export  const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }>()

userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({
        message: "Input is invalid"
      })
    }
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    //zod and hash password
    try{
      const user = await prisma.user.create({
        data: {
          username: body.username,
          password: body.password,
          name: body.name
        }
      })
      const jwt = await sign({
        id: user.id
      }, c.env.JWT_SECRET)
      return c.text(jwt)
    } catch(e){
      c.status(411);
      return c.text('User already exist or invalid inputs')
    }
  
  })
  
userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    //zod and hash password
    const { success } = signinInput.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({
        message: "Input is invalid"
      })
    }
    try{
      const user = await prisma.user.findFirst({
        where: {
          username: body.username,
          password: body.password,
        }
      })
      if(!user){
        c.status(403);
        return c.text('Invalid')
      }
      const jwt = await sign({
        id: user.id
      }, c.env.JWT_SECRET);
  
      return c.text(jwt)
  
    } catch(e){
      c.status(403);
      return c.text('invalid')
    }
  })