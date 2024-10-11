import React, { useEffect, useState } from 'react'
import { apiGetPost } from '../../services/apiPost'
import { IPost } from '../../interfaces/Post'
import ItemNewPost from '../ItemNewPost'

const ListNewPost: React.FC<{detailPostId?:string}> = ({detailPostId}) => {
  const [listPost, setListPost] = useState<IPost[]>([])
  
  useEffect(() => {
    const fetchApi = async () => {
      const res = await apiGetPost({ sort: "ctime", limit: 10 })
      if (res.status) {
      let dataPost: IPost[] =res?.data?.posts;
      // Nếu có detailPostId, loại bỏ post trùng ID
      if (detailPostId) {
        dataPost = dataPost.filter((e) => e.id !== detailPostId);
      }
      setListPost(dataPost);
    }
    }
    fetchApi()
  }, [])

  return (
    listPost.length>0&&  <div className='w-full bg-white rounded-md p-4 shadow-custom mb-5'>
     <h1 className="text-lg font-medium mb-2">Tin mới đăng</h1>
      {listPost?.map((post: IPost) => (
          <ItemNewPost post={post}/>
      ))}
    </div>
  )
}

export default ListNewPost