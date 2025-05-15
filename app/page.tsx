import DecisionForm from "@/components/partials/decision-form";
import Header from "@/components/partials/header";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center font-[family-name:var(--font-geist-nunito)] scroll-none overflow-hidden"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <Header />
      <DecisionForm />
    </div>
  );
}
