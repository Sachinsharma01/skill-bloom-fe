
import { CheckCircle, Zap, Shield, Rocket } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />,
      title: "Lightning Fast Loading",
      description: "Optimized for speed. Your portfolio loads in milliseconds, keeping visitors engaged."
    },
    {
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />,
      title: "Mobile-First Design",
      description: "Looks stunning on every device. 80% of recruiters browse on mobile first."
    },
    {
      icon: <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />,
      title: "SEO Optimized",
      description: "Built to rank high on Google. Get discovered by top companies and clients."
    }
  ];

  const features = [
    "Modern, trendy design that stands out",
    "Easy customization - no coding required",
    "Professional layout that converts visitors",
    "Dark/light theme support",
    "Contact form integration",
    "Social media integration",
    "Project showcase sections",
    "About me personalization",
    "Skills & expertise display",
    "Testimonials section",
    "Blog/articles integration",
    "Analytics ready"
  ];

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent px-4 sm:px-0">
            Why This Portfolio Will Change Your Career
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            Don't let a boring portfolio hold you back. Stand out from thousands of applicants with a design that speaks your language.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 px-4 sm:px-0">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 sm:p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex justify-center mb-3 sm:mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white mx-4 sm:mx-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                Everything You Need to Succeed
              </h3>
              <p className="text-lg sm:text-xl text-purple-100 mb-6 sm:mb-8">
                This isn't just a template - it's your career accelerator. Built with the latest tech and design trends that recruiters love.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
