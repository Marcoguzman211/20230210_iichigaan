// import Head from "next/head";
import { Inter } from "@next/font/google";
import "@fontsource/roboto";
import homeStyle from "../styles/Home.module.scss";
import Slider from "@/components/Slider";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
import Contact from "@/components/Contact";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const inter = Inter({ subsets: ["latin"] });

export default function Home({featuredProducts, trendingProducts}) {
    const { t } = useTranslation('common')
  return (
    <div className={homeStyle.home}>
        <p>{t('welcome')}</p>
      <Slider />
      <FeaturedProducts
        type="featured"
        text="Discover our featured products! Carefully selected items to meet your fashion needs. "
        products={featuredProducts}
      />
      <Categories />
      <FeaturedProducts
        type="trending"
        text="Discover our selection of trendy products for this season!"
        products={trendingProducts}
      />
      {/* <Contact /> */}
    </div>
  );
}

export async function getStaticProps({locale}) {
    const res1 = await fetch(`${process.env.REACT_APP_API_URL}/products?populate=*&[filters][type][$eq]=featured`, {
        headers: {
            Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
        },
    });
    const res2 = await fetch(`${process.env.REACT_APP_API_URL}/products?populate=*&[filters][type][$eq]=trending`, {
        headers: {
            Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
        },
    });
    const featuredProducts = await res1.json();
    const trendingProducts = await res2.json();
    console.log("props:",featuredProducts)
    console.log(trendingProducts)
    return {
        props: {
            featuredProducts,
            trendingProducts,
            ...(await serverSideTranslations(locale, ['common']))
        },
        revalidate: 60,
    }
}
