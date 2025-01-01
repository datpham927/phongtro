import React, { useEffect, useState } from 'react'
import { apiGetPost, getNewPosts } from '../../services/apiPost'
import { IPost } from '../../interfaces/Post'
import ItemNewPost from '../ItemComponents/ItemNewPost'
import { useAppSelector } from '../../redux/hooks'
import { v4 as uuidv4 } from 'uuid';
const NewPostComponent: React.FC<{detailPostId?:string}> = ({detailPostId}) => {
  const [listPost, setListPost] = useState<IPost[]>([])
  const { loading } = useAppSelector((state) => state.action);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getNewPosts()
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
  if(loading) return <></>;

  return (
    listPost.length>0&&  <div className='w-full bg-white rounded-md p-4 shadow-custom mb-5'>
     <h1 className="text-lg font-medium mb-2">Tin mới đăng</h1>
      {listPost?.map((post: IPost) => (
          <ItemNewPost key={uuidv4()}post={post}/>
      ))}
    </div>
  )
}

export default NewPostComponent