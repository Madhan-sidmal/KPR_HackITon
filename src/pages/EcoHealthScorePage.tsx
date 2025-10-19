import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EcoHealthScore from "@/components/EcoHealthScore";

const EcoHealthScorePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <EcoHealthScore />
      </main>
      <Footer />
    </div>
  );
};

export default EcoHealthScorePage;
