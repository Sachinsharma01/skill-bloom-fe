
import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { NavigationButtons } from './NavigationButtons';
import { toast } from 'sonner';
import { Certificate } from '../../types';
import { Calendar } from 'lucide-react';

export function CertificatesForm() {
  const { formData, updateCertificate, addCertificate, removeCertificate } = usePortfolio();
  const { certificates } = formData;
  
  const [newCertificate, setNewCertificate] = useState({
    name: '',
    issuer: '',
    date: ''
  });

  const handleAddCertificate = () => {
    if (!newCertificate.name || !newCertificate.issuer) {
      toast.error('Certificate name and issuer are required');
      return;
    }
    
    addCertificate({
      name: newCertificate.name,
      issuer: newCertificate.issuer,
      date: newCertificate.date
    });
    
    setNewCertificate({
      name: '',
      issuer: '',
      date: ''
    });
    
    toast.success('Certificate added successfully');
  };

  // Group certificates by issuer
  const codebasicsCerts = certificates.filter(cert => cert.issuer === 'Codebasics');
  const otherCerts = certificates.filter(cert => cert.issuer !== 'Codebasics');

  return (
    <div className="form-section">
      <h2 className="text-2xl font-bold mb-6">Awards and Certificates</h2>
      
      <div className="space-y-8">
        {/* Codebasics Certificates */}
        {codebasicsCerts.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Codebasics Certificates:</h3>
            
            <div className="space-y-4">
              {codebasicsCerts.map((cert) => (
                <div key={cert.id} className="flex items-start space-x-3 p-4 border rounded-md hover:bg-gray-50">
                  <Checkbox
                    id={`cert-${cert.id}`}
                    checked={cert.selected}
                    onCheckedChange={(checked) => updateCertificate(cert.id, checked as boolean)}
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor={`cert-${cert.id}`}
                      className="text-base font-medium cursor-pointer"
                    >
                      {cert.name}
                    </Label>
                    {cert.date && (
                      <p className="text-sm text-gray-500">{cert.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Certificates */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Other Certificates:</h3>
          
          {otherCerts.length > 0 ? (
            <div className="space-y-4">
              {otherCerts.map((cert) => (
                <div key={cert.id} className="flex items-start justify-between p-4 border rounded-md hover:bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id={`cert-${cert.id}`}
                      checked={cert.selected}
                      onCheckedChange={(checked) => updateCertificate(cert.id, checked as boolean)}
                    />
                    <div>
                      <Label
                        htmlFor={`cert-${cert.id}`}
                        className="text-base font-medium cursor-pointer"
                      >
                        {cert.name}
                      </Label>
                      <p className="text-sm text-gray-500">
                        {cert.issuer}{cert.date && ` • ${cert.date}`}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      removeCertificate(cert.id);
                      toast.success('Certificate removed');
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic">No additional certificates added yet</p>
          )}
          
          <div className="mt-6 border p-4 rounded-md bg-gray-50">
            <h4 className="font-medium mb-4">Add New Certificate</h4>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="certName">Certificate Name</Label>
                  <Input
                    id="certName"
                    placeholder="Advanced Data Analytics Certification"
                    value={newCertificate.name}
                    onChange={(e) => setNewCertificate({...newCertificate, name: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="certIssuer">Issuing Organization</Label>
                    <Input
                      id="certIssuer"
                      placeholder="Google"
                      value={newCertificate.issuer}
                      onChange={(e) => setNewCertificate({...newCertificate, issuer: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="certDate" className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Date
                    </Label>
                    <Input
                      id="certDate"
                      type="month"
                      value={newCertificate.date}
                      onChange={(e) => setNewCertificate({...newCertificate, date: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="button" onClick={handleAddCertificate}>
                  Add Certificate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NavigationButtons />
    </div>
  );
}
