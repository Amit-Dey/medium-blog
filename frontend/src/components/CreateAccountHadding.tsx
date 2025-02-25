import { Link } from "react-router-dom"

interface CreateAccountHaddingProps {
    type: "signup" | "signin";
}

export const CreateAccountHadding = ({ type }: CreateAccountHaddingProps) => {
    return (
        <>
            <h1 className="text-3xl font-extrabold">
                {type === "signup" ? "Create an account" : "Log in"}
            </h1>
            <div className="mt-4 text-gray-500 flex gap-1">
                <p>{type === 'signup' ? "Already have an account?" : "Don't have an account?"}</p>
                <Link to={
                    type === 'signup' ? "/signin" : "/signup"
                } className="underline hover:text-blue-700">
                    {type === 'signup' ? "Log in" : "Sign up"}
                </Link>
            </div>
        </>

    )
}