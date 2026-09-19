import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import ContactBanner from "../../components/contact/ContactBanner";
import ContactInfoCards from "../../components/contact/ContactInfoCards";
import ContactFormSection from "../../components/contact/ContactFormSection";

export const metadata = {
  title: "Contact Us - Skill Aura Academy",
  description: "Get in touch with Skill Aura Academy. Official support, phone number, and email.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F2F3F5] flex flex-col font-sans">
      {/* Header */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Contact Banner */}
        <ContactBanner />

        {/* Contact Info Cards */}
        <ContactInfoCards />

        {/* Contact Form & Slanted Image Section */}
        <ContactFormSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
