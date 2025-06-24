import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import ContactForm from "../../components/contact/ContactForm";
import FAQ from "../../components/common/FAQ";

const ContactInfo = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-start space-x-3">
    <div className="mt-1 rounded-full bg-brand-teal/10 p-3 text-brand-teal">
      {icon}
    </div>
    <div>
      <h4 className="font-medium text-brand-blue-dark">{title}</h4>
      <div className="mt-1 text-sm text-gray-600">{children}</div>
    </div>
  </div>
);

const Contact = () => {
  window.scrollTo({ top: 0, left: 0 });
  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Have questions about our resources or need support with your
              career journey? We're here to help!
            </p>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 space-y-6 mb-8">
              <h3 className="text-2xl font-serif font-bold text-brand-blue-dark mb-6">
                Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ContactInfo icon={<Mail size={20} />} title="Email Us">
                  {/* <a href="mailto:info@eduplatform.com" className="hover:text-brand-teal transition-colors">
                    info@eduplatform.com
                  </a>
                  <br />*/}
                  <a
                    href="mailto:support@skillbloom.in"
                    className="hover:text-brand-teal transition-colors"
                  >
                    support@skillbloom.in
                  </a>
                </ContactInfo>

                {/*<ContactInfo icon={<Phone size={20} />} title="Call Us">
                  <a href="tel:+1-800-123-4567" className="hover:text-brand-teal transition-colors">
                    +1-800-123-4567
                  </a>
                  <p className="mt-1 text-xs text-gray-500">
                    Mon-Fri: 9:00 AM - 6:00 PM EST
                  </p>
                </ContactInfo>
                
                <ContactInfo icon={<MapPin size={20} />} title="Visit Us">
                  <p>
                    123 Learning Street<br />
                    Education City, EC 12345<br />
                    United States
                  </p>
                </ContactInfo> */}

                <ContactInfo icon={<Clock size={20} />} title="Business Hours">
                  <p>
                    All Days - 09:00 AM - 11:00 PM
                    <br />
                  </p>
                </ContactInfo>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="mb-8">
              <ContactForm />
            </div>

            {/* FAQ Section */}
            {/* <div className="mb-8">
              <FAQ />
            </div> */}

            {/* Connect With Us Section */}
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
              <h3 className="text-2xl font-serif font-bold text-brand-blue-dark mb-6">
                Connect With Us
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Follow us on social media to stay updated with the latest
                resources and offers.
              </p>
              <div className="flex space-x-4">
                {/* <a href="#" className="bg-brand-blue-light/10 hover:bg-brand-blue-light/20 text-brand-blue-dark p-3 rounded-full transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="bg-brand-blue-light/10 hover:bg-brand-blue-light/20 text-brand-blue-dark p-3 rounded-full transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="bg-brand-blue-light/10 hover:bg-brand-blue-light/20 text-brand-blue-dark p-3 rounded-full transition-colors">
                  <Instagram size={20} />
                </a> */}
                <a
                  href="https://www.linkedin.com/company/skill-bloom"
                  target="_blank"
                  className="bg-brand-blue-light/10 hover:bg-brand-blue-light/20 text-brand-blue-dark p-3 rounded-full transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
