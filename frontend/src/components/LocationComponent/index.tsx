import React from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
const LocationComponent:React.FC<{data:any}> = ({data}) => {
  return (
    <div className='w-full h-full border-[1px] my-3 border-[#dedede] border-solid bg-white px-[20px] py-[10px] grid grid-cols-5'>
         {data?.map((e: { district_name: any; district_slug:any;ward_name: any;ward_slug: any; quantity: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined })=>{
           return  <div className='my-1'key={uuidv4()}> 
                    <Link to={`${e?.district_slug?e?.district_slug:e?.ward_slug}`} className='text-sm font-normal text-[#1266dd]'>
                          {e?.district_name||e?.ward_name}
                    </Link>
                      <span className='text-sm text-[#999] ml-1'>({e?.quantity})</span>
                  </div>
         })}

    </div>
  )
}

export default LocationComponent