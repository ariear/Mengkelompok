import PostCard from "./PostCard"

function PostList({posts, loadingPost}) {
    return (
        <div className="flex flex-wrap justify-center">
            {
                loadingPost ?
                    <p>Loading...</p>
                        :
                posts.length > 0 ?
                posts.map(post =>
                    <PostCard key={post.id} post={post} />
                )
                :
                <p>Postingan belum tersedia</p>
            }
        </div>
    )
}

export default PostList
