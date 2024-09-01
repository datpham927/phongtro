import React, { useEffect, useState } from 'react'
import { getAllPost } from '../../services/apiPost'
import { IPost } from '../../interfaces/Post'
import { timeAgo } from '../../utils/format/timeAgo'
import { Link } from 'react-router-dom'
import ItemNewPost from '../ItemNewPost'

const ListNewPost: React.FC = () => {
  const [listPost, setListPost] = useState<IPost[]>([])

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getAllPost({ sort: "ctime", limit: 10 })
      if (res.status) {
        setListPost(res?.data?.posts)
      }
    }
    fetchApi()
  }, [])

  return (
    <div className='w-full bg-white rounded-md p-4 shadow-custom mb-5'>
     <h1 className="text-lg font-medium mb-2">Tin mới đăng</h1>
      {listPost?.map((post: IPost) => (
          <ItemNewPost post={post}/>
      ))}
    </div>
  )
}

export default ListNewPost