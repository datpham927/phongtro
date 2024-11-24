import React from 'react'
import { Link } from 'react-router-dom'
import { IPost } from '../../interfaces/Post'
import { timeAgo } from '../../utils/format/timeAgo'
import { POST_TYPE_COLOR } from '../../utils/constant'

const ItemNewPost:React.FC<{post:IPost}> = ({post}) => {
  return (
    <Link key={post?.id} to={`/chi-tiet/${post?.slug}/${post?.id}`} className="flex items-center border-b border-gray-300 py-3 max-w-md">
          <div className="flex-shrink-0 mr-3">
            <img src={post?.thumb} alt={post?.title} className="w-16 h-16 object-cover rounded-md" />
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-sm line-clamp-2 truncate-trailing" 
              style={{ color: POST_TYPE_COLOR[post.priority - 1] }}
            >{post?.title}</p>
            <div className="flex items-center mt-1">
              <span className="text-green-600   text-sm mr-3">{post?.price.value}</span>
              <span className="text-gray-400 text-sm">{timeAgo(post?.created_at)}</span>
            </div>
          </div>
        </Link>
  )
}

export default ItemNewPost