import z from "zod";


// Backend zod validation schema

// signupInput is a zod schema that validates the request body for the signup route
export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2).optional(),
});


// signinInput is a zod schema that validates the request body for the signin route
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});


// createBlogInput is a zod schema that validates the request body for the create blog route
export const createBlogInput = z.object({
    title: z.string().min(2),
    content: z.string().min(2),
});


// updateBlogInput is a zod schema that validates the request body for the update blog route
export const updateBlogInput = z.object({
    title: z.string().min(2).optional(),
    content: z.string().min(2).optional(),
    id: z.string().uuid(),
});



// Type inference for Frontend

export type SingnupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;


