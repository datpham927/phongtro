import React from 'react';

interface BoxInfoProps {
    avatar?: string;
    name?: string;
    phone?: string;
    zalo?: string;
    status?: string;
}

 const BoxInfo: React.FC<BoxInfoProps> = ({ avatar, name, phone, zalo, status }) => {
    return (
        <div className='flex flex-col justify-center p-4 mb-[20px] rounded-md items-center w-full bg-[#FEBB02]'>
            <img className='w-[80px] h-[80px] rounded-full my-1' 
                src={avatar ? avatar : "https://phongtro123.com/images/default-user.png"} 
                alt={name} />
            <span className='text-1xl font-semibold'>{name}</span>
            <span className='text-sm'>{status}</span>
            <div className='flex flex-col w-full gap-2 mt-4'>
                <button className='w-full font-medium text-white bg-[#16C784] rounded-md py-1 text-xl'>
                    <a href={`https://zalo.me/${phone}`}>{phone}</a>
                </button>
                <button className='w-full font-medium border-solid border-[1px] py-1 rounded-md bg-primary-bg border-blue-custom text-base'>
                    <a href={`https://zalo.me/${zalo || phone}`}>Nhắn zalo</a>
                </button>
                <button className='w-full font-medium border-solid border-[1px] py-1 rounded-md bg-primary-bg border-blue-custom text-base'>
                    Yêu thích
                </button>
            </div>
        </div>
    );
}
export default BoxInfo