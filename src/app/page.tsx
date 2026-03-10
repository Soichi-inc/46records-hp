import HeroSlider from "@/components/home/HeroSlider";
import AboutSection from "@/components/home/AboutSection";
import VideoSection from "@/components/home/VideoSection";
import ArtistsSection from "@/components/home/ArtistsSection";
import NewsCarousel from "@/components/home/NewsCarousel";
import SolutionSection from "@/components/home/SolutionSection";
import SideNav from "@/components/layout/SideNav";
import { getNewsList, getArtistsList } from "@/lib/microcms";

export default async function Home() {
  const [newsData, artistsData] = await Promise.all([
    getNewsList({ limit: 8 }),
    getArtistsList(),
  ]);

  return (
    <>
      <SideNav />
      <HeroSlider />
      <AboutSection />
      <VideoSection />
      <ArtistsSection artists={artistsData.contents} />
      <NewsCarousel news={newsData.contents} />
      <SolutionSection />
    </>
  );
}
