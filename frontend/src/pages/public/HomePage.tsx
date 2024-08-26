import React, { useEffect, useState } from 'react'
import { IPost } from '../../interfaces/Post'
import { getAllPost } from '../../services/apiPost'
import SearchComponent from '../../components/SearchComponent'
import ProvinceComponent from '../../components/ProvinceComponent'
import ListComponent from '../../components/ListComponent'
import ItemNavbarComponent from '../../components/ItemNavbarComponent'
import { dataArea, dataPrice } from '../../utils/data'
 

const HomePage:React.FC = () => { 
      const [listPosts, setListPost]=useState<IPost[]>([])


   useEffect(()=>{
       const fetchApi= async()=>{
           const res = await getAllPost({
            page:1,
            limit:10
           })
         if(res.status){
          setListPost(res?.data)
         }
       }   
       fetchApi()
   },[])

  return (
    <>
    <SearchComponent/>
    <ProvinceComponent />
      <div className="flex my-5 gap-4">
        <div className="w-[70%]">
          <ListComponent  data={listPosts} />
        </div>
        <div className="w-[30%]">
          <ItemNavbarComponent isDouble title="Xem theo giá" content={dataPrice} />
         <ItemNavbarComponent isDouble title="Xem theo diện tích" content={dataArea}/>
        </div>
      </div>
    </>
  )
}

export default HomePage