import moment from "moment/moment"

function PostCard({ post }) {
    return (
        <div className="bg-white w-[48%] rounded-lg overflow-hidden m-2">
            <div className="flex items-center justify-between px-3">
                <div className="flex items-center py-3">
                    <img src={post.user.pp} className="w-[35px] rounded-full mr-3" alt="" />
                    <p className="font-medium">{post.user.name}</p>
                </div>
                <img src="/img/dots.png" className="w-[20px]" alt="" />
            </div>
                <img src={post.img} className="w-full" alt="" />
                <div className="flex items-center justify-between px-3 pt-4">
                    <div>
                        <p className="text-lg font-medium">{post.title}</p>
                        <p className="text-sm text-gray-400">{post.desc}</p>
                    </div>
                    <img src="/img/like.png" className="w-[20px]" alt="" />
                </div>
                <p className="px-3 my-3 italic text-gray-500 text-sm">{moment(post.created_at, "YYYYMMDD").fromNow()}</p>
        </div>
    )
}

export default PostCard
