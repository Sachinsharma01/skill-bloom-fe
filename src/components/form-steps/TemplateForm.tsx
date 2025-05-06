
import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { NavigationButtons } from './NavigationButtons';
import { Check } from 'lucide-react';
import { TEMPLATES } from '../../utils/constants';
import { cn } from '../../utils/index';

export function TemplateForm() {
  const { formData, setSelectedTemplate } = usePortfolio();
  const { selectedTemplate } = formData;

  return (
    <div className="form-section">
      <h2 className="text-2xl font-bold mb-6">Select a Template</h2>
      
      <div className="mb-6">
        <p className="text-muted-foreground">
          Choose a template that best showcases your skills and personality. You can preview each template to see how your portfolio will look.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {TEMPLATES.map((template) => (
          <div
            key={template.id}
            className={cn(
              "relative overflow-hidden border-2 rounded-lg transition-all",
              selectedTemplate === template.id 
                ? "border-primary shadow-lg scale-[1.02]" 
                : "border-gray-200 hover:border-gray-300"
            )}
            onClick={() => setSelectedTemplate(template.id)}
          >
            {selectedTemplate === template.id && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-scale-in">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div className="aspect-[3/4] bg-gray-100 transition-all">
              <img
                src={`/lovable-uploads/${
                  template.id === 'original' ? 'acd5abf1-07c1-4d8e-a61a-2101d8b5a6e7.png' :
                  template.id === 'dark' ? '0f761ed6-161e-45f7-a3a7-80287b5320a0.png' :
                  template.id === 'clean' ? '360f1210-53c5-4c7b-8e3c-cec8e345c74e.png' :
                  template.id === 'matrix' ? '9ea782d4-ed0c-45a8-89d6-e827dca43823.png' :
                  template.id === 'starforce' ? '8beae037-9a50-42ef-92fe-b8c91cd34971.png' :
                  '8beae037-9a50-42ef-92fe-b8c91cd34971.png' // Default fallback
                }`}
                alt={template.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4 bg-white">
              <h3 className="font-medium text-lg">{template.name}</h3>
              <p className="text-sm text-gray-500">{template.description}</p>
            </div>
          </div>
        ))}
      </div>

      <NavigationButtons nextLabel="Generate Portfolio" />
    </div>
  );
}
