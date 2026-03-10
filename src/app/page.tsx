import HeroSlider from "@/components/home/HeroSlider";
import AboutSection from "@/components/home/AboutSection";
import VideoSection from "@/components/home/VideoSection";
import NewsCarousel from "@/components/home/NewsCarousel";
import SolutionSection from "@/components/home/SolutionSection";
import SideNav from "@/components/layout/SideNav";
import { getNewsList } from "@/lib/microcms";

export default async function Home() {
  const newsData = await getNewsList({ limit: 8 });

  return (
    <>
      <SideNav />
      <HeroSlider />
      <AboutSection />
      <VideoSection />
      <NewsCarousel news={newsData.contents} />
      <SolutionSection />
    </>
  );
}
