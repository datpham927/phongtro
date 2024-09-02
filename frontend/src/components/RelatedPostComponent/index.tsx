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
}

const RelatedPostComponent: React.FC<RelatedPostComponentProps> = ({
  addressId,
  cityName,
  districtName,
  categoryName,
}) => {
  const [relatedPost, setRelatedPost] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getRelatedPosts(addressId);
        if (res.status) {
          setRelatedPost(res.data);
        }
      } catch (error) {
        console.error("Error fetching related posts:", error);
      }
    };
    fetchApi();
  }, [addressId]);
 
  return (
    <div className="w-full bg-white rounded-md p-4 my-10 shadow-custom">
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
