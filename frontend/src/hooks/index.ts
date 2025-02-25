
// Required imports
import { useEffect, useState } from 'react';

// Axios for API requests
import axios from 'axios';
import { BACKEND_URL } from '../config';



interface Blog {
    "id": string
    "title": string
    "content": string
    "author": {
        "name": string
    }
}



export const useBlog = ({id}:{id:string}) => {
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            }
        )
            .then((response) => {
                setBlog(response.data.blog);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [id]);

    return { blog, loading };
}



export const useBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                setBlogs(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    return { blogs, loading };
};