import React from 'react'

const EmptyComponent:React.FC = () => {
  return (
    <div  className="mb-5 p-5 bg-white border border-gray-300 rounded-lg" >
        <p className='text-red-500 text-center text-sm'>
             Hiện tại chưa có tin đăng trong khu vực này
        </p>
    </div>
  )
}

export default EmptyComponent