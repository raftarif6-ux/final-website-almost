import React from 'react';
import { motion } from 'motion/react';
import { Check, CreditCard, Send, UploadCloud, CheckCircle2 } from 'lucide-react';

export type StepId = 1 | 2 | 3 | 4;

interface StepperProps {
  currentStep: StepId;
}

const STEPS = [
  { id: 1, title: 'Select Method', shortTitle: 'Method', icon: CreditCard },
  { id: 2, title: 'Send Payment', shortTitle: 'Pay', icon: Send },
  { id: 3, title: 'Upload Receipt', shortTitle: 'Receipt', icon: UploadCloud },
  { id: 4, title: 'Download eBook', shortTitle: 'Download', icon: CheckCircle2 },
];

export const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-2 sm:px-4 mb-8 sm:mb-12">
      <div className="relative">
        {/* Background Track Line */}
        <div className="absolute top-5 left-6 right-6 sm:left-10 sm:right-10 h-0.5 bg-[#2A3441] -translate-y-1/2 z-0" />

        {/* Animated Filled Line (Pure Luxury Gold matching the website theme) */}
        <motion.div
          className="absolute top-5 left-6 sm:left-10 h-0.5 bg-gradient-to-r from-[#c59b27] via-[#ffd166] to-[#f3e7be] shadow-[0_0_12px_rgba(255,209,102,0.6)] -translate-y-1/2 z-0"
          initial={{ width: '0%' }}
          animate={{
            width: `calc(${progressPercent}% - ${progressPercent === 100 ? 0 : 20}px)`,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Steps Nodes */}
        <div className="relative z-10 flex items-center justify-between">
          {STEPS.map((step) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex flex-col items-center group">
                {/* Step Circle */}
                <div className="relative">
                  {isCurrent && (
                    <motion.div
                      className="absolute -inset-1.5 rounded-full bg-[#ffd166]/20 border border-[#ffd166]/40 pointer-events-none"
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.6, 0.9, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}

                  <motion.div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-mono text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                      isCompleted
                        ? 'bg-gradient-to-br from-[#ffd166] to-[#c59b27] text-[#07090C] border-[#ffd166] shadow-[0_0_15px_rgba(255,209,102,0.4)]'
                        : isCurrent
                        ? 'bg-[#171D25] text-[#ffd166] border-[#ffd166] shadow-[0_0_20px_rgba(255,209,102,0.35)]'
                        : 'bg-[#10151C] text-[#8c919d] border-[#2A3441]'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      >
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                      </motion.div>
                    ) : (
                      <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    )}
                  </motion.div>
                </div>

                {/* Step Label */}
                <div className="mt-2 text-center">
                  <span
                    className={`block font-['Geist'] text-[11px] sm:text-xs tracking-wider transition-colors uppercase ${
                      isCurrent
                        ? 'text-[#ffd166] font-semibold'
                        : isCompleted
                        ? 'text-[#F3F0E8] font-medium'
                        : 'text-[#8c919d]'
                    }`}
                  >
                    <span className="hidden sm:inline">{step.title}</span>
                    <span className="inline sm:hidden">{step.shortTitle}</span>
                  </span>
                  <span className="hidden sm:block text-[9px] font-mono text-[#8c919d] mt-0.5">
                    Step {step.id}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
