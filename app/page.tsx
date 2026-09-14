import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import HeroSlider from "../components/home/HeroSlider";
import Features from "../components/home/Features";
import AboutSection from "../components/home/AboutSection";
import CounterSection from "../components/home/CounterSection";
import CoursesSection from "../components/home/CoursesSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import FaqSection from "../components/home/FaqSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F2F3F5] flex flex-col font-sans">
      {/* Navigation Header */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Hero Slider */}
        <HeroSlider />

        {/* Features Highlights */}
        <Features />

        {/* About Section */}
        <AboutSection />

        {/* Counter / Stats Section */}
        <CounterSection />

        {/* Courses Section */}
        <CoursesSection />

        {/* Testimonials Section (Fixed Background) */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
