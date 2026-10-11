import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

// Landing Page Components
import { Header } from './components/Header';
import { AnnouncementBar } from './components/AnnouncementBar';
import { HeroSection } from './components/HeroSection';
import { PurchaseSummarySection } from './components/PurchaseSummarySection';
import { EditorialStatementSection } from './components/EditorialStatementSection';
import { OpportunityLandscapeSection } from './components/OpportunityLandscapeSection';
import { WhatsInsideSection } from './components/WhatsInsideSection';
import { InteractivePreviewSection } from './components/InteractivePreviewSection';
import { BonusesSection } from './components/BonusesSection';
import { BeginnerJourneySection } from './components/BeginnerJourneySection';
import { ExecutionTimelineSection } from './components/ExecutionTimelineSection';
import { TargetAudienceSection } from './components/TargetAudienceSection';
import { CorePillarsSection } from './components/CorePillarsSection';
import { AboutAuthorSection } from './components/AboutAuthorSection';
import { MasterConversionSection } from './components/MasterConversionSection';
import { DigitalDeliverySection } from './components/DigitalDeliverySection';
import { FaqSection } from './components/FaqSection';
import { ClosingNewsletterSection } from './components/ClosingNewsletterSection';
import { Footer } from './components/Footer';
import { ScrollBookAnimation } from './components/ScrollBookAnimation';
import { ScrollIndicators } from './components/ScrollIndicators';
import { InteractiveSectionBar } from './components/InteractiveSectionBar';

// Modals
import { ReadingSanctuaryModal } from './components/ReadingSanctuaryModal';
import { PricingCalculatorModal } from './components/PricingCalculatorModal';
import { ActionTrackerModal } from './components/ActionTrackerModal';
import { ToolsDirectoryModal } from './components/ToolsDirectoryModal';
import { BlueprintsExplorerModal } from './components/BlueprintsExplorerModal';
import { CheckoutVaultModal } from './components/CheckoutVaultModal';
import { PromptViewerModal } from './components/PromptViewerModal';

// Checkout Pages & Context
import { PaymentProvider } from './context/PaymentContext';
import { CheckoutPage } from './pages/CheckoutPage';
import { UploadReceiptPage } from './pages/UploadReceiptPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { SellerPortalPage } from './pages/SellerPortalPage';

import { CURRENCY_RATES } from './data/ebookData';
import { detectVisitorCountry } from './utils/pricing';

/**
 * Scroll to top on route change
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

/**
 * Complete Landing Page Component
 */
function LandingPage() {
  const navigate = useNavigate();
  const [currentCurrency, setCurrentCurrency] = useState<keyof typeof CURRENCY_RATES>('USD');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [directoryInitialVector, setDirectoryInitialVector] = useState<'ALL' | 'CREATE' | 'SERVE' | 'BUILD'>('ALL');
  const [isPromptsOpen, setIsPromptsOpen] = useState(false);
  const [promptsInitialTab, setPromptsInitialTab] = useState<'prompts' | 'scripts'>('prompts');

  // Country detection state
  const [country, setCountry] = useState<'PK' | 'INTL'>('PK'); // Default to PK for manual payment focus
  const [isLoadingCountry, setIsLoadingCountry] = useState(true);

  useEffect(() => {
    let isMounted = true;
    detectVisitorCountry().then((detected) => {
      if (isMounted) {
        setCountry(detected);
        setIsLoadingCountry(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggleCountry = () => {
    const next = country === 'PK' ? 'INTL' : 'PK';
    setCountry(next);
    try {
      localStorage.setItem('nexora_manual_country', next);
    } catch {}
  };

  // Every Buy / Checkout button navigates directly to /checkout
  const handleOpenCheckout = () => {
    navigate('/checkout');
  };

  // Bookmarking state
  const [savedBlueprints, setSavedBlueprints] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nexora_saved_blueprints');
      return saved ? JSON.parse(saved) : ['c1', 's1', 'b1'];
    } catch {
      return ['c1', 's1', 'b1'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nexora_saved_blueprints', JSON.stringify(savedBlueprints));
    } catch (e) {
      console.error(e);
    }
  }, [savedBlueprints]);

  const handleToggleSave = (id: string) => {
    if (savedBlueprints.includes(id)) {
      setSavedBlueprints(savedBlueprints.filter(b => b !== id));
    } else {
      setSavedBlueprints([...savedBlueprints, id]);
    }
  };

  const handleOpenDirectoryWithVector = (vector: 'CREATE' | 'SERVE' | 'BUILD' | 'ALL' = 'ALL') => {
    setDirectoryInitialVector(vector);
    setIsDirectoryOpen(true);
  };

  const handleOpenPromptsWithTab = (tab: 'prompts' | 'scripts') => {
    setPromptsInitialTab(tab);
    setIsPromptsOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#07090C] text-[#e2e2e7] flex flex-col font-['Geist'] selection:bg-[#6EA8FF]/20 selection:text-[#6EA8FF]">
      {/* Scroll Progress Bar & Floating Back-To-Top Button */}
      <ScrollIndicators />

      {/* 1. Header with Sticky Nav */}
      <Header
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        onOpenPreview={() => setIsPreviewOpen(true)}
        onOpenCheckout={handleOpenCheckout}
        onOpenDirectory={() => handleOpenDirectoryWithVector('ALL')}
        savedCount={savedBlueprints.length}
        country={country}
      />

      {/* Main Page Body */}
      <main className="w-full pt-20 bg-[#07090C] flex-1">
        {/* Announcement Header */}
        <AnnouncementBar />

        {/* Animated Interactive Section Bar */}
        <InteractiveSectionBar />

        {/* Cinematic Hero */}
        <HeroSection
          onOpenCheckout={handleOpenCheckout}
          onOpenPreview={() => setIsPreviewOpen(true)}
          onOpenDirectory={() => handleOpenDirectoryWithVector('ALL')}
          currentCurrency={currentCurrency}
          country={country}
        />

        {/* Cinematic Scroll-Driven 3D Animation Experience */}
        <ScrollBookAnimation />

        {/* Product Purchase Summary */}
        <PurchaseSummarySection
          onOpenCheckout={handleOpenCheckout}
          onOpenPreview={() => setIsPreviewOpen(true)}
          currentCurrency={currentCurrency}
          country={country}
          isLoadingCountry={isLoadingCountry}
        />

        {/* Editorial Product Statement */}
        <EditorialStatementSection />

        {/* The AI Opportunity Landscape */}
        <OpportunityLandscapeSection
          onOpenDirectory={handleOpenDirectoryWithVector}
        />

        {/* What's Inside (TOC & Curriculum) */}
        <WhatsInsideSection
          onOpenPreview={() => setIsPreviewOpen(true)}
          onOpenDirectory={() => handleOpenDirectoryWithVector('ALL')}
        />

        {/* Interactive eBook Preview Console */}
        <InteractivePreviewSection
          onOpenCheckout={handleOpenCheckout}
          onOpenSanctuaryModal={() => setIsPreviewOpen(true)}
        />

        {/* Five Bonus Resources Bento */}
        <BonusesSection
          onOpenPrompts={handleOpenPromptsWithTab}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenTracker={() => setIsTrackerOpen(true)}
          onOpenTools={() => setIsToolsOpen(true)}
        />

        {/* The Beginner Linear Journey */}
        <BeginnerJourneySection />

        {/* 30-Day Execution Timeline */}
        <ExecutionTimelineSection
          onOpenTracker={() => setIsTrackerOpen(true)}
        />

        {/* Target Audience & Reality Check */}
        <TargetAudienceSection />

        {/* Core Pillars */}
        <CorePillarsSection />

        {/* About the Author Section */}
        <AboutAuthorSection
          onOpenPreview={() => setIsPreviewOpen(true)}
          onOpenCheckout={handleOpenCheckout}
        />

        {/* Master Conversion Vault */}
        <MasterConversionSection
          onOpenCheckout={handleOpenCheckout}
          currentCurrency={currentCurrency}
          country={country}
          isLoadingCountry={isLoadingCountry}
          onToggleCountry={handleToggleCountry}
        />

        {/* Digital Delivery Specifications */}
        <DigitalDeliverySection />

        {/* FAQ Accordion */}
        <FaqSection />

        {/* Editorial Closing & Newsletter */}
        <ClosingNewsletterSection
          onOpenCheckout={handleOpenCheckout}
          currentCurrency={currentCurrency}
        />
      </main>

      {/* Footer */}
      <Footer
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        onOpenPreview={() => setIsPreviewOpen(true)}
        onOpenDirectory={() => handleOpenDirectoryWithVector('ALL')}
      />

      {/* Interactive Modals */}
      <ReadingSanctuaryModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onOpenCheckout={() => {
          setIsPreviewOpen(false);
          handleOpenCheckout();
        }}
      />
      <PricingCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        currency={currentCurrency}
        onOpenDirectory={() => {
          setIsCalculatorOpen(false);
          handleOpenDirectoryWithVector('ALL');
        }}
      />
      <ActionTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
      />
      <ToolsDirectoryModal
        isOpen={isToolsOpen}
        onClose={() => setIsToolsOpen(false)}
      />
      <BlueprintsExplorerModal
        isOpen={isDirectoryOpen}
        onClose={() => setIsDirectoryOpen(false)}
        savedBlueprints={savedBlueprints}
        onToggleSave={handleToggleSave}
        initialVector={directoryInitialVector}
      />
      <CheckoutVaultModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        currency={currentCurrency}
        country={country}
        onOpenPreview={() => {
          setIsCheckoutModalOpen(false);
          setIsPreviewOpen(true);
        }}
      />
      <PromptViewerModal
        isOpen={isPromptsOpen}
        onClose={() => setIsPromptsOpen(false)}
        initialTab={promptsInitialTab}
      />
    </div>
  );
}

/**
 * Animated Routes Wrapper for Smooth Transitions
 */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <LandingPage />
            </motion.div>
          }
        />
        <Route
          path="/checkout"
          element={
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <CheckoutPage />
            </motion.div>
          }
        />
        <Route
          path="/upload-receipt"
          element={
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <UploadReceiptPage />
            </motion.div>
          }
        />
        <Route
          path="/thank-you"
          element={
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ThankYouPage />
            </motion.div>
          }
        />
        <Route
          path="/download"
          element={
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ThankYouPage />
            </motion.div>
          }
        />
        <Route
          path="/seller"
          element={
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <SellerPortalPage />
            </motion.div>
          }
        />
        <Route
          path="/admin"
          element={<Navigate to="/seller" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PaymentProvider>
        <ScrollToTop />
        <AnimatedRoutes />
      </PaymentProvider>
    </BrowserRouter>
  );
}
