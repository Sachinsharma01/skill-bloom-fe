
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-16 bg-edtech-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Join thousands of students already learning on our platform.
            Get unlimited access to all courses for one affordable monthly price.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-edtech-primary hover:bg-gray-100 px-8 font-medium">
              Get Started Today
            </Button>
            <Button variant="outline" size="lg" className="border-white text-edtech-secondary hover:bg-white/20">
              View Pricing Plans
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
