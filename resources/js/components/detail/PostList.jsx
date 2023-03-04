import PostCard from "./PostCard"

function PostList() {
    return (
        <div className="flex flex-wrap justify-center">
            <PostCard />
            <PostCard />
            <PostCard />
        </div>
    )
}

export default PostList
