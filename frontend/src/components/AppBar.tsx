import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { AiFillEdit } from "react-icons/ai";

export const AppBar = () => {
    return (
        <div className="w-full border-b-1 border-gray-300 py-2 fixed top-0 z-10 bg-white">
            <div className="flex justify-between max-w-3xl m-auto px-4">
                <Link to="/" className="text-xl font-medium">
                    Medium
                </Link>
                <div className="flex justify-center items-center gap-4">
                    <Link to="/write" className="flex gap-1 items-center hover:text-green-600">
                        <AiFillEdit />
                        Write
                    </Link>
                    <Avatar name="Amit" size="Big" />
                </div>
            </div>
        </div >
    )

}