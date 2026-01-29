
import { RegionalThreatMap } from "@/components/home/RegionalThreatMap";
import { AdvisoriesFeed } from "@/components/home/AdvisoriesFeed";
import { WhistleblowerSection } from "@/components/home/WhistleblowerSection";
import { InfoSections } from "@/components/home/InfoSections";
import { NewsSection } from "@/components/home/NewsSection";


export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Top Section: Threat Intelligence */}

      <section className="w-full">
        <div className="h-full">
          <RegionalThreatMap />
        </div>
      </section>

      {/* Advisories Feed */}
      <AdvisoriesFeed />

      {/* Cyber Fraud News Section */}
      <NewsSection />

      {/* Reporting CTA */}
      <WhistleblowerSection />

      {/* Informational Areas */}
      <InfoSections />


    </div>
  );
}
