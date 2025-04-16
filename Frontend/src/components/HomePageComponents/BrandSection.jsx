import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const brands = [
  { name: "Beyoung", url: "https://beyoung.in/", img: "https://d157777v0iph40.cloudfront.net/smartbuy3.0/images/offers/Beyoung.jpg" },
  { name: "Mokobara", url: "https://mokobara.com/", img: "https://d1rem61pdixo0z.cloudfront.net/website-cdn/public/img/home/static/hero-one-sec/trusted-cont/2.svg" },
  { name: "Estella", url: "https://estellacollection.com/", img: "https://d1rem61pdixo0z.cloudfront.net/website-cdn/public/img/home/static/hero-one-sec/trusted-cont/estella.webp" },
  { name: "Eyevos", url: "https://eyevos.com/", img: "https://d1rem61pdixo0z.cloudfront.net/website-cdn/public/img/home/static/hero-one-sec/trusted-cont/eyevos.webp" },
  { name: "Nish Hair", url: "https://www.nishhair.com/", img: "https://d1rem61pdixo0z.cloudfront.net/website-cdn/public/img/home/static/hero-one-sec/trusted-cont/nish_hair.png" },
  { name: "Daily Objects", url: "https://www.dailyobjects.com/", img: "https://d1rem61pdixo0z.cloudfront.net/website-cdn/public/img/home/static/hero-one-sec/trusted-cont/daily_objects.png" },
  { name: "Nandog", url: "https://www.nandog.com/", img: "https://d1rem61pdixo0z.cloudfront.net/website-cdn/public/img/home/static/hero-one-sec/trusted-cont/nandog.avif" },
  { name: "Reval Saunas", url: "https://revelsaunas.com.au/", img: "https://d1rem61pdixo0z.cloudfront.net/website-cdn/public/img/home/static/hero-one-sec/trusted-cont/revel.avif" },
  { name: "Whole Truth", url: "https://www.wholetruth.in/", img: "https://d1rem61pdixo0z.cloudfront.net/website-cdn/public/img/home/static/hero-one-sec/trusted-cont/whole_truth.png" },
  // { name: "Ultima Cosa", url: "https://www.ultimacosa.com/", img: "https://d1rem61pdixo0z.cloudfront.net/website-cdn/public/img/home/static/hero-one-sec/trusted-cont/ultima-cosa.avif" }
];

const BrandSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1200,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } }
    ]
  };

  return (
    <div className="w-full bg-[#fcfcfc] py-6 mb-0">
      <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
        Trusted by <span className="text-[#FC739C]">1500+</span> brands
      </h2>
      <Slider {...settings} className="mx-auto w-[90%]">
        {brands.map((brand, index) => (
          <a key={index} href={brand.url} target="_blank" rel="nofollow" className="p-4 flex justify-center">
            <img src={brand.img} alt={`${brand.name} logo`} className="h-[60px] transition-transform duration-300 hover:scale-110" />
          </a>
        ))}
      </Slider>
    </div>
  );
};

export default BrandSlider;