import PageLayout from "@/components/PageLayout";
import HeroCard from "@/components/HeroCard";
import ContentCard from "@/components/ContentCard";
import GridCard from "@/components/GridCard";
import ImageCarousel from "@/components/ImageCarousel";

export default function HomePage() {
  const cardButtonClass =
    "mt-4 rounded-3xl px-4 py-2 font-semibold transition-all duration-300 active:scale-95 active:text-orange-500 ease-in-out hover:text-orange-500 cursor-pointer";

  return (
    <PageLayout>
      <HeroCard
        title="Welcome to Fresh Life Church"
        subtitle="We're happy to have you here. God bless!"
        buttonPrimary="Connect with us"
        buttonSecondary="Learn more"
        images={[
          "/images/hero-1.png",
          "/images/hero-2.png",
          "/images/hero-3.png",
        ]}
      />

      <ContentCard className="bg-zinc-900">
        <h2 className="mb-4 text-3xl font-bold">
          His name implies His missions
        </h2>
        <p className="text-lg text-zinc-200">
          No matter where you are, online or in person, always let God
          be in your journey.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 px-1 md:grid-cols-3">
          <GridCard title="Church Centre">
            <p>
              Want to join our church? Find our location through the
              link below.
            </p>
            <button className={cardButtonClass}>
              Find a location →
            </button>
          </GridCard>

          <GridCard title="Live Streams">
            <p>
              Don't have time to come to church? Don't worry! We also
              have live streams every Sunday.
            </p>
            <button className={cardButtonClass}>
              Visit our channel →
            </button>
          </GridCard>

          <GridCard title="Move to serve">
            <p>
              Serving could be hard at first, but we all start
              somewhere. Join us and learn more about all the ways you
              can serve.
            </p>
            <button className={cardButtonClass}>
              Join to serve →
            </button>
          </GridCard>

          <GridCard title="Sermon Series" className="md:col-span-3">
            <p>
              Check out our latest series shared by our pastor, all in
              one blog page.
            </p>
            <button className={cardButtonClass}>
              Sermon series →
            </button>
          </GridCard>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="mb-4 text-3xl font-bold">
          No other name greater than Jesus
        </h2>
        <p className="mb-6 text-zinc-200">
          There are always new ways to participate in what God is
          doing through our life, including events, services, worship
          music, and so much more.
        </p>
        <ImageCarousel
          images={[
            "/images/Image-04.png",
            "/images/Image-05.png",
            "/images/Image-06.png",
          ]}
        />
      </ContentCard>
    </PageLayout>
  );
}

