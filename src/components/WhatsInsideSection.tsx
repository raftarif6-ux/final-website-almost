import React, { useState } from 'react';
import { CheckCircle, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface WhatsInsideSectionProps {
  onOpenPreview: () => void;
  onOpenDirectory: () => void;
}

export const WhatsInsideSection: React.FC<WhatsInsideSectionProps> = ({
  onOpenPreview,
  onOpenDirectory,
}) => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const toggleSection = (idx: number) => {
    setExpandedSection(expandedSection === idx ? null : idx);
  };

  const sections = [
    {
      code: 'SEC 01',
      color: 'text-[#ffd166]',
      title: 'Foundations of Computational Leverage',
      pages: 'Pages 08 – 32',
      summary: 'Cognitive orientation, selecting the primary LLM stack, avoiding common pitfalls, and ethical constraints.',
      subtopics: [
        'The Tri-Tier Cognitive Workflow (Discovery, Synthesis, Artifact)',
        'Free vs. Paid LLM Benchmarking (ChatGPT Plus vs. Claude 3.5 Sonnet)',
        'Prompt Injection & Context Window Architecture Explained Simply',
        'Commercial Copyright & Intellectual Property Disclosure Rules'
      ]
    },
    {
      code: 'SEC 02',
      color: 'text-[#a8c8ff]',
      title: 'The 30 Practical Side Hustles Directory',
      pages: 'Pages 33 – 142',
      summary: 'Detailed breakdowns with time requirements, beginner difficulty ratings, and day-one checklists for each hustle.',
      subtopics: [
        'Vector 01: Content & Creative Workflows (10 Complete Blueprints)',
        'Vector 02: Service-Oriented Client Solutions (10 Complete Blueprints)',
        'Vector 03: Digital Assets & Automation Products (10 Complete Blueprints)',
        'Comparative Matrix: Time vs. Tech Barrier vs. Earning Velocity'
      ],
      action: 'Browse 30 Blueprints'
    },
    {
      code: 'SEC 03',
      color: 'text-[#b4c8e3]',
      title: 'Client Discovery & Acquisition Protocol',
      pages: 'Pages 143 – 184',
      summary: 'Zero-ad-spend cold outreach methodologies, portfolio drafting without prior client projects, and pricing models.',
      subtopics: [
        'The Specimen Strategy: How to build 3 portfolio proof pieces in 48 hours',
        'Finding High-Friction Local Businesses on Google Maps & LinkedIn',
        'The 90-Word Cold Pitch Architecture (94% Deliverability)',
        'Structuring $500 – $1,500/mo Retainers that Clients Gladly Keep'
      ]
    },
    {
      code: 'SEC 04',
      color: 'text-[#ffd166]',
      title: 'The 30-Day Operational Execution Matrix',
      pages: 'Pages 185 – 216',
      summary: 'Structured daily operational tasks designed to get you past decision paralysis and launch your first asset.',
      subtopics: [
        'Week 01: Orientation, Skills Assessment & Stack Setup',
        'Week 02: Artifact Production & Minimalist Portfolio Assembling',
        'Week 03: 20-Lead Outreach Cadence & Pitch Follow-ups',
        'Week 04: Delivering Your Pilot & Converting to Monthly Recurring Retainer'
      ]
    }
  ];

  return (
    <section className="w-full bg-[#0c0e11] px-6 lg:px-12 py-16 border-t border-[#2A3441]/40" id="whats-inside">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="max-w-2xl">
          <span className="font-['Geist'] text-[10px] text-[#ffd166] uppercase tracking-widest block mb-1 font-semibold">
            Archival Blueprint
          </span>
          <h2 className="font-['Newsreader'] text-3xl sm:text-4xl text-[#e2e2e7] font-normal">
            Knowledge, organized for action.
          </h2>
          <p className="font-['Geist'] text-sm sm:text-base text-[#c2c6d3] mt-2">
            A definitive curriculum designed to take you from basic conceptual awareness to launching your first automated side revenue channel within 30 days.
          </p>
        </div>

        {/* TOC Table Container */}
        <div className="bg-[#1a1c1f] border border-[#2A3441] rounded-xl overflow-hidden shadow-xl divide-y divide-[#2A3441]/40">
          {sections.map((sec, idx) => (
            <div key={idx} className="group hover:bg-[#1e2023] transition-colors">
              <div
                onClick={() => toggleSection(idx)}
                className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-start md:items-center gap-4">
                  <span className={`font-mono text-xs ${sec.color} bg-[#10151C] border border-[#2A3441] px-3 py-1.5 rounded font-semibold`}>
                    {sec.code}
                  </span>
                  <div>
                    <h3 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">
                      {sec.title}
                    </h3>
                    <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] mt-0.5">
                      {sec.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="px-3 py-1 rounded-full bg-[#10151C] border border-[#2A3441] text-[#8c919d] font-['Geist'] text-[11px] uppercase">
                    {sec.pages}
                  </span>
                  <CheckCircle className="w-5 h-5 text-[#ffd166]" />
                  {expandedSection === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#8c919d]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#8c919d]" />
                  )}
                </div>
              </div>

              {/* Expandable Module Detail */}
              {expandedSection === idx && (
                <div className="px-6 md:px-8 pb-6 pt-2 bg-[#171D25]/60 border-t border-[#2A3441]/30">
                  <span className="font-['Geist'] text-[10px] text-[#8c919d] uppercase tracking-wider block mb-2 font-semibold">
                    Core Module Breakdowns Included in this Volume:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {sec.subtopics.map((item, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs font-['Geist'] text-[#c2c6d3]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ffd166]"></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={onOpenPreview}
                      className="text-xs text-[#ffd166] hover:underline flex items-center gap-1 font-['Geist'] cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Preview excerpt from {sec.code}</span>
                    </button>
                    {sec.action && (
                      <button
                        onClick={onOpenDirectory}
                        className="text-xs text-[#a8c8ff] hover:underline flex items-center gap-1 font-['Geist'] ml-4 cursor-pointer"
                      >
                        <span>Open 30 Blueprints Catalog →</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
