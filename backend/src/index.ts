// Hono Imports
import { Hono } from 'hono'
import { cors } from 'hono/cors'

// Routes
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

// Create a new Hono instance
const app = new Hono()

// Middleware
app.use(cors())

// Routers 
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);


export default app
