// Hono imports
import { Hono } from 'hono';
import { verify } from 'hono/jwt';

// Prisma imports
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

// Validation imports
import { createBlogInput, updateBlogInput } from "@amit-dey/medium-common";


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId: string,
    },
    Request: {
        Body: {
            title: string,
            content: string,
        }
    },

}>();


// Middleware to verify JWT tokens for /api/v1/blog/* routes
blogRouter.use('/*', async (c, next) => {
    const header = c.req.header('Authorization') || '';

    try {
        const token = header.split(' ')[1]
        if (!token) {
            return c.json({ message: 'Unauthorized' }, 401)
        }


        const payload = await verify(token, c.env.JWT_SECRET)
        if (!payload) {
            return c.json({ message: 'Unauthorized' }, 401)
        }
        c.set('userId', payload.id as string);
        await next()
    } catch (error) {
        return c.json({ message: 'Unauthorized' }, 401)
    }
})


// Create a new blog
blogRouter.post('', async (c) => {

    // Create a new Prisma client instance
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // Parse the request body
    const body = await c.req.json();

    try {

        // zod validation
        const { success } = createBlogInput.safeParse(body);
        if (!success) {
            return c.json({ message: "Invalid input" }, 400);
        }


        // Create a new blog
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: c.get('userId'),
            },
        })

        // Close the Prisma client
        await prisma.$disconnect()

        return c.json({
            id: blog.id,
        })
    }
    catch (error) {
        return c.json({ message: 'Blog not found' }, 404)
    }
})


// update a blog
blogRouter.put('/', async (c) => {

    // Create a new Prisma client instance
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    // Parse the request body
    const body = await c.req.json();

    // Update a blog
    try {
        // zod validation
        const { success } = updateBlogInput.safeParse(body);
        if (!success) {
            return c.json({ message: "Invalid input" }, 400);
        }

        const blog = await prisma.blog.update({
            where: {
                id: body.id,
            },
            data: {
                title: body.title,
                content: body.content,
            },
        })

        // Close the Prisma client
        await prisma.$disconnect()

        return c.json({
            id: blog.id,
        })
    }
    catch (error) {
        return c.json({ message: 'Blog not found' }, 404)
    }

})


// TODO: Add pagination
blogRouter.get('/bulk', async (c) => {
    // Create a new Prisma client instance
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // Fetch all blogs
    const blogs = await prisma.blog.findMany()

    // Close the Prisma client
    await prisma.$disconnect()

    return c.json(blogs)
})


// Get a blog by id
blogRouter.get('/:id', async (c) => {

    // Create a new Prisma client instance
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // get the id from the url
    const id = c.req.param('id')

    try {
        const blog = await prisma.blog.findUnique({
            where: {
                id: id,
            },
        })

        // Close the Prisma client
        await prisma.$disconnect()

        if (!blog) {
            return c.json({ message: 'Blog not found' }, 404)
        }

        return c.json({
            blog
        })
    }
    catch (error) {
        return c.json({ message: 'Blog not found' }, 404)
    }
})




