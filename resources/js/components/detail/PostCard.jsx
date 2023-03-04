function PostCard() {
    return (
        <div className="bg-white w-[48%] rounded-lg overflow-hidden m-2">
            <div className="flex items-center justify-between px-3">
                <div className="flex items-center py-3">
                    <img src="https://avatars.githubusercontent.com/u/91861324?v=4" className="w-[35px] rounded-full mr-3" alt="" />
                    <p className="font-medium">ariear</p>
                </div>
                <img src="/img/dots.png" className="w-[20px]" alt="" />
            </div>
                <img src="https://cucipiring.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Freinhaaard%2Fimage%2Fupload%2Fv1677826189%2Fcucipiring%2Faostmrvqhccfc7itwm2u.png&w=1920&q=75" className="w-full" alt="" />
                <div className="flex items-center justify-between px-3 pt-4">
                    <div>
                        <p className="text-lg font-medium">Hadir bosku</p>
                        <p className="text-sm text-gray-400">saya mengerjakan hatimu</p>
                    </div>
                    <img src="/img/like.png" className="w-[20px]" alt="" />
                </div>
                <p className="px-3 my-3 italic text-gray-500 text-sm">a day ago</p>
        </div>
    )
}

export default PostCard
