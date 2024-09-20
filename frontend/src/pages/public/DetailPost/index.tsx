import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { getDetailPost } from '../../../services/apiPost';
import { IDetailPost } from '../../../interfaces/Post';
import { formatDate } from '../../../utils/format/formatDate';
import { timeAgo } from '../../../utils/format/timeAgo';
import { BoxInfo, BreadcrumbComponent, ListNewPost, RelatedPostComponent, SlideDetailPost } from '../../../components';
import { useAppDispatch } from '../../../redux/hooks';
import { setLoading } from '../../../redux/action/actionSlice';

const DetailPost: React.FC = () => {
    const [dataPost, setDataPost] = useState<IDetailPost | null>(null);
    const dispatch= useAppDispatch()
    const { postId } = useParams<{ postId: string }>();
    
    useEffect(() => {
        dispatch(setLoading(true))
        const fetchApi =  (async () => {
            if (!postId) return;
            const res = await getDetailPost(postId);
            if (res.status && res.data) {
                setDataPost(res.data);
            }
            dispatch(setLoading(false))
        }  );
        fetchApi();
    }, [postId]);

    if (!dataPost) return ;

    const { title, images, address, price, area, description,
           id, category, attribute, expire_at, created_at, user } = dataPost;

    const renderRow = (label: string, value: React.ReactNode, isBg: boolean = false) => (
        <tr className={`h-[40px] ${isBg ? 'bg-primary-bg' : ''}`}>
            <td className="text-sm w-1/3 px-2">{label}</td>
            <td className="text-sm">{value}</td>
        </tr>
    );

    const breadcrumbs = [
        {
            path:`/${category.slug}`,
            breadcrumb:  category.name,
        },
        {
            path: `/tinh-thanh/${address.city_slug}`,
            breadcrumb: address.city_name,
        },
        {
            path: `/tinh-thanh/${address.city_slug}/${address.district_slug}`,
            breadcrumb: address.district_name,
        },
        ,
        {
            path: '',
            breadcrumb:title,
        },
    ];
    return (
       <>
        <BreadcrumbComponent breadcrumbs={breadcrumbs}/>
        <div className="flex gap-2 w-full">
    <div className="w-2/3 overflow-hidden h-full gap-4 rounded-md ">
     <div className='w-full shadow-custom'>
          <SlideDetailPost images={images} />
        <div className="p-5 bg-white">
                <div className="flex gap-3 items-center">
                    <h1 className="text-2xl font-medium text-red-500 uppercase">{title}</h1>
                </div>
                <div className="text-sm flex items-center mt-1">
                    <img 
                        className="w-[16px] h-[16px] mr-[8px]" 
                        src="https://phongtro123.com/images/address-icon.svg" 
                        alt="Address icon" 
                    />
                    <span>Địa chỉ: {address?.address_detail}</span>
                </div>
                <div className="flex gap-8 my-2 items-center">
                    <div className="flex items-center text-xl text-emerald-500 font-semibold">
                        <img 
                            className="w-[16px] h-[16px] mr-[8px]" 
                            src="https://phongtro123.com/images/price-icon.svg" 
                            alt="Price icon" 
                        />
                        {price?.value}
                    </div>
                    <div className="flex items-center text-sm">
                        <img 
                            className="w-[16px] h-[16px] mr-[8px]" 
                            src="https://phongtro123.com/images/acreage-icon.svg" 
                            alt="Area icon" 
                        />
                        {area?.value}
                    </div>
                    <div className="flex items-center text-sm">
                        <img 
                            className="w-[16px] h-[16px] mr-[8px] opacity-40" 
                            src="https://phongtro123.com/images/wall-clock-icon.svg" 
                            alt="Time icon" 
                        />
                        {timeAgo(created_at)}
                    </div>
                    <div className="flex items-center text-sm">
                        <img 
                            className="w-[16px] h-[16px] mr-[8px] opacity-40" 
                            src="https://phongtro123.com/images/hashtag.svg" 
                            alt="ID icon" 
                        />
                        {id.slice(0, 6)}
                    </div>
                </div>
            <div className="my-5">
                <h1 className="text-[20px] my-2 font-semibold">Thông tin mô tả</h1>
                {description && <span className="text-base">{parse(description)}</span>}
            </div>
            <div className="my-5">
                <h1 className="text-[20px] my-2 font-semibold">Đặc điểm tin đăng</h1>
                <table className="w-full my-3">
                    <tbody>
                        {renderRow('Mã tin:', `#${id.slice(0, 6)}`)}
                        {renderRow(
                            'Chuyên mục:', 
                            <Link className="text-[#1266dd] underline hover:text-[#f60]" to={`/${category?.slug}/${address?.city_slug}/${address?.district_slug}`}>
                                {`${category?.name} ${address?.district_name}`}
                            </Link>, true
                        )}
                        {renderRow('Loại tin rao:', category?.name )}
                        {renderRow('Đối tượng thuê:', attribute?.target, true)}
                        {renderRow('Ngày đăng:', formatDate(created_at) )}
                        {renderRow('Ngày hết hạn:', expire_at, true)}
                    </tbody>
                </table>
            </div>
            <div className="my-5">
                <h1 className="text-[20px] my-2 font-semibold">Thông tin liên hệ</h1>
                <table className="w-full my-3">
                    <tbody>
                        {renderRow('Liên hệ:', user?.name)}
                        {renderRow('Điện thoại:', user?.phone, true)}
                        {renderRow('Zalo:', user?.zalo)}
                    </tbody>
                </table>
            </div>
            <div className="my-5">
                <h1 className="text-[20px] my-2 font-semibold">Bản đồ</h1>
                <span className='text-sm'>Địa chỉ: {address.address_detail}</span>
               <div className=' my-2'>  {parse(address.map)}</div>
            </div>
        </div>
    
     </div>
        <RelatedPostComponent 
            detailPostId={postId}
            addressId={address.id}
            categoryName={category.name}
            cityName={address.city_name}
            districtName={address.district_name}
    />
    </div>

    <div className="w-1/3 px-2">
        <BoxInfo
            avatar={user?.avatar}
            name={user?.name}
            phone={user?.phone}
            zalo={user?.zalo}
            status="Đang hoạt động"
        />
        <ListNewPost detailPostId={postId}/>
    </div>
</div>

       </>

    );
};

export default DetailPost;
