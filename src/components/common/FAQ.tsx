
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I enroll in a course?",
    answer: "To enroll in a course, browse our course catalog, select the course you're interested in, and click the 'Enroll Now' button. You'll be guided through the payment process, after which you'll gain immediate access to the course materials."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and bank transfers for course payments. For enterprise solutions, we also offer invoicing options."
  },
  {
    question: "Can I get a refund if I'm not satisfied with a course?",
    answer: "Yes, we offer a 30-day money-back guarantee for all our courses. If you're not satisfied with your purchase, you can request a full refund within 30 days of enrollment, no questions asked."
  },
  {
    question: "How long do I have access to a course after purchasing?",
    answer: "Once you purchase a course, you have lifetime access to all course materials, updates, and community discussions. You can learn at your own pace and revisit the content whenever you need a refresher."
  },
  {
    question: "Do you offer any discounts for students or educators?",
    answer: "Yes, we offer special discounts for students, educators, and non-profit organizations. Please contact our support team with valid credentials to receive your discount code."
  }
];

const FAQ = () => {
  return (
    <div className="bg-brand-gray-light rounded-lg p-6 md:p-8">
      <h3 className="text-2xl font-serif font-bold text-brand-blue-dark mb-6">Frequently Asked Questions</h3>
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-medium text-brand-blue-light hover:text-brand-teal">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <div className="mt-8 text-center">
        <p className="text-brand-blue-light mb-2">
          Don't see your question here?
        </p>
        <p className="text-sm text-gray-600">
          Contact our support team and we'll get back to you as soon as possible.
        </p>
      </div>
    </div>
  );
};

export default FAQ;
