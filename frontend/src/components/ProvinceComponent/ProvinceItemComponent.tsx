import { memo } from "react";
import { Link } from "react-router-dom";

interface ProvinceItemPostProps {
  title: string;
  image: string;
  slug: string;
}

const ProvinceItemComponent: React.FC<ProvinceItemPostProps> = ({ title, image, slug }) => {
  return (
    <Link
      to={`/tinh-thanh/${slug}/`}
      className="w-[190px] text-center bg-white rounded-md overflow-hidden shadow-custom mx-[10px]"
    >
      <img className="w-full object-cover h-[110px]" src={image} alt={title} />
      <div className="text-base py-2">{title}</div>
    </Link>
  );
};

export default memo(ProvinceItemComponent);
