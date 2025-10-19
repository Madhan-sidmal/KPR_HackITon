import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnvironmentalCorrelationEngine from "@/components/EnvironmentalCorrelationEngine";

const CorrelationEnginePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <EnvironmentalCorrelationEngine />
      </main>
      <Footer />
    </div>
  );
};

export default CorrelationEnginePage;
