import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SlideDetailPost } from '../../components/SlideDetailPost';
import { BoxInfo } from '../../components/BoxInfo';
import ListNewPost from '../../components/ListNewPost';
import { getDetailPost } from '../../services/apiPost';
import { IDetailPost } from '../../interfaces/Post';
import parse from 'html-react-parser';

const DetailPost: React.FC = () => {
    const [dataPost, setDataPost] = useState<IDetailPost | null>(null);
    const { postId } = useParams<{ postId: string }>();

  
    useEffect(() => {
        const fetchApi =  (async () => {
            if (!postId) return;
            const res = await getDetailPost(postId);
            if (res.status && res.data) {
                setDataPost(res.data);
            }
        }  );
        fetchApi();
    }, [postId]);

    if (!dataPost) return <div>Loading...</div>;

    const { title, images, address, price, area, description,
           id, category, attribute, created_at, user } = dataPost;

    const renderRow = (label: string, value: React.ReactNode, isBg: boolean = false) => (
        <tr className={`h-[40px] ${isBg ? 'bg-primary-bg' : ''}`}>
            <td className="text-sm w-1/3 px-2">{label}</td>
            <td className="text-sm">{value}</td>
        </tr>
    );
    return (
        <div className="flex w-full my-10">
            <div className="w-2/3 overflow-hidden gap-2 bg-white rounded-md p-4 shadow-custom">
                <SlideDetailPost images={images} />
                <div className="my-5">
                    <div className="flex gap-3 items-center">
                        <h1 className="text-2xl font-medium text-red-500 uppercase">{title}</h1>
                    </div>
                    <div className="text-sm">Địa chỉ: <span>{address?.address_detail}</span></div>
                    <div className="flex gap-8 my-2 items-center">
                        <span className="text-xl text-emerald-500 font-semibold">{price}</span>
                        <span className="text-sm">{area}</span>
                    </div>
                </div>
                <div className="my-5">
                    <h1 className="text-1xl font-semibold">Thông tin mô tả</h1>
                    {description && <span className="text-base">{parse(description)}</span>}
                </div>
                <div className="my-5">
                    <h1 className="text-1xl font-semibold">Đặc điểm tin đăng</h1>
                    <table className="w-full my-3">
                        <tbody>
                            {renderRow('Mã tin:', `#${id}`, true)}
                            {renderRow('Chuyên mục:', 
                                <Link to={`/${category?.slug}/${address?.city_slug}/${address?.district_slug}`}>
                                    {`${category?.name} ${address?.district_name}`}
                                </Link>, 
                                true)}
                            {renderRow('Loại tin rao:', category?.name)}
                            {renderRow('Đối tượng thuê:', attribute?.target, true)}
                            {renderRow('Ngày đăng:', created_at, true)}
                            {renderRow('Ngày hết hạn:', attribute?.expire)}
                        </tbody>
                    </table>
                </div>
                <div className="my-5">
                    <h1 className="text-1xl font-semibold">Thông tin liên hệ</h1>
                    <table className="w-full my-3">
                        <tbody>
                            {renderRow('Liên hệ:', `#${user?.name}`)}
                            {renderRow('Điện thoại:', user?.phone, true)}
                            {renderRow('Zalo:', user?.zalo)}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="w-1/3 px-2">
                <BoxInfo
                    avatar={user?.avatar}
                    name={user?.name}
                    phone={user?.phone}
                    zalo={user?.zalo}
                    status="Đang hoạt động"
                />
                <ListNewPost />
            </div>
        </div>
    );
};

export default DetailPost;
