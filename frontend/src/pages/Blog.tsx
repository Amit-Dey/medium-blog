// require imports
import { useParams } from 'react-router-dom';

// component imports
import { AppBar } from '../components/AppBar';
import { useBlog } from '../hooks/index';
import { Avatar, Circle } from '../components/BlogCard';

export const Blog = () => {

    // get the blog id from the url
    const { id } = useParams();

    // get the blog and loading state
    const { blog, loading } = useBlog({ id: id || "" });


    if (loading) {
        return (
            <div>
                <AppBar />
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <AppBar />
            <div className='p-4 max-w-3xl m-auto mt-20'>
                <div className="text-4xl font-bold">
                    {blog?.title}
                </div>
                <div className="flex items-center gap-2 mt-4">
                    <Avatar name={blog?.author.name || "Anonymous"} size="Big" />
                    <div className="flex gap-2 items-center text-sm text-gray-800">
                        {blog?.author.name || "Anonymous"}
                        <Circle />
                        {"22 Feb 2025"}
                    </div>
                </div>
                <div className="text-gray-800 text-lg text-justify mt-4">
                    {blog?.content?.indexOf("</") !== -1 ? <div dangerouslySetInnerHTML={{ __html: blog?.content || "" }}></div> : blog?.content}
                </div>
            </div>
        </div>
    )
}
