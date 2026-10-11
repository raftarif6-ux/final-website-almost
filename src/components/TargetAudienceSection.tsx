import React from 'react';
import { Search, GraduationCap, Briefcase, BookOpen } from 'lucide-react';

export const TargetAudienceSection: React.FC = () => {
  return (
    <section className="w-full bg-[#1e2023] px-6 lg:px-12 py-16 border-t border-[#2A3441]/50">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="max-w-2xl">
          <span className="font-['Geist'] text-[10px] text-[#ffd166] uppercase tracking-widest block mb-1 font-semibold">
            Target Audience
          </span>
          <h2 className="font-['Newsreader'] text-3xl sm:text-4xl text-[#e2e2e7] font-normal">
            Built for the curious beginner.
          </h2>
          <p className="font-['Geist'] text-sm sm:text-base text-[#c2c6d3] mt-2">
            Engineered intentionally for motivated people seeking clarity, not for algorithmic theorists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#1a1c1f] border border-[#2A3441] p-6 rounded-xl space-y-3 shadow-md hover:border-[#ffd166] transition-colors">
            <Search className="w-7 h-7 text-[#ffd166]" />
            <h4 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">Curious Beginners</h4>
            <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] leading-relaxed">
              Individuals intrigued by AI headlines who want a practical, step-by-step introduction to generative workflows without technical jargon.
            </p>
          </div>

          <div className="bg-[#1a1c1f] border border-[#2A3441] p-6 rounded-xl space-y-3 shadow-md hover:border-[#a8c8ff] transition-colors">
            <GraduationCap className="w-7 h-7 text-[#a8c8ff]" />
            <h4 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">Ambitious Students</h4>
            <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] leading-relaxed">
              Learners seeking flexible, self-paced micro-income streams that fit around university schedules and develop in-demand digital competencies.
            </p>
          </div>

          <div className="bg-[#1a1c1f] border border-[#2A3441] p-6 rounded-xl space-y-3 shadow-md hover:border-[#b4c8e3] transition-colors">
            <Briefcase className="w-7 h-7 text-[#b4c8e3]" />
            <h4 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">Aspiring Freelancers</h4>
            <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] leading-relaxed">
              Service professionals wanting to add modern AI services to their existing offerings to win better clients and charge higher rates.
            </p>
          </div>

          <div className="bg-[#1a1c1f] border border-[#2A3441] p-6 rounded-xl space-y-3 shadow-md hover:border-[#ffd166] transition-colors">
            <BookOpen className="w-7 h-7 text-[#ffd166]" />
            <h4 className="font-['Newsreader'] text-xl text-[#e2e2e7] font-normal">Digital Creators</h4>
            <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] leading-relaxed">
              Writers, designers, and curators aiming to scale their creative output by integrating AI as an assistant to reduce repetitive tasks.
            </p>
          </div>
        </div>

        {/* Grounding Reality Check */}
        <div className="p-6 rounded-xl bg-[#1a1c1f] border-l-4 border-[#ffd166] border border-t-[#2A3441] border-r-[#2A3441] border-b-[#2A3441] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-['Geist'] text-[10px] text-[#ffd166] uppercase font-semibold">
              Responsible Disclosure & Scope
            </span>
            <p className="font-['Geist'] text-xs sm:text-sm text-[#c2c6d3] max-w-3xl leading-relaxed">
              This educational publication provides frameworks, workflows, and actionable guidance. It does not promise instant wealth or automated financial windfalls. Success depends on disciplined execution, market demand, and your personal effort.
            </p>
          </div>
          <span className="font-['Geist'] text-[10px] text-[#8c919d] uppercase tracking-wider shrink-0 font-mono">
            Ethical AI Standards
          </span>
        </div>
      </div>
    </section>
  );
};
