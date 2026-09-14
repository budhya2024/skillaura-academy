import React from "react";

export default function ContactMap() {
  return (
    <section className="w-full relative h-[450px] bg-slate-200 overflow-hidden">
      {/* Embedded Responsive Google Map */}
      <iframe
        title="Skill Aura Academy Office Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8013146445585!2d77.6373!3d12.9121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae149a4f6d895b%3A0x6b1076b1f2e1df23!2sHSR%20Layout%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full filter saturate-[0.8] contrast-[1.05]"
      ></iframe>
    </section>
  );
}
