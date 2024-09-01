import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { location, titleHomePage } from "../../utils/constant";
import ProvinceItemComponent from "./ProvinceItemComponent";
import WelcomeComponent from "../WelcomeComponent";

interface TitleWelcome {
  title: string | any;
  description: string | any;
}

const ProvinceComponent: React.FC = () => {
  const [titleWelcome, setTitleWelcome] = useState<TitleWelcome>({
    title: titleHomePage.title,
    description: titleHomePage.description,
  });

  const { categories } = useAppSelector((state) => state.category);
  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    if (slug) {
      const category = categories.find((e) => e.slug === slug);
      setTitleWelcome({
        title: category?.title,
        description: category?.sub_title,
      });
    } else {
      setTitleWelcome({
        title: titleHomePage.title,
        description: titleHomePage.description,
      });
    }
  }, [slug, categories]);

  return (
    <> 
       <WelcomeComponent title={titleWelcome?.title}  description={titleWelcome?.description} />
      <div className="flex justify-center mt-4">
        {location.map((e) => (
          <ProvinceItemComponent key={e.name} image={e.image} title={e.name} slug={e.slug} />
        ))}
      </div>
    </>
  );
};

export default ProvinceComponent;
