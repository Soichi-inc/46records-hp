import { getArtistsList } from "@/lib/microcms";
import ArtistCard from "@/components/artists/ArtistCard";
import SplitText from "@/components/ui/SplitText";

export const metadata = {
  title: "ARTISTS",
  description: "46Records所属アーティスト一覧。",
};

export const revalidate = 3600;

export default async function ArtistsPage() {
  const artistsData = await getArtistsList();

  return (
    <div className="min-h-screen bg-white pt-44 pb-32 px-8 md:px-16 lg:px-24">
      {/* Page Title */}
      <div className="mb-16">
        <SplitText
          as="h1"
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900"
        >
          ARTISTS
        </SplitText>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {artistsData.contents.map((artist, index) => (
          <ArtistCard key={artist.id} artist={artist} index={index} />
        ))}
      </div>
    </div>
  );
}
