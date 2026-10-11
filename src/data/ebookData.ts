export interface BlueprintItem {
  id: string;
  vector: 'CREATE' | 'SERVE' | 'BUILD';
  number: string;
  title: string;
  category: string;
  description: string;
  timeRequirement: string;
  difficulty: 'Beginner' | 'Intermediate';
  starterStack: string[];
  earningsEstimate: string;
  dayOneAction: string;
}

export interface ToolItem {
  name: string;
  category: 'Writing' | 'Design & Visual' | 'Audio & Video' | 'Automation' | 'Web & Products';
  pricing: 'Free' | 'Freemium' | 'Paid';
  description: string;
  bestFor: string;
  urlHint: string;
}

export const BOOK_SPECIMEN_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCbEnrDAfHn_UAY5H8I_E5keXtDkh-cpprDgYVAj2c4p-cJw1uDqZA2PI9OLqNi7LTuPi_BZDB3wAqSYelnBzXAAdbWlhzmRS7CIvQgnVRYyMXMn4eS8hB0PjyHVDoRA5VC2A8ZZq3Dt_yYuLYzR6jSyLlpYqfVtVF30hBRGJmAwKs_sXOGbzP_-uFb3pCs3u4WQ1qUdyFaEShjWS-il0qqGt9W4Kx7a12-J7B77lpyk9l_gzyGFznnjm_d1ZpK7hbONSY";

export const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1, amount: 27 },
  EUR: { symbol: '€', rate: 0.92, amount: 25 },
  GBP: { symbol: '£', rate: 0.81, amount: 22 },
  ETH: { symbol: 'Ξ', rate: 0.00033, amount: 0.009 }
};

export const BLUEPRINTS: BlueprintItem[] = [
  // VECTOR 01: CREATE (10)
  {
    id: 'c1',
    vector: 'CREATE',
    number: '01',
    title: 'Niche Newsletter Synthesis',
    category: 'Content Curation',
    description: 'Curate weekly deep-dives on focused industries (clean tech, indie commerce, architecture) using LLMs to synthesize 40+ sources into 5 actionable minutes.',
    timeRequirement: '4-6 hrs / week',
    difficulty: 'Beginner',
    starterStack: ['ChatGPT', 'Substack', 'Canva'],
    earningsEstimate: '$600 - $2,500 / mo',
    dayOneAction: 'Pick 1 ultra-narrow topic and generate a 3-bullet pilot issue with prompt #04.'
  },
  {
    id: 'c2',
    vector: 'CREATE',
    number: '02',
    title: 'AI Children’s Book Illustration & Authoring',
    category: 'Digital Publishing',
    description: 'Author moral-driven children bedtime stories and create consistent visual characters using Midjourney/DALL-E for Amazon KDP print-on-demand.',
    timeRequirement: '6-8 hrs / book',
    difficulty: 'Beginner',
    starterStack: ['Claude 3.5', 'Midjourney', 'Canva KDP templates'],
    earningsEstimate: '$300 - $1,800 / mo (Royalties)',
    dayOneAction: 'Draft a 14-page storyboard with character consistency prompt seed.'
  },
  {
    id: 'c3',
    vector: 'CREATE',
    number: '03',
    title: 'Hyper-Local Social Media Content Engine',
    category: 'Local Marketing',
    description: 'Produce monthly 30-post visual calendars, captions, and localized reels scripts for brick-and-mortar restaurants, dentists, and fitness studios.',
    timeRequirement: '3-5 hrs / client / mo',
    difficulty: 'Beginner',
    starterStack: ['ChatGPT', 'CapCut', 'Buffer'],
    earningsEstimate: '$450 - $1,200 / client / mo',
    dayOneAction: 'Audit 3 local cafes in your area and mock up 5 sample promotional captions.'
  },
  {
    id: 'c4',
    vector: 'CREATE',
    number: '04',
    title: 'Curated Stock Photography & Texture Packs',
    category: 'Design Assets',
    description: 'Generate high-resolution texture maps, architectural mockups, and atmospheric backgrounds sold on Creative Market and Gumroad.',
    timeRequirement: '2-4 hrs / batch',
    difficulty: 'Beginner',
    starterStack: ['Midjourney v6.1', 'Upscayl', 'Gumroad'],
    earningsEstimate: '$200 - $900 / mo passive',
    dayOneAction: 'Upscale 20 minimalist concrete/linen textures and package into a .ZIP bundle.'
  },
  {
    id: 'c5',
    vector: 'CREATE',
    number: '05',
    title: 'Podcast Show Notes & Multi-Platform Repurposing',
    category: 'Audio Repurposing',
    description: 'Transform 60-minute audio recordings into timestamped show notes, Twitter/X threads, LinkedIn carousels, and blog articles for creators.',
    timeRequirement: '1.5 hrs / episode',
    difficulty: 'Beginner',
    starterStack: ['Whisper / Descript', 'Claude', 'Notion'],
    earningsEstimate: '$75 - $150 / episode',
    dayOneAction: 'Transcribe a 15-minute public podcast and generate an executive summary carousel.'
  },
  {
    id: 'c6',
    vector: 'CREATE',
    number: '06',
    title: 'Micro-eBook Ghostwriter for Niche Experts',
    category: 'Publishing & Lead Magnets',
    description: 'Help consultants turn their voice notes and recorded talks into 40-page authority eBooks used as high-converting lead magnets.',
    timeRequirement: '8-10 hrs / project',
    difficulty: 'Intermediate',
    starterStack: ['Otter.ai', 'Claude 3.5 Sonnet', 'Atticus'],
    earningsEstimate: '$800 - $2,200 / project',
    dayOneAction: 'Create a 5-step eBook structural outline template to show prospective coaches.'
  },
  {
    id: 'c7',
    vector: 'CREATE',
    number: '07',
    title: 'Faceless YouTube Storyboarding & Video Scripts',
    category: 'Video Production',
    description: 'Research intriguing historical mysteries, scientific explainers, or tech breakdowns and generate full voiceover scripts with visual cues.',
    timeRequirement: '4-6 hrs / script pack',
    difficulty: 'Beginner',
    starterStack: ['ChatGPT Plus', 'ElevenLabs', 'CapCut'],
    earningsEstimate: '$500 - $2,000 / mo',
    dayOneAction: 'Draft a 1,200-word retention-optimized script for a deep-sea exploration video.'
  },
  {
    id: 'c8',
    vector: 'CREATE',
    number: '08',
    title: 'Multilingual Blog Localization & Cultural Tuning',
    category: 'Localization',
    description: 'Translate and culturally adapt high-performing English technical and lifestyle blog articles into Spanish, German, or Japanese with natural nuances.',
    timeRequirement: '3-4 hrs / client / mo',
    difficulty: 'Intermediate',
    starterStack: ['DeepL Pro', 'ChatGPT', 'WordPress / Ghost'],
    earningsEstimate: '$400 - $1,500 / mo',
    dayOneAction: 'Translate a sample 1,000-word case study while maintaining brand voice tone.'
  },
  {
    id: 'c9',
    vector: 'CREATE',
    number: '09',
    title: 'AI Audio Ad Production & Sonic Branding',
    category: 'Commercial Audio',
    description: 'Produce broadcast-quality 30-second audio commercials for indie mobile games, podcasts, and local radio stations using synthetic studio voices.',
    timeRequirement: '1 hr / ad',
    difficulty: 'Beginner',
    starterStack: ['ElevenLabs', 'Audacity', 'Suno / Soundraw'],
    earningsEstimate: '$100 - $350 / spot',
    dayOneAction: 'Record a 30s spec commercial for a fictitious organic espresso roaster.'
  },
  {
    id: 'c10',
    vector: 'CREATE',
    number: '10',
    title: 'High-Converting Email Welcome Series Copywriter',
    category: 'Direct Response',
    description: 'Write 5-part automated email indoctrination series for Shopify storefronts and SaaS startups to turn new subscribers into buyers.',
    timeRequirement: '3 hrs / series',
    difficulty: 'Beginner',
    starterStack: ['ChatGPT', 'Klaviyo templates', 'Hemingway App'],
    earningsEstimate: '$350 - $900 / sequence',
    dayOneAction: 'Draft the "Founder Story & Surprise Gift" email from Bonus Pack Script #07.'
  },

  // VECTOR 02: SERVE (10)
  {
    id: 's1',
    vector: 'SERVE',
    number: '11',
    title: 'AI Customer Concierge Bot Implementer',
    category: 'Client Automation',
    description: 'Deploy custom-trained FAQ chatbots for local law firms, real estate agencies, and clinic websites to capture qualified appointments 24/7.',
    timeRequirement: '4 hrs / setup',
    difficulty: 'Beginner',
    starterStack: ['Voiceflow / Chatbase', 'OpenAI API', 'Wix / Webflow'],
    earningsEstimate: '$500 setup + $150/mo retainer',
    dayOneAction: 'Build a free demo bot on Chatbase loaded with a local dental clinic’s public FAQ.'
  },
  {
    id: 's2',
    vector: 'SERVE',
    number: '12',
    title: 'Local SEO & Google Business Profile Content Auditor',
    category: 'Local Search',
    description: 'Run automated audit reports on local businesses, generate optimized business descriptions, update weekly Q&As, and manage review responses.',
    timeRequirement: '2 hrs / business / mo',
    difficulty: 'Beginner',
    starterStack: ['Google Maps API / Sheets', 'Claude', 'Canva'],
    earningsEstimate: '$300 - $800 / client / mo',
    dayOneAction: 'Audit 5 nearby auto mechanics with missing Google Profile updates and generate proposal.'
  },
  {
    id: 's3',
    vector: 'SERVE',
    number: '13',
    title: 'B2B Lead Research & Account Enrichment',
    category: 'Sales Operations',
    description: 'Extract, clean, and enrich prospect lists for sales directors by summarizing company headcount, recent news triggers, and customized pitch angles.',
    timeRequirement: '5-8 hrs / batch',
    difficulty: 'Beginner',
    starterStack: ['Clay / Apollo', 'ChatGPT Plus', 'Google Sheets'],
    earningsEstimate: '$400 - $1,500 / project',
    dayOneAction: 'Enrich a test list of 20 VP Marketing leads with customized 1-sentence icebreakers.'
  },
  {
    id: 's4',
    vector: 'SERVE',
    number: '14',
    title: 'Executive Slide Deck & Presentation Polisher',
    category: 'Business Design',
    description: 'Transform ugly, text-heavy Google Slides and investor memos into clean, minimalist executive keynote presentations with custom diagrams.',
    timeRequirement: '3-5 hrs / deck',
    difficulty: 'Intermediate',
    starterStack: ['Gamma App', 'Tome', 'Figma / PowerPoint'],
    earningsEstimate: '$300 - $1,200 / deck',
    dayOneAction: 'Convert a 10-slide generic financial pitch into a sleek modern deck using Gamma.'
  },
  {
    id: 's5',
    vector: 'SERVE',
    number: '15',
    title: 'Small Business AI Workflow Auditor',
    category: 'Operations Consulting',
    description: 'Spend 90 minutes interviewing a small business owner, then deliver a tailored 10-page report showing where AI can save 15+ staff hours weekly.',
    timeRequirement: '3-4 hrs / client',
    difficulty: 'Intermediate',
    starterStack: ['Zapier', 'Make.com', 'Notion Report Template'],
    earningsEstimate: '$750 - $2,500 / audit',
    dayOneAction: 'Download the Workflow Audit Questionnaire from Bonus Vault and test on a friend.'
  },
  {
    id: 's6',
    vector: 'SERVE',
    number: '16',
    title: 'Automated Cold Outreach Pipeline Setup',
    category: 'Lead Gen',
    description: 'Set up secondary domains, email warm-ups, and AI-personalized outreach sequences for boutique marketing agencies and B2B SaaS founders.',
    timeRequirement: '6 hrs / implementation',
    difficulty: 'Intermediate',
    starterStack: ['Instantly.ai', 'Claude', 'Google Workspace'],
    earningsEstimate: '$800 - $2,000 / setup',
    dayOneAction: 'Set up a demo campaign structure using the 3 tested outreach script variations.'
  },
  {
    id: 's7',
    vector: 'SERVE',
    number: '17',
    title: 'Meeting Transcripts & Action Item Synthesis Service',
    category: 'Executive Support',
    description: 'Provide busy fractional executives with distilled 1-page executive memos and JIRA/Asana tasks directly extracted from Zoom/Teams calls.',
    timeRequirement: '1 hr / executive / day',
    difficulty: 'Beginner',
    starterStack: ['Fathom / Granola', 'ChatGPT', 'Slack'],
    earningsEstimate: '$500 - $1,500 / executive / mo',
    dayOneAction: 'Process a 30-min recorded team sprint call into an executive action table.'
  },
  {
    id: 's8',
    vector: 'SERVE',
    number: '18',
    title: 'Synthetic Competitor Intelligence Reports',
    category: 'Market Research',
    description: 'Generate monthly competitive benchmark digests tracking pricing changes, feature releases, and customer complaints across 5 competitors for founders.',
    timeRequirement: '3 hrs / report / mo',
    difficulty: 'Beginner',
    starterStack: ['Perplexity Pro', 'Browse AI', 'Notion'],
    earningsEstimate: '$400 - $1,000 / mo retainer',
    dayOneAction: 'Generate a competitor matrix across 3 popular note-taking tools using Perplexity.'
  },
  {
    id: 's9',
    vector: 'SERVE',
    number: '19',
    title: 'Resume & LinkedIn Executive Bio Modernizer',
    category: 'Career Services',
    description: 'Rewrite and optimize resumes and LinkedIn profiles for mid-career professionals targeting tech and corporate promotions with ATS optimization.',
    timeRequirement: '2 hrs / client',
    difficulty: 'Beginner',
    starterStack: ['Jobscan', 'ChatGPT', 'Canva Doc'],
    earningsEstimate: '$150 - $400 / client',
    dayOneAction: 'Reformat a public sample CV to achieve 90%+ ATS match score on target job listing.'
  },
  {
    id: 's10',
    vector: 'SERVE',
    number: '20',
    title: 'Local Real Estate Listing Copy & Virtual Staging',
    category: 'Real Estate Marketing',
    description: 'Provide realtors with compelling MLS property descriptions and digitally decluttered or furnished staging photos within a 24-hour turnaround.',
    timeRequirement: '1-2 hrs / listing',
    difficulty: 'Beginner',
    starterStack: ['VirtualStagingAI', 'ChatGPT Plus', 'BoxBrownie'],
    earningsEstimate: '$75 - $250 / listing',
    dayOneAction: 'Take a vacant room photo and generate a staged interior plus MLS pitch.'
  },

  // VECTOR 03: BUILD (10)
  {
    id: 'b1',
    vector: 'BUILD',
    number: '21',
    title: 'Notion AI Productivity System Architect',
    category: 'Digital Workspace',
    description: 'Design and sell industry-specific Notion OS templates (Freelancer OS, Real Estate CRM, Student Hub) packed with pre-configured AI summary prompts.',
    timeRequirement: '10 hrs / template build',
    difficulty: 'Beginner',
    starterStack: ['Notion', 'Gumroad', 'Loom walkthroughs'],
    earningsEstimate: '$300 - $3,000 / mo recurring',
    dayOneAction: 'Build a minimalist 3-database "Content Creator OS" with integrated prompt buttons.'
  },
  {
    id: 'b2',
    vector: 'BUILD',
    number: '22',
    title: 'Programmatic AI Prompt Matrices & Vaults',
    category: 'Digital Toolkits',
    description: 'Package deep prompt frameworks with variable inputs for specific professions (architects, realtors, HR heads) sold on digital marketplaces.',
    timeRequirement: '4 hrs / pack',
    difficulty: 'Beginner',
    starterStack: ['Airtable', 'Gumroad', 'PDF Design'],
    earningsEstimate: '$250 - $1,500 / mo',
    dayOneAction: 'Draft 20 high-value prompts for real estate agents handling client negotiations.'
  },
  {
    id: 'b3',
    vector: 'BUILD',
    number: '23',
    title: 'Automated Spreadsheet Financial Models & Formula Packs',
    category: 'Data Templates',
    description: 'Generate advanced Google Sheets / Excel templates with automatic formulas and AI app script buttons for budgeting, rental yields, and cash flow.',
    timeRequirement: '3-5 hrs / model',
    difficulty: 'Intermediate',
    starterStack: ['Google Sheets', 'ChatGPT Code Interpreter', 'Etsy / Gumroad'],
    earningsEstimate: '$400 - $2,200 / mo',
    dayOneAction: 'Create an automated "Small Business Monthly Cash Runway" spreadsheet.'
  },
  {
    id: 'b4',
    vector: 'BUILD',
    number: '24',
    title: 'No-Code Micro-Tool / Calculator Creator',
    category: 'Micro-SaaS',
    description: 'Build single-purpose web calculators (e.g. Freelance Rate Calculator, Solar ROI Estimator, Calorie Targeter) and monetize through affiliate links or sponsorships.',
    timeRequirement: '6-8 hrs / tool',
    difficulty: 'Intermediate',
    starterStack: ['Bubble / Softr / Glide', 'Airtable', 'Stripe'],
    earningsEstimate: '$200 - $1,800 / mo passive',
    dayOneAction: 'Deploy a live embeddable rate calculator on Softr in under 2 hours.'
  },
  {
    id: 'b5',
    vector: 'BUILD',
    number: '25',
    title: 'Custom GPTs & Assistant Knowledge Bases for Teams',
    category: 'Internal Tools',
    description: 'Build company-specific GPTs with customized internal policies, tone guides, and product catalog documentation for internal staff use.',
    timeRequirement: '3 hrs / setup',
    difficulty: 'Beginner',
    starterStack: ['OpenAI GPT Builder', 'PDF documentation', 'Zapier Actions'],
    earningsEstimate: '$400 - $1,200 / client',
    dayOneAction: 'Build a custom GPT that answers support questions using a mock company handbook.'
  },
  {
    id: 'b6',
    vector: 'BUILD',
    number: '26',
    title: 'Printable Digital Planners & Habit Trackers',
    category: 'Etsy Digital Products',
    description: 'Create high-resolution digital planners, daily gratitude journals, and quarterly goal trackers for iPad GoodNotes users and Etsy shoppers.',
    timeRequirement: '5 hrs / collection',
    difficulty: 'Beginner',
    starterStack: ['Canva Pro', 'Midjourney', 'Etsy Shop'],
    earningsEstimate: '$300 - $2,500 / mo passive',
    dayOneAction: 'Design a 30-day "Deep Focus & Digital Detox" printable checklist.'
  },
  {
    id: 'b7',
    vector: 'BUILD',
    number: '27',
    title: 'Curated Niche Job Board with AI Summaries',
    category: 'Niche Media',
    description: 'Aggregate and filter remote jobs in specialized niches (e.g., Climate Tech, AI Ethics, Fractional CFOs) and charge companies $49-$199 per featured post.',
    timeRequirement: '3 hrs / week',
    difficulty: 'Intermediate',
    starterStack: ['Softr / Webflow', 'Airtable', 'Make.com'],
    earningsEstimate: '$500 - $3,500 / mo',
    dayOneAction: 'Curate the top 15 remote operations jobs and publish on a free Airtable portal.'
  },
  {
    id: 'b8',
    vector: 'BUILD',
    number: '28',
    title: 'Framer / Webflow Landing Page Generation Service',
    category: 'Web Design',
    description: 'Quickly assemble responsive 1-page landing pages for new startups and local professionals using AI site generators, customized within 48 hours.',
    timeRequirement: '4-6 hrs / website',
    difficulty: 'Intermediate',
    starterStack: ['Framer AI / Relume', 'Figma', 'Unsplash'],
    earningsEstimate: '$600 - $1,800 / site',
    dayOneAction: 'Generate a clean 5-section landing page using Relume prompt builder.'
  },
  {
    id: 'b9',
    vector: 'BUILD',
    number: '29',
    title: 'Curated AI Tools Directory & Affiliate Portal',
    category: 'Directory Monetization',
    description: 'Build an indexed directory of specialized AI software tools (e.g., AI for Interior Designers, AI for Accountants) with affiliate commission tracking.',
    timeRequirement: '4 hrs / week',
    difficulty: 'Intermediate',
    starterStack: ['Typedream / Softr', 'Airtable', 'Rewardful'],
    earningsEstimate: '$300 - $2,000 / mo affiliate',
    dayOneAction: 'Catalog 25 specific AI tools for accounting and list on a clean directory page.'
  },
  {
    id: 'b10',
    vector: 'BUILD',
    number: '30',
    title: 'Niche Newsletter Sponsorship Brokerage',
    category: 'Creator Marketplace',
    description: 'Match micro-newsletters (under 5k readers) with emerging AI software sponsors, taking a 20% brokerage commission on every secured placement.',
    timeRequirement: '5-6 hrs / week',
    difficulty: 'Intermediate',
    starterStack: ['ChatGPT', 'Substack Directory', 'Hunter.io'],
    earningsEstimate: '$500 - $3,000 / mo',
    dayOneAction: 'Contact 10 indie Substack writers offering to pitch sponsors on their behalf.'
  }
];

export const CURATED_TOOLS: ToolItem[] = [
  { name: 'ChatGPT Plus', category: 'Writing', pricing: 'Freemium', description: 'Industry-standard large language model with Code Interpreter, Web Browsing, and custom GPTs.', bestFor: 'Drafting copy, strategic roadmaps, research', urlHint: 'chatgpt.com' },
  { name: 'Claude 3.5 Sonnet', category: 'Writing', pricing: 'Freemium', description: 'Exceptional nuanced prose, large 200k context window, and human-like voice synthesis.', bestFor: 'Long-form editorial, ghostwriting, complex reasoning', urlHint: 'claude.ai' },
  { name: 'Midjourney v6.1', category: 'Design & Visual', pricing: 'Paid', description: 'Hyper-detailed photographic rendering, textures, and bespoke commercial illustrations.', bestFor: 'Stock image generation, visual assets, book covers', urlHint: 'midjourney.com' },
  { name: 'Canva Magic Studio', category: 'Design & Visual', pricing: 'Freemium', description: 'All-in-one graphic design suite with AI layout generation, text-to-image, and background removal.', bestFor: 'Social graphics, eBook formatting, pitch decks', urlHint: 'canva.com' },
  { name: 'ElevenLabs', category: 'Audio & Video', pricing: 'Freemium', description: 'Studio-grade voice cloning, emotional text-to-speech, and synthetic voiceover mastering.', bestFor: 'Audiobooks, video voiceovers, podcast intros', urlHint: 'elevenlabs.io' },
  { name: 'CapCut AI', category: 'Audio & Video', pricing: 'Free', description: 'Automatic caption generation, dynamic b-roll insertion, and video aspect resizing.', bestFor: 'Shorts, Reels, and faceless video editing', urlHint: 'capcut.com' },
  { name: 'Make.com', category: 'Automation', pricing: 'Freemium', description: 'Visual no-code workflow builder connecting 1,500+ web applications without programming.', bestFor: 'Automated lead sync, content scheduling, CRM triggers', urlHint: 'make.com' },
  { name: 'Voiceflow', category: 'Automation', pricing: 'Freemium', description: 'Conversational assistant builder for prototyping and launching intelligent web bots.', bestFor: 'Customer support concierges, client FAQ bots', urlHint: 'voiceflow.com' },
  { name: 'Framer AI', category: 'Web & Products', pricing: 'Freemium', description: 'Generates responsive, production-ready web pages directly from text descriptions.', bestFor: 'Client landing pages, portfolios, product launches', urlHint: 'framer.com' },
  { name: 'Perplexity Pro', category: 'Writing', pricing: 'Freemium', description: 'Conversational search engine with real-time academic citations and web verification.', bestFor: 'Deep market research, competitor benchmarking', urlHint: 'perplexity.ai' },
  { name: 'Notion AI', category: 'Web & Products', pricing: 'Freemium', description: 'Connected workspace featuring integrated text generation, summarization, and database queries.', bestFor: 'Client dashboards, template packs, knowledge bases', urlHint: 'notion.so' },
  { name: 'Descript', category: 'Audio & Video', pricing: 'Freemium', description: 'Edit audio and video by editing the written text transcript with studio sound clean up.', bestFor: 'Podcast repurposing, interview snippets', urlHint: 'descript.com' }
];

export const PROMPT_PACK_PREVIEW = [
  {
    title: 'The Unassailable Value Proposition Matrix',
    category: 'Client Acquisition',
    prompt: `Act as a senior B2B consultant. I want to offer [SERVICE NAME] to [TARGET NICHE, e.g., local dental clinics]. Analyze their 3 highest-stress operational bottlenecks regarding [TOPIC]. Then construct: 1. A 3-sentence high-converting opening elevator pitch. 2. An ROI breakdown showing how saving 5 staff hours/week recovers at least $800/month. 3. A low-risk "Pilot Offer" proposition that requires zero upfront financial commitment.`
  },
  {
    title: 'The Editorial Niche Synthesis Chain',
    category: 'Content Creation',
    prompt: `You are an elite editorial curator for a premium industry dispatch. Below is raw source text from 3 recent industry articles: [PASTE TEXT] Synthesize this into: - The single defining trend that incumbents are ignoring. - 3 pragmatic tactical implications for independent practitioners. - Tone: Crisp, authoritative, Newsreader-grade cadence without buzzwords.`
  },
  {
    title: 'The Cold Outreach Personalization Seed',
    category: 'Outreach & Sales',
    prompt: `Analyze the following LinkedIn profile about section and recent company announcement: [PASTE DETAILS] Generate 3 distinct cold email subject lines (< 6 words) and a 90-word personalized cold email.

Constraints: No flattery, no generic phrases like "I hope this finds you well". Focus entirely on a specific gap in their public workflow and offer a 2-minute Loom breakdown.`
  }
];

export const OUTREACH_SCRIPTS = [
  {
    type: 'Cold Email: Local Service Business',
    subject: 'Quick question about [Business Name]’s weekend booking inquiries',
    body: `Hi [First Name],

I was reviewing your website this weekend and noticed that after 6:00 PM, new patients looking to schedule an urgent consultation can only leave an email via a standard contact form.

Local clinics in [City] typically lose 35-40% of after-hours leads because prospective patients call the next clinic on Google rather than waiting until Monday.

I built a lightweight 2-minute preview showing how an automated concierge bot can qualify and book patients directly into your calendar without extra front-desk staff.

Mind if I send the 90-second video over? Zero commitment either way.

Best regards,
[Your Name]
Digital Operations Consultant`
  },
  {
    type: 'LinkedIn Message: Creative Agency Lead',
    subject: 'Idea for repurposing [Agency Podcast Name] audio into client carousels',
    body: `Hey [First Name], loved your recent episode with [Guest Name] on client retention.

I noticed your team currently publishes the audio feed to Spotify but doesn't repurpose the core insights into visual LinkedIn carousels or executive summaries.

I mocked up 2 sample graphic carousels from the 18:20 mark of that episode to show how you could 4x your reach without spending any extra production time.

Would you be open to taking a look? Happy to send them right here in chat.

Cheers,
[Your Name]`
  }
];
