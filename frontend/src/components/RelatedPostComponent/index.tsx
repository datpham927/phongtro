import React, { memo, useEffect, useState } from "react";
import { IPost } from "../../interfaces/Post";
import ItemPostComponent from "../ItemPostComponent";
import { getRelatedPosts } from "../../services/apiPost";

// Định nghĩa kiểu dữ liệu cho props
interface RelatedPostComponentProps {
  addressId: string;
  cityName?: string;
  districtName?: string;
  categoryName?: string;
  detailPostId?:string
}

const RelatedPostComponent: React.FC<RelatedPostComponentProps> = ({
  addressId,
  cityName,
  districtName,
  categoryName,
  detailPostId
}) => {
  const [relatedPost, setRelatedPost] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
        const res = await getRelatedPosts(addressId);
        if (res.status) {
          let dataPost: IPost[] = res.data;
          // Nếu có detailPostId, loại bỏ post trùng ID
          if (detailPostId) {
            dataPost = dataPost.filter((e) => e.id !== detailPostId);
          }
          setRelatedPost(dataPost);
        }
    };
    fetchApi();
  }, [addressId]);
 
  return (
    relatedPost.length>0&& <div className="w-full bg-white rounded-md p-4 my-10 shadow-custom">
      <h3 className="font-semibold text-lg mb-4">{`${categoryName} ${districtName}, ${cityName}`}</h3>
      <div className="w-full flex flex-col gap-2">
        {relatedPost.map((post) => (
          <ItemPostComponent key={post.id} props={post} />
        ))}
      </div>
    </div>
  );
};

export default memo(RelatedPostComponent);
