import PageLayout from "@/components/PageLayout";
import ContentCard from "@/components/ContentCard";

export default function ContactUsPage() {
  return (
    <PageLayout>
      <ContentCard className="bg-zinc-700">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-zinc-300 mb-6">
          Have a question or need to get in touch? Fill out the form
          below or reach us directly at:
        </p>

        {/* Static info */}
        <div className="mb-6 space-y-2 text-zinc-200">
          <p>
            Email:{" "}
            <a
              href="mailto:freshlifechurch@email.org"
              className="hover:underline"
            >
              freshlifechurch@email.org
            </a>
          </p>
          <p>Phone: (614) 123-4567</p>
          <p>
            Address: 3593 Refugee Rd Suite C-D, Columbus, OH 43232
          </p>
        </div>
      </ContentCard>
    </PageLayout>
  );
}
