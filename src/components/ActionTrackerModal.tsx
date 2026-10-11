import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Circle, Calendar, RotateCcw } from 'lucide-react';

interface ActionTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MilestoneDay {
  day: number;
  week: 1 | 2 | 3 | 4;
  title: string;
  category: string;
  description: string;
}

const ROADMAP_DAYS: MilestoneDay[] = [
  { day: 1, week: 1, title: 'Complete Skills Assessment Matrix', category: 'Orientation', description: 'Review the 30 Blueprints Directory and score your existing interests.' },
  { day: 2, week: 1, title: 'Select Your Single Primary Vehicle', category: 'Orientation', description: 'Commit to 1 specific side hustle model to eliminate decision fatigue.' },
  { day: 3, week: 1, title: 'Set Up Core Model Accounts', category: 'Tooling', description: 'Create ChatGPT Plus or Claude 3.5 Sonnet accounts and bookmark key directories.' },
  { day: 4, week: 1, title: 'Run the Foundation Prompts Test', category: 'Prompting', description: 'Execute the 3 primary prompt chains from Bonus Artifact 01.' },
  { day: 5, week: 1, title: 'Define Your Micro-Offer Scope', category: 'Offer', description: 'Clearly write out what you will deliver in 48 hours for your pilot client.' },
  { day: 6, week: 1, title: 'Establish Local File Structure', category: 'Workspace', description: 'Organize your Google Drive or Notion workspace for client artifacts.' },
  { day: 7, week: 1, title: 'Week 1 Review & Calibration', category: 'Review', description: 'Check your progress and prepare for asset production.' },
  { day: 8, week: 2, title: 'Draft Specimen Artifact #01', category: 'Production', description: 'Build your first sample deliverable (e.g. sample newsletter, bot prototype).' },
  { day: 9, week: 2, title: 'Refine & Polish Specimen #01', category: 'Production', description: 'Run secondary prompt passes to elevate tone, design, and layout.' },
  { day: 10, week: 2, title: 'Draft Specimen Artifact #02', category: 'Production', description: 'Create a second variation tailored to an alternative client niche.' },
  { day: 11, week: 2, title: 'Draft Specimen Artifact #03', category: 'Production', description: 'Create your third high-contrast specimen showing versatility.' },
  { day: 12, week: 2, title: 'Build 1-Page Minimalist Portfolio', category: 'Packaging', description: 'Assemble the 3 specimens on a clean Notion public page or Carrd link.' },
  { day: 13, week: 2, title: 'Run Pricing Calculator', category: 'Financials', description: 'Set your initial introductory pricing using Bonus Artifact 03.' },
  { day: 14, week: 2, title: 'Week 2 Review: Portfolio Complete', category: 'Review', description: 'Ensure your 3 specimens look authoritative and ready to show.' },
  { day: 15, week: 3, title: 'Compile Target Prospect List (20 Leads)', category: 'Outreach', description: 'Identify 20 local businesses or creators who have a noticeable gap in their workflow.' },
  { day: 16, week: 3, title: 'Personalize Outreach Script #01', category: 'Outreach', description: 'Customize the first 5 cold pitches using Bonus Artifact 02 templates.' },
  { day: 17, week: 3, title: 'Deploy Batch 1 Outreach (5 Emails)', category: 'Execution', description: 'Send out the first 5 personalized messages. Offer 2-minute Loom preview.' },
  { day: 18, week: 3, title: 'Deploy Batch 2 Outreach (5 Emails)', category: 'Execution', description: 'Send out 5 more pitches and track open rates / responses.' },
  { day: 19, week: 3, title: 'Deploy Batch 3 Outreach (5 Emails)', category: 'Execution', description: 'Send out batch 3 and follow up on any initial replies.' },
  { day: 20, week: 3, title: 'Deploy Batch 4 Outreach (5 Emails)', category: 'Execution', description: 'Complete your 20-lead outreach target.' },
  { day: 21, week: 3, title: 'Handle Initial Inquiries & Calls', category: 'Discovery', description: 'Schedule brief 15-minute alignment calls with interested prospects.' },
  { day: 22, week: 4, title: 'Secure First Pilot Client', category: 'Closing', description: 'Lock in your first paid or discounted case-study project.' },
  { day: 23, week: 4, title: 'Execute Project Deliverable', category: 'Delivery', description: 'Generate and review the agreed assets using your validated AI tool stack.' },
  { day: 24, week: 4, title: 'Deliver Specimen to Client', category: 'Delivery', description: 'Hand over deliverables 24 hours ahead of deadline for maximum delight.' },
  { day: 25, week: 4, title: 'Incorporate Revisions', category: 'Refinement', description: 'Perform any minor tweaks requested by the client.' },
  { day: 26, week: 4, title: 'Invoice & Payment Collection', category: 'Revenue', description: 'Collect payment via EasyPaisa, JazzCash, or bank transfer.' },
  { day: 27, week: 4, title: 'Request Written Testimonial', category: 'Social Proof', description: 'Send the 3-question testimonial framework from Chapter 3.' },
  { day: 28, week: 4, title: 'Pitch Ongoing Monthly Retainer', category: 'Recurring', description: 'Offer to handle this workflow on a monthly subscription retainer.' },
  { day: 29, week: 4, title: 'Document System & Reusable Prompts', category: 'Scale', description: 'Save your perfected prompt templates in your master knowledge base.' },
  { day: 30, week: 4, title: 'Month 1 Milestone Achieved', category: 'Milestone', description: 'Celebrate your first AI-powered income! Plan expansion for Month 2.' }
];

export const ActionTrackerModal: React.FC<ActionTrackerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('nexora_completed_days');
      return saved ? JSON.parse(saved) : [1, 2];
    } catch {
      return [1, 2];
    }
  });

  const [activeWeek, setActiveWeek] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    try {
      localStorage.setItem('nexora_completed_days', JSON.stringify(completedDays));
    } catch (e) {
      console.error(e);
    }
  }, [completedDays]);

  if (!isOpen) return null;

  const toggleDay = (day: number) => {
    if (completedDays.includes(day)) {
      setCompletedDays(completedDays.filter(d => d !== day));
    } else {
      setCompletedDays([...completedDays, day]);
    }
  };

  const progressPercent = Math.round((completedDays.length / 30) * 100);

  const resetProgress = () => {
    if (confirm('Reset your 30-day tracker progress?')) {
      setCompletedDays([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#10151C] border border-[#2A3441] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2A3441] flex items-center justify-between bg-[#171D25]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#282a2e] flex items-center justify-center text-[#ffd166]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Newsreader'] text-lg text-[#F3F0E8]">30-Day Action Roadmap & Milestone Tracker</span>
                <span className="px-2 py-0.5 rounded bg-[#282a2e] text-[#ffd166] font-['Geist'] text-[10px] uppercase font-semibold">
                  Bonus 04 Interactive
                </span>
              </div>
              <p className="font-['Geist'] text-[11px] text-[#8c919d]">Day-by-day actionable cadence to launch without overwhelm</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[#8c919d] hover:text-[#F3F0E8] rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Overview Bar */}
        <div className="px-6 py-4 bg-[#171D25]/70 border-b border-[#2A3441] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-full bg-[#10151C] border border-[#2A3441] flex items-center justify-center font-mono font-bold text-[#ffd166]">
              {progressPercent}%
            </div>
            <div>
              <span className="font-['Geist'] text-xs text-[#F3F0E8] font-semibold block">
                {completedDays.length} of 30 Milestones Completed
              </span>
              <span className="font-['Geist'] text-[11px] text-[#8c919d]">
                {completedDays.length === 30 ? '🎉 Congratulations! Complete Launch Achieved!' : 'Keep momentum: complete 1 milestone daily.'}
              </span>
            </div>
          </div>
          <button
            onClick={resetProgress}
            className="p-1.5 rounded text-[#8c919d] hover:text-[#F3F0E8] hover:bg-[#282a2e] transition-colors text-xs flex items-center gap-1 font-['Geist'] cursor-pointer"
            title="Reset progress"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Week Switcher Tabs */}
        <div className="px-6 py-2 bg-[#10151C] border-b border-[#2A3441] flex items-center gap-2 overflow-x-auto">
          {([1, 2, 3, 4] as const).map((w) => {
            const weekTasks = ROADMAP_DAYS.filter(d => d.week === w);
            const weekDone = weekTasks.filter(d => completedDays.includes(d.day)).length;
            return (
              <button
                key={w}
                onClick={() => setActiveWeek(w)}
                className={`px-4 py-2 rounded-lg font-['Geist'] text-xs uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeWeek === w
                    ? 'bg-[#282a2e] text-[#ffd166] border border-[#ffd166]/40 font-semibold'
                    : 'bg-[#171D25] text-[#8c919d] hover:text-[#c2c6d3]'
                }`}
              >
                <span>Week 0{w}</span>
                <span className="px-1.5 py-0.2 rounded bg-[#10151C] text-[10px] font-mono text-[#ffd166]">
                  {weekDone}/{weekTasks.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Task List */}
        <div className="p-6 space-y-3 flex-1 overflow-y-auto">
          {ROADMAP_DAYS.filter(d => d.week === activeWeek).map((item) => {
            const isCompleted = completedDays.includes(item.day);
            return (
              <div
                key={item.day}
                onClick={() => toggleDay(item.day)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isCompleted
                    ? 'bg-[#171D25]/40 border-[#ffd166]/40 opacity-80'
                    : 'bg-[#171D25] border-[#2A3441] hover:border-[#ffd166]'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-[#ffd166] focus:outline-none"
                  aria-label={isCompleted ? `Mark Day ${item.day} incomplete` : `Mark Day ${item.day} complete`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-[#ffd166] fill-[#ffd166]/20" />
                  ) : (
                    <Circle className="w-5 h-5 text-[#8c919d]" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-[#ffd166]">DAY {item.day < 10 ? `0${item.day}` : item.day}</span>
                    <span className="px-2 py-0.5 rounded bg-[#282a2e] text-[#8c919d] font-['Geist'] text-[10px] uppercase font-semibold">
                      {item.category}
                    </span>
                  </div>
                  <h4 className={`font-['Newsreader'] text-base text-[#F3F0E8] font-normal ${isCompleted ? 'line-through text-[#8c919d]' : ''}`}>
                    {item.title}
                  </h4>
                  <p className="font-['Geist'] text-xs text-[#8c919d] mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#2A3441] bg-[#171D25] flex justify-between items-center">
          <span className="text-xs text-[#8c919d] font-['Geist']">
            Progress is stored locally in your browser session.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#282a2e] text-[#F3F0E8] rounded font-['Geist'] text-xs uppercase tracking-wider hover:bg-[#333538] cursor-pointer"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
