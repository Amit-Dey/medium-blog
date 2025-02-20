// Hono imports
import { Hono } from "hono";
import { sign } from "hono/jwt";

// Prisma imports
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

// Validation imports
import { signinInput,signupInput } from "@amit-dey/medium-common";


export const userRouter = new Hono<
    {
        Bindings: {
            DATABASE_URL: string,
            JWT_SECRET: string,
        },
        Variables: {
            userId: string,
        }
    }
>();



// Sign up a new user
userRouter.post('/signup', async (c) => {

    // Create a new Prisma client instance
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // Parse the request body
    const body = await c.req.json();

    try {

        //zod validation 
        const {success} = signupInput.safeParse(body);
        if(!success){
            return c.json({message:"Invalid input"},400);
        }

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        })

        if (existingUser) {
            return c.json({ message: 'User already exists' }, 400)
        }


        // Create a new user
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
            },
        })

        // Sign a JWT token
        const token = await sign({ id: user.id }, c.env.JWT_SECRET)

        // Close the Prisma client
        await prisma.$disconnect()

        // Return the JWT tokenk
        return c.json({
            "jwt": token,
        })

    } catch (error) {
        return c.json({ message: 'Internal server error' }, 500)
    }
})


// Sign in a user
userRouter.post('/signin', async (c) => {

    // Create a new Prisma client instance
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // Parse the request body
    const body = await c.req.json()

    try {

        // TODO: zod validation and password hashing
        const {success} = signinInput.safeParse(body);
        if(!success){
            return c.json({message:"Invalid input"},400);
        }

        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        })

        if (!user) {
            return c.json({ message: 'User not found' }, 404)
        }

        // Check if the password is correct
        if (user.password !== body.password) {
            return c.json({ message: 'Invalid password' }, 403)
        }

        // Sign a JWT token
        const token = await sign({ id: user.id }, c.env.JWT_SECRET)

        // Close the Prisma client
        await prisma.$disconnect()

        // Return the JWT token
        return c.json({
            "jwt": token,
        })

    } catch (error) {
        return c.json({ message: 'Internal server error' }, 500)
    }

})