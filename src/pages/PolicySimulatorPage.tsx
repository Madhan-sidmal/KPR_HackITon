import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PolicySimulator from "@/components/PolicySimulator";

const PolicySimulatorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <PolicySimulator />
      </main>
      <Footer />
    </div>
  );
};

export default PolicySimulatorPage;
