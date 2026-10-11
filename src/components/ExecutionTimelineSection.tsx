import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

interface ExecutionTimelineSectionProps {
  onOpenTracker: () => void;
}

export const ExecutionTimelineSection: React.FC<ExecutionTimelineSectionProps> = ({
  onOpenTracker,
}) => {
  return (
    <section id="execution-timeline" className="w-full bg-[#0c0e11] px-6 lg:px-12 py-16 border-t border-[#2A3441]/40">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-['Geist'] text-[10px] text-[#ffd166] uppercase tracking-widest block mb-1 font-semibold">
              Structured Cadence
            </span>
            <h2 className="font-['Newsreader'] text-3xl sm:text-4xl text-[#e2e2e7] font-normal">
              The 30-Day Execution Timeline
            </h2>
            <p className="font-['Geist'] text-sm sm:text-base text-[#c2c6d3] mt-2">
              Break through inertia. Here is what your first four weeks look like inside the guide.
            </p>
          </div>
          <button
            onClick={onOpenTracker}
            className="px-5 py-2.5 rounded-lg bg-[#282a2e] border border-[#2A3441] text-[#ffd166] hover:bg-[#333538] font-['Geist'] text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shrink-0 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Open Interactive 30-Day Checklist</span>
          </button>
        </div>

        {/* Horizontal Weekly Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Week 1 */}
          <div className="bg-[#1e2023] border border-[#2A3441] p-6 rounded-xl space-y-4 shadow-md hover:border-[#ffd166] transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-['Geist'] text-[10px] text-[#ffd166] uppercase font-semibold">
                Week 01
              </span>
              <span className="w-2 h-2 rounded-full bg-[#ffd166]"></span>
            </div>
            <h3 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">Orientation & Selection</h3>
            <ul className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] space-y-2">
              <li>• Complete the Skills Assessment Matrix</li>
              <li>• Select 1 of 30 specific side hustle paths</li>
              <li>• Establish your primary tool stack accounts</li>
              <li>• Test fundamental prompting frameworks</li>
            </ul>
          </div>

          {/* Week 2 */}
          <div className="bg-[#1e2023] border border-[#2A3441] p-6 rounded-xl space-y-4 shadow-md hover:border-[#a8c8ff] transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-['Geist'] text-[10px] text-[#a8c8ff] uppercase font-semibold">
                Week 02
              </span>
              <span className="w-2 h-2 rounded-full bg-[#a8c8ff]"></span>
            </div>
            <h3 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">Asset Creation & Proof</h3>
            <ul className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] space-y-2">
              <li>• Generate 3 mock work specimens</li>
              <li>• Assemble a single-page digital portfolio</li>
              <li>• Run price calculations with Bonus 03</li>
              <li>• Refine output quality using custom prompts</li>
            </ul>
          </div>

          {/* Week 3 */}
          <div className="bg-[#1e2023] border border-[#2A3441] p-6 rounded-xl space-y-4 shadow-md hover:border-[#b4c8e3] transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-['Geist'] text-[10px] text-[#b4c8e3] uppercase font-semibold">
                Week 03
              </span>
              <span className="w-2 h-2 rounded-full bg-[#b4c8e3]"></span>
            </div>
            <h3 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">Client & Market Outreach</h3>
            <ul className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] space-y-2">
              <li>• Identify 25 prospective local or remote leads</li>
              <li>• Personalize Bonus 02 cold outreach scripts</li>
              <li>• Initiate the outreach protocol</li>
              <li>• Collect feedback and adjust your message</li>
            </ul>
          </div>

          {/* Week 4 */}
          <div className="bg-[#1e2023] border border-[#2A3441] p-6 rounded-xl space-y-4 shadow-md hover:border-[#ffd166] transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-['Geist'] text-[10px] text-[#ffd166] uppercase font-semibold">
                Week 04
              </span>
              <span className="w-2 h-2 rounded-full bg-[#ffd166]"></span>
            </div>
            <h3 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">Delivery & Systemization</h3>
            <ul className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] space-y-2">
              <li>• Onboard first pilot client or customer</li>
              <li>• Deliver synthetic assets per schedule</li>
              <li>• Collect initial testimonial & reference</li>
              <li>• Automate daily administrative tasks</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
