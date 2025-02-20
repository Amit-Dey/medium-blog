// Hono Imports
import { Hono } from 'hono'

// Routes
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

// Create a new Hono instance
const app = new Hono()

// Routers 
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);


export default app
