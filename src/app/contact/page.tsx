import React from "react";
import { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { FadeUp } from "@/components/ui/Motion";
import { getBranches, getSiteSettings } from "@/lib/db-services";

export const metadata: Metadata = {
  title: "Contact & Admissions | DK Dance Company Kozhikode & UK",
  description:
    "Contact DK Dance Company head office in Kozhikode or Bournemouth UK. Enquire about admissions, workshop bookings, and choreography projects with Director Dhanesh Krishnan.",
};

export default async function ContactPage() {
  const [branches, settings] = await Promise.all([
    getBranches(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white pt-32 pb-24">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-16">
          <FadeUp>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-dk-yellow" />
              <span className="editorial-eyebrow text-neutral-400">
                GET IN TOUCH
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-extrabold uppercase tracking-tight leading-[0.9] text-white max-w-4xl mb-8">
              Contact Us
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed">
              Begin your dance journey with DK Dance Company. Submit an admission
              enquiry or connect directly with our studio administration.
            </p>
          </FadeUp>
        </section>

        {/* Contact Grid: Details on Left, Form on Right */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-12">
              <FadeUp delay={0.1}>
                <div>
                  <span className="editorial-eyebrow text-dk-red block mb-3">
                    Head Office
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold uppercase tracking-tight text-white mb-4">
                    Kozhikode, Kerala, India
                  </h2>
                  <div className="space-y-4 text-sm text-neutral-300">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-1" />
                      <span>{settings.contact.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-neutral-500 shrink-0" />
                      <a
                        href={`tel:${settings.contact.phone}`}
                        className="hover:text-dk-yellow font-mono transition-colors"
                      >
                        {settings.contact.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                      <a
                        href={`mailto:${settings.contact.email}`}
                        className="hover:text-dk-yellow font-mono transition-colors"
                      >
                        {settings.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-neutral-500 shrink-0" />
                      <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
                    </div>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="p-6 bg-neutral-950 border border-neutral-900">
                  <span className="editorial-eyebrow text-dk-yellow block mb-2">
                    Direct Leadership
                  </span>
                  <h3 className="text-lg font-heading font-bold uppercase text-white mb-1">
                    Director Dhanesh Krishnan
                  </h3>
                  <p className="text-xs text-neutral-400 mb-4">
                    Artistic Director & Head Choreographer
                  </p>
                  <a
                    href={`https://wa.me/${settings.contact.whatsapp}?text=${encodeURIComponent("Hello Director Dhanesh Krishnan, I would like to enquire about DK Dance Company.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase text-[#25D366] hover:underline"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Direct Desk</span>
                  </a>
                </div>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-4">
                    Active Studio Locations
                  </span>
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono uppercase text-neutral-400">
                    {branches.map((b) => (
                      <div
                        key={b.slug}
                        className="p-3 bg-neutral-950 border border-neutral-900"
                      >
                        <span className="text-white block font-heading">{b.name}</span>
                        <span className="text-neutral-500 text-[10px]">{b.city}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <FadeUp delay={0.15}>
                <div className="mb-6">
                  <span className="editorial-eyebrow text-dk-yellow block mb-2">
                    ADMISSIONS DESK
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold uppercase tracking-tight text-white">
                    Submit Admission Enquiry
                  </h2>
                </div>
                <ContactForm branches={branches} />
              </FadeUp>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton variant="floating" />
    </>
  );
}
