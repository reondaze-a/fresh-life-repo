import PageLayout from "@/components/PageLayout";
import ContentCard from "@/components/ContentCard";

export default function SermonsPage() {
  return (
    <PageLayout>
      <ContentCard className={"bg-[#0a0a0a]"}>
        <h1 className="mb-4 md:text-5xl text-4xl font-bold text-white">
          Sermons
        </h1>
        <h2 className="md:text-3xl mb-4 text-2xl text-white">
          We are here to help you deepen your faith and discover your
          purpose
        </h2>
        <p className="text-white">
          Since 2000, we&apos;ve already developed a place to be the
          center of growing in the faith of Jesus, being a fresh
          person in God. What began as a small gathering has grown
          into a living, breathing movement—anchored in truth, driven
          by purpose, and filled with people who believe that life in
          Christ is anything but ordinary.
        </p>
      </ContentCard>
      <ContentCard className={"bg-[#0a0a0a]"}>
        <h1 className="mb-4 md:text-5xl text-4xl font-bold text-white">
          At Fresh Life Church, we are family
        </h1>
        <h2 className="md:text-3xl mb-4 text-2xl text-white">
          We are here to help you deepen your faith and discover your
          purpose
        </h2>
        <p className="text-white">
          Since 2000, we&apos;ve already developed a place to be the
          center of growing in the faith of Jesus, being a fresh
          person in God. What began as a small gathering has grown
          into a living, breathing movement—anchored in truth, driven
          by purpose, and filled with people who believe that life in
          Christ is anything but ordinary.
        </p>
      </ContentCard>
    </PageLayout>
  );
}
