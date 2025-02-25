
// Required imports
import { useNavigate } from 'react-router-dom';

// component imports
import { AppBar } from '../components/AppBar';
import { BlogCard } from '../components/BlogCard';
import { useBlogs } from '../hooks/index';


export const Home = () => {

    const { blogs, loading } = useBlogs();
    const navigate = useNavigate();

    // Check for jwt token in local storage
    if (!localStorage.getItem('jwt')) {
        navigate('/signin');
    }


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
            <div className='flex flex-col gap-6 p-4 max-w-3xl m-auto mt-20'>
                {blogs.map((blog) => (
                    <BlogCard
                        authorName={blog.author.name || "Anonymous"}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={"22 Feb 2025"}
                        onClick={ () => navigate(`/blog/${blog.id}`)}
                        key={blog.id}
                    />
                ))}
            </div>
        </div>
    )
}
