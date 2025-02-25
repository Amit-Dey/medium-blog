

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    onClick: () => void;
}


export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    onClick,
}: BlogCardProps) => {

    const flag = content.indexOf("</") !== -1;
    content = flag ? content : content.slice(0, 100);


    return (
        <div onClick={onClick} className="p-4 border-b-1 border-gray-200 rounded-md hover:cursor-pointer hover:bg-gray-200 hover:shadow-md">
            <div className="flex items-center gap-2">
                <Avatar name={authorName} size="Small" />
                <div className="flex items-center gap-2">
                    <div className="flex gap-2 items-center text-sm text-gray-800">
                        {authorName}
                        <Circle />
                        {publishedDate}
                    </div>
                </div>
            </div>
            <div className="text-2xl font-extrabold mt-3">
                {title}
            </div>
            <div className="text-gray-800 text-lg mt-2 max-h-36 overflow-hidden">
                {flag ? <div dangerouslySetInnerHTML={{ __html: content }}></div> : content}
                {content.length > 100 && "..."}
            </div>
            <div className="text-gray-600 text-sm mt-2">
                {Math.ceil(content.length / 100)} minute read
            </div>
        </div>
    )
}


export const Circle = () => {
    return (
        <span className="flex flex-col justify-center">
            <span className="h-1 w-1 bg-gray-600 rounded-full inline-block">
            </span>
        </span>
    )
}


export const Avatar = ({ name, size }: { name: string, size: "Big" | "Small" }) => {
    return (
        <div className={`flex items-center justify-center rounded-full ${size === "Big" ? "h-8 w-8" : "w-6 h-6"} bg-gray-200`}>
            <span className={`text-gray-800 font-bold text-sm ${size === "Big" ? "text-lg" : "text-base"}`}>
                {name[0] || "A"}
            </span>
        </div>
    )
}