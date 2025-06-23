import { useState } from 'react'
import HeroSection from '../../../components/portfolio/marketing/HeroSection'
import BenefitsSection from '../../../components/portfolio/marketing/BenefitsSection'
import PreviewSection from '../../../components/portfolio/marketing/PreviewSection'
import PricingSection from '../../../components/portfolio/marketing/PricingSection'
import DemoModal from '../../../components/portfolio/marketing/DemoModal'
import { useToast } from '../../../hooks/use-toast'
import Navbar from '../../../components/common/Navbar'

const PortfolioMarketing = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false)
  const { toast } = useToast()

  const handleBuy = () => {
    toast({
      title: 'Ready to purchase! 🚀',
      description: 'Redirecting to secure checkout...',
    })
    // Here you would integrate with your payment system
    console.log('Redirecting to payment...')
  }

  const handlePreview = () => {
    setIsDemoOpen(true)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection
        onPreview={handlePreview}
        onBuy={handleBuy}
      />
      <BenefitsSection />
      <PreviewSection onPreview={handlePreview} />
      <PricingSection onBuy={handleBuy} />

      <DemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </div>
  )
}

export default PortfolioMarketing
