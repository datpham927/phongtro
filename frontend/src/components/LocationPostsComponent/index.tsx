import React, { useEffect, useState } from 'react'
import { apiGetPost, getLocationPosts } from '../../services/apiPost'
import { IPost } from '../../interfaces/Post'
import ItemNewPost from '../ItemComponents/ItemNewPost'
import { useAppSelector } from '../../redux/hooks'
import { v4 as uuidv4 } from 'uuid';
import { getApiCurrentLocation } from '../../services/apiAddress'
import MapComponent from '../MapComponent'
import { convertToSlug } from '../../utils/format/convertToSlug'
import EmptyComponent from '../EmptyComponent'
const LocationPostsComponent: React.FC = () => {
  const [listPost, setListPost] = useState<IPost[]>([])
  const { loading } = useAppSelector((state) => state.action);
    

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Trình duyệt không hỗ trợ định vị.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords; 
        // Gọi API để lấy thông tin địa chỉ từ tọa độ
        const res = await getApiCurrentLocation(latitude, longitude);
        const address= res.address
        if (address) { 
          console.log("address",address)
           const city_slug = convertToSlug(address.city)  
           const district_slug = convertToSlug(address.suburb.replace('District', '').trim() )
           const data = await getLocationPosts(city_slug,district_slug)
           data?.status&&setListPost(data?.data)
        } 
      },
      (error) => {
        console.error("Lỗi khi lấy vị trí:", error);
        alert("Vui lòng bật định vị để sử dụng tính năng này.");
      }
    );  
  }, [])
  if(loading) return <></>;

  return (
       <div className='w-full bg-white rounded-md p-4 shadow-custom mb-5'>
          <h1 className="text-lg font-medium mb-2">Khu vực xung quanh bạn</h1>
          <MapComponent height='200px'/>
            { listPost?.length>0? listPost?.map((post: IPost) => (
                <ItemNewPost key={uuidv4()}post={post}/>
            )):<EmptyComponent/>}
      </div>
  )
}

export default LocationPostsComponent