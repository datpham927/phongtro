import React, { useEffect, useState } from 'react';
import SelectOption from '../SelectOption';
import { apiGetAllPostType } from '../../services/apiPosType';
import { IPostType } from '../../interfaces/PostType';
import { POST_TYPE_COLOR } from '../../utils/constant';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setLoading } from '../../redux/action/actionSlice';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { formatNumber } from '../../utils/format/formatNumber';

interface PostPackageComponentProps {
  setPostType: React.Dispatch<React.SetStateAction<IPostType | any>>;
  postType:IPostType|any
}

const PostPackageComponent: React.FC<PostPackageComponentProps> = ({ setPostType,postType }) => {
  const [postList, setPostList] = useState<IPostType[]>([]);
  const [selectedPostTypeId, setSelectedPostTypeId] = useState<any>(null);
  const dispatch = useAppDispatch();
  const  user   = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchPostTypes = async () => {
      dispatch(setLoading(true));
      try {
        const res = await apiGetAllPostType();
        if (res?.status) {
          setPostList(res.data);
        }
      } catch (error) {
        console.error('Failed to fetch post types:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchPostTypes();
  }, [dispatch]);

  // Tìm gói tin đăng đã chọn
  useEffect(() => {
    if (selectedPostTypeId) {
      const selectedType = postList.find((e) => e.id === selectedPostTypeId?.id);
      setPostType(selectedType);
    }
  }, [selectedPostTypeId, postList, setPostType]);

  return (
    <div className="mt-3">
      <SelectOption
        isLabel
        label="Chọn gói tin đăng"
        options={postList}
        type="id"
        setValue={setSelectedPostTypeId}
        valueCode={selectedPostTypeId?.id}
      />
        { postType?.price>user?.account_balance&&
        <span className="my-1 text-sm text-red-custom">Vui lòng nộp thêm tiền!</span>}

      {selectedPostTypeId && postList.length > 0 && (
        <div className="flex p-3 mt-2 bg-[#FFFAE8] rounded-md border border-[#FFC107]">
          <ErrorOutlineOutlinedIcon fontSize="small" className="mr-2" />
          <div className="flex flex-col">
            {postList
              ?.filter((e) => e.id === selectedPostTypeId?.id)
              ?.map((postType) => (
                <div key={postType?.id} className="flex flex-col">
                  <div className="flex justify-between">
                    <p className="text-xs font-normal">{postType?.name}</p>
                    <p className="text-xs font-normal">Giá: {formatNumber(postType?.price)}</p>
                    <p className="text-xs font-normal">Hạn: {postType?.expiration_time} tháng</p>
                  </div>
                  <span
                    style={{ color: POST_TYPE_COLOR[postType?.priority - 1] }}
                    className="text-xs mt-1"
                  >
                    {postType?.description}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPackageComponent;
