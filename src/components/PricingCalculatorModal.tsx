import React, { useState } from 'react';
import { X, Calculator, ArrowRight } from 'lucide-react';
import { CURRENCY_RATES } from '../data/ebookData';

interface PricingCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: keyof typeof CURRENCY_RATES;
  onOpenDirectory: () => void;
}

export const PricingCalculatorModal: React.FC<PricingCalculatorModalProps> = ({
  isOpen,
  onClose,
  currency,
  onOpenDirectory,
}) => {
  const [modelType, setModelType] = useState<'retainer' | 'project' | 'product'>('retainer');
  const [targetIncome, setTargetIncome] = useState<number>(2000);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(8);
  const [ratePerItem, setRatePerItem] = useState<number>(500);

  if (!isOpen) return null;

  const symbol = CURRENCY_RATES[currency].symbol;
  const monthlyHours = hoursPerWeek * 4;
  const impliedHourlyRate = Math.round(targetIncome / (monthlyHours || 1));
  const requiredUnits = Math.ceil(targetIncome / (ratePerItem || 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#10151C] border border-[#2A3441] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2A3441] flex items-center justify-between bg-[#171D25]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#282a2e] flex items-center justify-center text-[#ffd166]">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Newsreader'] text-lg text-[#F3F0E8]">Side Hustle Pricing Calculator</span>
                <span className="px-2 py-0.5 rounded bg-[#282a2e] text-[#ffd166] font-['Geist'] text-[10px] uppercase font-semibold">
                  Bonus 03 Tool
                </span>
              </div>
              <p className="font-['Geist'] text-[11px] text-[#8c919d]">Pre-engineered financial model to structure your hourly & retainer rates</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[#8c919d] hover:text-[#F3F0E8] rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Calculator Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <label className="font-['Geist'] text-xs uppercase text-[#8c919d] tracking-wider block mb-2 font-medium">
              Select Monetization Model
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setModelType('retainer');
                  setRatePerItem(500);
                }}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  modelType === 'retainer'
                    ? 'border-[#ffd166] bg-[#ffd166]/10 text-[#F3F0E8]'
                    : 'border-[#2A3441] bg-[#171D25] text-[#8c919d] hover:border-[#ffd166]'
                }`}
              >
                <span className="font-['Geist'] text-xs font-semibold block text-[#ffd166]">Monthly Retainer</span>
                <span className="font-['Geist'] text-[10px] text-[#8c919d]">e.g. Concierge Bot / Content</span>
              </button>
              <button
                onClick={() => {
                  setModelType('project');
                  setRatePerItem(350);
                }}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  modelType === 'project'
                    ? 'border-[#6EA8FF] bg-[#6EA8FF]/10 text-[#F3F0E8]'
                    : 'border-[#2A3441] bg-[#171D25] text-[#8c919d] hover:border-[#6EA8FF]'
                }`}
              >
                <span className="font-['Geist'] text-xs font-semibold block text-[#6EA8FF]">Fixed Project</span>
                <span className="font-['Geist'] text-[10px] text-[#8c919d]">e.g. Workflow Audit / Slide Deck</span>
              </button>
              <button
                onClick={() => {
                  setModelType('product');
                  setRatePerItem(29);
                }}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  modelType === 'product'
                    ? 'border-[#b4c8e3] bg-[#b4c8e3]/10 text-[#F3F0E8]'
                    : 'border-[#2A3441] bg-[#171D25] text-[#8c919d] hover:border-[#6EA8FF]'
                }`}
              >
                <span className="font-['Geist'] text-xs font-semibold block text-[#b4c8e3]">Digital Product</span>
                <span className="font-['Geist'] text-[10px] text-[#8c919d]">e.g. Notion OS / Prompt Pack</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1 font-['Geist'] text-xs">
                <span className="text-[#c2c6d3]">Target Monthly Earnings:</span>
                <span className="text-[#ffd166] font-semibold text-base font-mono">{symbol}{targetIncome.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={targetIncome}
                onChange={(e) => setTargetIncome(Number(e.target.value))}
                className="w-full accent-[#ffd166] bg-[#282a2e] h-2 rounded cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1 font-['Geist'] text-xs">
                <span className="text-[#c2c6d3]">Available Hours Per Week:</span>
                <span className="text-[#6EA8FF] font-semibold text-base font-mono">{hoursPerWeek} hrs/week</span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                step="1"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full accent-[#6EA8FF] bg-[#282a2e] h-2 rounded cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1 font-['Geist'] text-xs">
                <span className="text-[#c2c6d3]">
                  {modelType === 'retainer' ? 'Retainer Fee / Client / Mo:' : modelType === 'project' ? 'Project Pricing / Client:' : 'Product Retail Price:'}
                </span>
                <span className="text-[#b4c8e3] font-semibold text-base font-mono">{symbol}{ratePerItem.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={modelType === 'product' ? 9 : 100}
                max={modelType === 'product' ? 149 : 2500}
                step={modelType === 'product' ? 5 : 50}
                value={ratePerItem}
                onChange={(e) => setRatePerItem(Number(e.target.value))}
                className="w-full accent-[#b4c8e3] bg-[#282a2e] h-2 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Results Bento Box */}
          <div className="p-5 bg-[#171D25] rounded-xl border border-[#2A3441] space-y-4">
            <span className="font-['Geist'] text-[10px] uppercase text-[#ffd166] tracking-wider block font-semibold">
              Calculated Operational Target
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#10151C] p-3 rounded-lg border border-[#2A3441]">
                <span className="text-[#8c919d] text-[10px] block font-['Geist'] uppercase">Required Volume</span>
                <span className="text-xl font-mono text-[#F3F0E8] font-semibold mt-0.5 block">
                  {requiredUnits} {modelType === 'retainer' ? 'Clients' : modelType === 'project' ? 'Projects / Mo' : 'Sales / Mo'}
                </span>
              </div>
              <div className="bg-[#10151C] p-3 rounded-lg border border-[#2A3441]">
                <span className="text-[#8c919d] text-[10px] block font-['Geist'] uppercase">Effective Hourly Value</span>
                <span className="text-xl font-mono text-[#ffd166] font-semibold mt-0.5 block">
                  {symbol}{impliedHourlyRate} / hr
                </span>
              </div>
              <div className="bg-[#10151C] p-3 rounded-lg border border-[#2A3441]">
                <span className="text-[#8c919d] text-[10px] block font-['Geist'] uppercase">Weekly Delivery Load</span>
                <span className="text-xl font-mono text-[#6EA8FF] font-semibold mt-0.5 block">
                  {modelType === 'retainer' && requiredUnits > 0 ? (hoursPerWeek / requiredUnits).toFixed(1) : (hoursPerWeek / Math.max(requiredUnits, 1)).toFixed(1)} hrs
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#2A3441] bg-[#171D25] flex justify-between items-center">
          <button
            onClick={() => {
              onClose();
              onOpenDirectory();
            }}
            className="text-xs text-[#ffd166] hover:underline flex items-center gap-1 font-['Geist'] cursor-pointer"
          >
            <span>Match with 30 Specific Blueprints</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#282a2e] text-[#F3F0E8] rounded font-['Geist'] text-xs uppercase tracking-wider hover:bg-[#333538] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
