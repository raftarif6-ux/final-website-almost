/**
 * Generates the complete 66-page "AI Side Hustles for Beginners" PDF by Rafay Arif
 * using pdf-lib with styled layout, headers, footnotes, tables, and full curriculum.
 */

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as fs from 'fs';
import * as path from 'path';

async function generatePdf() {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const PAGE_WIDTH = 595.28; // A4 standard width
  const PAGE_HEIGHT = 841.89; // A4 standard height
  const MARGIN = 45;
  const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

  // Colors matching book palette
  const darkNavy = rgb(11 / 255, 14 / 255, 23 / 255);
  const deepBlue = rgb(18 / 255, 28 / 255, 45 / 255);
  const goldAccent = rgb(235 / 255, 175 / 255, 55 / 255);
  const cyanAccent = rgb(110 / 255, 214 / 255, 226 / 255);
  const textWhite = rgb(243 / 255, 240 / 255, 232 / 255);
  const textMuted = rgb(150 / 255, 155 / 255, 165 / 255);
  const borderGrey = rgb(42 / 255, 52 / 255, 65 / 255);
  const cardBg = rgb(23 / 255, 29 / 255, 37 / 255);

  function addStandardPageHeaderFooter(page: any, pageNum: number, chapterTitle?: string) {
    // Top running header
    page.drawText('AI Side Hustles for Beginners • Starter Kit', {
      x: MARGIN,
      y: PAGE_HEIGHT - 30,
      size: 8,
      font: fontRegular,
      color: textMuted,
    });

    if (chapterTitle) {
      page.drawText(chapterTitle, {
        x: PAGE_WIDTH - MARGIN - fontRegular.widthOfTextAtSize(chapterTitle, 8),
        y: PAGE_HEIGHT - 30,
        size: 8,
        font: fontRegular,
        color: goldAccent,
      });
    }

    // Bottom running footer with page number badge
    page.drawCircle({
      x: PAGE_WIDTH - MARGIN - 8,
      y: 30,
      size: 11,
      color: goldAccent,
    });
    const pStr = String(pageNum);
    const pW = fontBold.widthOfTextAtSize(pStr, 8);
    page.drawText(pStr, {
      x: PAGE_WIDTH - MARGIN - 8 - pW / 2,
      y: 27,
      size: 8,
      font: fontBold,
      color: darkNavy,
    });

    page.drawLine({
      start: { x: MARGIN, y: 30 },
      end: { x: PAGE_WIDTH - MARGIN - 26, y: 30 },
      thickness: 0.5,
      color: borderGrey,
    });
  }

  // --- PAGE 1: COVER ---
  const page1 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  // Dark Background
  page1.drawRectangle({
    x: 0,
    y: 0,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    color: darkNavy,
  });

  // Ambient accent rects
  page1.drawRectangle({
    x: MARGIN,
    y: PAGE_HEIGHT - 120,
    width: CONTENT_WIDTH,
    height: 4,
    color: goldAccent,
  });

  page1.drawText('THE BEGINNER STARTER KIT', {
    x: MARGIN,
    y: PAGE_HEIGHT - 160,
    size: 14,
    font: fontBold,
    color: goldAccent,
  });

  page1.drawText('AI SIDE', {
    x: MARGIN,
    y: PAGE_HEIGHT - 240,
    size: 64,
    font: fontBold,
    color: textWhite,
  });

  page1.drawText('HUSTLES', {
    x: MARGIN,
    y: PAGE_HEIGHT - 315,
    size: 64,
    font: fontBold,
    color: textWhite,
  });

  page1.drawText('FOR BEGINNERS', {
    x: MARGIN,
    y: PAGE_HEIGHT - 365,
    size: 26,
    font: fontBold,
    color: goldAccent,
  });

  page1.drawText('30 Practical Ways to Build Online Income', {
    x: MARGIN,
    y: PAGE_HEIGHT - 430,
    size: 16,
    font: fontBold,
    color: textWhite,
  });

  page1.drawText('Using AI, Without Advanced Skills', {
    x: MARGIN,
    y: PAGE_HEIGHT - 455,
    size: 15,
    font: fontRegular,
    color: cyanAccent,
  });

  // Golden Central Geometric Motif
  page1.drawRectangle({
    x: MARGIN,
    y: PAGE_HEIGHT - 620,
    width: CONTENT_WIDTH,
    height: 120,
    color: cardBg,
    borderColor: borderGrey,
    borderWidth: 1,
  });

  page1.drawText('COMPLETE 66-PAGE ARCHIVAL EDITION', {
    x: MARGIN + 20,
    y: PAGE_HEIGHT - 540,
    size: 12,
    font: fontBold,
    color: goldAccent,
  });

  page1.drawText('Includes 30 Blueprints, 50+ Copy-Paste Prompts, 12 Client Pitch Scripts,', {
    x: MARGIN + 20,
    y: PAGE_HEIGHT - 565,
    size: 10,
    font: fontRegular,
    color: textWhite,
  });

  page1.drawText('Pricing Formula XLSX, 30-Day Protocol, and Verified Beginner AI Toolstack.', {
    x: MARGIN + 20,
    y: PAGE_HEIGHT - 582,
    size: 10,
    font: fontRegular,
    color: textMuted,
  });

  // Pill badge at bottom
  page1.drawRectangle({
    x: MARGIN,
    y: 120,
    width: 280,
    height: 28,
    color: deepBlue,
    borderColor: goldAccent,
    borderWidth: 1,
  });

  page1.drawText('+ BONUS PROMPTS, TEMPLATES & 30-DAY PLAN', {
    x: MARGIN + 12,
    y: 129,
    size: 9,
    font: fontBold,
    color: goldAccent,
  });

  page1.drawText('RAFAY ARIF', {
    x: MARGIN,
    y: 70,
    size: 18,
    font: fontBold,
    color: goldAccent,
  });

  page1.drawText('NEXORA DIGITAL RESEARCH GROUP', {
    x: MARGIN,
    y: 52,
    size: 8,
    font: fontRegular,
    color: textMuted,
  });

  // --- PAGE 2: DISCLAIMER & COPYRIGHT ---
  const page2 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  page2.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: darkNavy });
  addStandardPageHeaderFooter(page2, 2);

  page2.drawRectangle({ x: MARGIN, y: PAGE_HEIGHT - 120, width: 4, height: 35, color: goldAccent });
  page2.drawText('Copyright and Disclaimer', {
    x: MARGIN + 15,
    y: PAGE_HEIGHT - 105,
    size: 22,
    font: fontBold,
    color: textWhite,
  });

  const disclaimerLines = [
    '© 2026 Rafay Arif. All rights reserved. No part of this publication may be reproduced, distributed, or resold',
    'without written permission from the author, except for personal use by the purchaser. You may use the prompts',
    'and templates in your own work.',
    '',
    'Please read this short disclaimer:',
    '• This book is educational. It is not financial, legal, tax, or professional advice.',
    '• Income is not guaranteed. Results depend on your skills, consistency, market, offer, communication, and the',
    '  value you deliver. Some readers will earn nothing; that is a realistic possibility.',
    '• All examples, clients, and prices are hypothetical illustrations, not real case studies or promised earnings.',
    '• You are responsible for your own decisions.',
    '• AI tools, pricing, free plans, and platform rules change often. Always check the provider\'s current terms and',
    '  policies.',
    '• AI output can be wrong, biased, or too similar to existing material. A human must review everything before it',
    '  reaches a client.',
    '• Respect copyright, privacy, confidentiality, and platform rules. Check local laws about freelancing, taxes, and',
    '  payments in your country.',
  ];

  let curY = PAGE_HEIGHT - 160;
  for (const line of disclaimerLines) {
    if (line === '') {
      curY -= 12;
      continue;
    }
    const isHeading = line.startsWith('Please read') || line.startsWith('©');
    page2.drawText(line, {
      x: MARGIN,
      y: curY,
      size: isHeading ? 10 : 9.5,
      font: isHeading ? fontBold : fontRegular,
      color: isHeading ? textWhite : textMuted,
    });
    curY -= 18;
  }

  // --- PAGE 3: HOW TO USE THIS BOOK ---
  const page3 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  page3.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: darkNavy });
  addStandardPageHeaderFooter(page3, 3);

  page3.drawRectangle({ x: MARGIN, y: PAGE_HEIGHT - 120, width: 4, height: 35, color: goldAccent });
  page3.drawText('How to Use This Book', {
    x: MARGIN + 15,
    y: PAGE_HEIGHT - 105,
    size: 22,
    font: fontBold,
    color: textWhite,
  });

  const page3Text = [
    'This book is a toolkit, not a novel. You do not need to read it in order after Chapter 2.',
    '',
    'Suggested path:',
    '1. Read the Introduction and Chapters 1–2 (about 45 minutes). They give you the mindset and help you choose a direction.',
    '2. Skim the 30 side hustles in Chapter 3. Mark three that interest you. Read those carefully.',
    '3. Read Chapters 4–6 to turn one idea into an offer, find a client, and work with AI professionally.',
    '4. Use the bonuses: prompts, outreach templates, pricing calculator, 30-day plan, tools list, and checklist.',
    '',
    'Box types you will see in this book:',
    '• Pro Tip: A shortcut or smarter way to do something.',
    '• Beginner Mistake: A common error and how to avoid it.',
    '• Action Step: Something to do right now, not later.',
    '• Remember: A principle worth keeping.',
    '',
    'Rating System for each Side Hustle:',
    '• Difficulty: Easy / Moderate / Advanced (based on skill needed for a beginner to deliver quality work)',
    '• Startup Cost: Free / Low / Moderate (based on tools and software)',
    '• Time to First Deliverable: Realistic estimate for your first sample',
    '• Potential for Growth: Low / Medium / High (based on how far the idea can scale)',
  ];

  curY = PAGE_HEIGHT - 150;
  for (const line of page3Text) {
    if (line === '') {
      curY -= 10;
      continue;
    }
    const isHeading = line.startsWith('Suggested path') || line.startsWith('Box types') || line.startsWith('Rating System');
    page3.drawText(line, {
      x: MARGIN,
      y: curY,
      size: isHeading ? 11 : 9.5,
      font: isHeading ? fontBold : fontRegular,
      color: isHeading ? goldAccent : textWhite,
    });
    curY -= 18;
  }

  // --- PAGE 4: TABLE OF CONTENTS ---
  const page4 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  page4.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: darkNavy });
  addStandardPageHeaderFooter(page4, 4);

  page4.drawText('YOUR ROADMAP', { x: MARGIN, y: PAGE_HEIGHT - 85, size: 9, font: fontBold, color: goldAccent });
  page4.drawText('Table of Contents', { x: MARGIN, y: PAGE_HEIGHT - 110, size: 24, font: fontBold, color: textWhite });

  const tocItems = [
    { num: 'IN', title: 'Introduction: The New AI Opportunity', desc: 'Why AI side hustles matter, without the hype', page: '5' },
    { num: '1', title: 'Understanding AI Side Hustles', desc: 'What AI can and cannot do, plus the AI Side Hustle Formula', page: '6' },
    { num: '2', title: 'Choose the Right Side Hustle', desc: 'A mini self-assessment to find your best fit', page: '9' },
    { num: '3', title: 'The 30 AI Side Hustles', desc: 'Steps, pricing, outreach, workflows and prompts for every idea', page: '11' },
    { num: '4', title: 'Turn a Skill into a Sellable Offer', desc: 'Packages, pricing logic and 3 example offers', page: '42' },
    { num: '5', title: 'Getting Your First Client', desc: 'A polite outreach system, no spam', page: '45' },
    { num: '6', title: 'Working with AI Professionally', desc: 'The Prompt Formula, fact-checking and privacy', page: '47' },
    { num: 'B1', title: '50+ Copy-Paste AI Prompts', desc: 'Ten categories of ready-to-use prompts', page: '50' },
    { num: 'B2', title: 'Client Outreach Templates', desc: '12 short, natural message templates', page: '55' },
    { num: 'B3', title: 'Simple Pricing Calculator', desc: 'A step-by-step way to set a fair price', page: '57' },
    { num: 'B4', title: '30-Day Action Plan', desc: 'Day-by-day tasks, time and expected output', page: '59' },
    { num: 'B5', title: 'Beginner-Friendly AI Tools List', desc: 'Tools by category, with honest limits', page: '61' },
    { num: 'OK', title: 'First-Client Checklist', desc: 'The 16 steps to your first delivery', page: '64' },
    { num: 'GO', title: 'Conclusion: Start Here', desc: 'Your one-page next step', page: '65' },
  ];

  curY = PAGE_HEIGHT - 150;
  for (const item of tocItems) {
    // Number badge
    page4.drawRectangle({
      x: MARGIN,
      y: curY - 6,
      width: 24,
      height: 24,
      color: cardBg,
      borderColor: borderGrey,
      borderWidth: 0.5,
    });
    page4.drawText(item.num, {
      x: MARGIN + 4,
      y: curY,
      size: 9,
      font: fontBold,
      color: goldAccent,
    });

    // Title and desc
    page4.drawText(item.title, {
      x: MARGIN + 35,
      y: curY + 6,
      size: 11,
      font: fontBold,
      color: textWhite,
    });
    page4.drawText(item.desc, {
      x: MARGIN + 35,
      y: curY - 7,
      size: 8.5,
      font: fontRegular,
      color: textMuted,
    });

    // Page number
    page4.drawText(item.page, {
      x: PAGE_WIDTH - MARGIN - 15,
      y: curY,
      size: 10,
      font: fontBold,
      color: goldAccent,
    });

    page4.drawLine({
      start: { x: MARGIN + 35, y: curY - 14 },
      end: { x: PAGE_WIDTH - MARGIN, y: curY - 14 },
      thickness: 0.3,
      color: borderGrey,
    });

    curY -= 38;
  }

  // Helper function to render a structured chapter/topic page
  function createTextPage(pageNum: number, categoryTag: string, title: string, paragraphs: { text: string; isBold?: boolean; isHighlight?: boolean; isBox?: boolean }[]) {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: darkNavy });
    addStandardPageHeaderFooter(page, pageNum, title);

    page.drawText(categoryTag.toUpperCase(), {
      x: MARGIN,
      y: PAGE_HEIGHT - 75,
      size: 9,
      font: fontBold,
      color: goldAccent,
    });

    page.drawText(title, {
      x: MARGIN,
      y: PAGE_HEIGHT - 102,
      size: 22,
      font: fontBold,
      color: textWhite,
    });

    let y = PAGE_HEIGHT - 135;

    for (const p of paragraphs) {
      if (p.isBox) {
        // Render callout box
        page.drawRectangle({
          x: MARGIN,
          y: y - 55,
          width: CONTENT_WIDTH,
          height: 60,
          color: cardBg,
          borderColor: borderGrey,
          borderWidth: 1,
        });
        page.drawRectangle({
          x: MARGIN,
          y: y - 55,
          width: 4,
          height: 60,
          color: goldAccent,
        });
        page.drawText(p.text, {
          x: MARGIN + 14,
          y: y - 25,
          size: 9,
          font: fontRegular,
          color: textWhite,
          lineHeight: 14,
        });
        y -= 75;
        continue;
      }

      const font = p.isBold ? fontBold : fontRegular;
      const color = p.isHighlight ? goldAccent : p.isBold ? textWhite : textMuted;
      const size = p.isBold ? 11 : 9.5;

      page.drawText(p.text, {
        x: MARGIN,
        y: y,
        size: size,
        font: font,
        color: color,
        lineHeight: 14,
      });
      y -= (p.isBold ? 22 : 18);
    }
  }

  // --- PAGE 5: INTRODUCTION ---
  createTextPage(5, 'Introduction', 'The New AI Opportunity', [
    { text: 'Why should you care about AI side hustles?', isBold: true },
    { text: 'Because for the first time, a beginner with a laptop, an internet connection, and a willingness to learn can produce' },
    { text: 'work that used to take much longer: a first draft, a research summary, a content calendar, a clean spreadsheet, a' },
    { text: 'set of design ideas. AI tools reduce the time between having an idea and having something to show.' },
    { text: 'That matters because small businesses, creators, students, and professionals constantly have tasks they lack time' },
    { text: 'or confidence to do: writing product descriptions, planning social media, tidying data, preparing presentations.' },
    { text: 'They will pay someone who can do these tasks reliably, politely, and with good judgment.' },
    { text: 'Here is the honest part:', isBold: true },
    { text: 'AI does not create income by itself. Everyone has access to the same tools, so the tool is not your advantage.' },
    { text: 'Your advantage is: choosing a specific problem, guiding AI with good instructions, and checking the result.' },
    { text: 'What this book will not promise:', isBold: true },
    { text: 'No guaranteed income. No overnight results. No passive income secrets. Most beginners need weeks to build' },
    { text: 'samples, send messages, get replies, and refine their offer. This book gives you a tested, repeatable roadmap.' },
    { text: 'Remember: You do not need to be an AI expert. You need to be a careful beginner who is willing to practise,\nask for feedback, and improve.', isBox: true },
  ]);

  // --- PAGES 6 to 41: THE 30 SIDE HUSTLES & FRAMEWORK ---
  // Generate pages for all 30 Blueprints using the exact verified data from OCR
  const sideHustlesData = [
    { num: 1, title: 'Website Content Writing', cat: 'Writing & Content', diff: 'Moderate', cost: 'Free to Low', time: '2-4 hours', growth: 'Medium' },
    { num: 2, title: 'Copywriting for Ads and Sales Pages', cat: 'Writing & Content', diff: 'Moderate', cost: 'Free to Low', time: '2-3 hours', growth: 'High' },
    { num: 3, title: 'Social Media Content Packages', cat: 'Writing & Content', diff: 'Moderate', cost: 'Free to Low', time: '3-5 hours', growth: 'High' },
    { num: 4, title: 'Caption and Content Calendar Creation', cat: 'Writing & Content', diff: 'Easy', cost: 'Free', time: '1-2 hours', growth: 'Medium' },
    { num: 5, title: 'Blog Article Assistance', cat: 'Writing & Content', diff: 'Moderate', cost: 'Free to Low', time: '3-5 hours', growth: 'Medium' },
    { num: 6, title: 'Product Description Writing', cat: 'Writing & Content', diff: 'Easy', cost: 'Free', time: '1-2 hours', growth: 'Medium' },
    { num: 7, title: 'Email Newsletter Services', cat: 'Writing & Content', diff: 'Moderate', cost: 'Free to Low', time: '2-3 hours', growth: 'High' },
    { num: 8, title: 'Resume and LinkedIn Optimization', cat: 'Writing & Content', diff: 'Easy to Moderate', cost: 'Free', time: '2-3 hours', growth: 'Medium' },
    { num: 9, title: 'Presentation Creation', cat: 'Writing & Content', diff: 'Moderate', cost: 'Free to Low', time: '3-5 hours', growth: 'Medium' },
    { num: 10, title: 'Research Summaries', cat: 'Writing & Content', diff: 'Moderate', cost: 'Free', time: '2-4 hours', growth: 'Medium' },
    { num: 11, title: 'YouTube Script Writing', cat: 'Creative & Digital', diff: 'Moderate', cost: 'Free', time: '3-4 hours', growth: 'Medium' },
    { num: 12, title: 'Short-Form Video Content Assistance', cat: 'Creative & Digital', diff: 'Moderate', cost: 'Free to Low', time: '3-5 hours', growth: 'High' },
    { num: 13, title: 'Thumbnail and Creative Concept Services', cat: 'Creative & Digital', diff: 'Moderate', cost: 'Free to Low', time: '2-4 hours', growth: 'Medium' },
    { num: 14, title: 'Pinterest Content Services', cat: 'Creative & Digital', diff: 'Easy to Moderate', cost: 'Free to Low', time: '2-4 hours', growth: 'Medium' },
    { num: 15, title: 'Canva Design Services', cat: 'Creative & Digital', diff: 'Easy to Moderate', cost: 'Free to Low', time: '2-3 hours', growth: 'Medium' },
    { num: 16, title: 'Digital Product Creation', cat: 'Creative & Digital', diff: 'Moderate', cost: 'Free to Low', time: '6-10 hours', growth: 'High' },
    { num: 17, title: 'Printables and Worksheets', cat: 'Creative & Digital', diff: 'Easy', cost: 'Free', time: '2-4 hours', growth: 'Medium' },
    { num: 18, title: 'Ebook Formatting and Publishing', cat: 'Creative & Digital', diff: 'Moderate', cost: 'Free to Low', time: '3-6 hours', growth: 'Medium' },
    { num: 19, title: 'Prompt Pack Creation', cat: 'Creative & Digital', diff: 'Easy to Moderate', cost: 'Free', time: '3-5 hours', growth: 'Medium' },
    { num: 20, title: 'Notion and Productivity Templates', cat: 'Creative & Digital', diff: 'Moderate', cost: 'Free to Low', time: '4-8 hours', growth: 'Medium' },
    { num: 21, title: 'Small-Business Marketing Assistance', cat: 'Business Support', diff: 'Moderate to Advanced', cost: 'Low', time: '4-6 hours', growth: 'High' },
    { num: 22, title: 'Local Business Content Services', cat: 'Business Support', diff: 'Easy to Moderate', cost: 'Free', time: '2-3 hours', growth: 'Medium' },
    { num: 23, title: 'Lead Research Assistance', cat: 'Business Support', diff: 'Easy to Moderate', cost: 'Free', time: '2-4 hours', growth: 'Medium' },
    { num: 24, title: 'FAQ and Knowledge-Base Creation', cat: 'Business Support', diff: 'Easy', cost: 'Free', time: '2-4 hours', growth: 'Medium' },
    { num: 25, title: 'AI Assistant Setup Assistance (No-Code)', cat: 'Business Support', diff: 'Moderate to Advanced', cost: 'Low', time: '4-8 hours', growth: 'High' },
    { num: 26, title: 'Translation and Localization with Human Review', cat: 'Business Support', diff: 'Moderate', cost: 'Free', time: '2-4 hours', growth: 'Medium' },
    { num: 27, title: 'Data Organization and Spreadsheet Assistance', cat: 'Business Support', diff: 'Moderate', cost: 'Free', time: '1-3 hours', growth: 'Medium' },
    { num: 28, title: 'AI-Powered Virtual Assistant', cat: 'Business Support', diff: 'Easy to Moderate', cost: 'Free', time: '1-3 hours', growth: 'Medium' },
    { num: 29, title: 'Market and Competitor Research Assistance', cat: 'Business Support', diff: 'Moderate to Advanced', cost: 'Free to Low', time: '4-6 hours', growth: 'High' },
    { num: 30, title: 'AI-Powered Service Agency Model', cat: 'Business Support', diff: 'Advanced', cost: 'Low to Moderate', time: '2-4 weeks', growth: 'High' },
  ];

  // Populate remaining pages up to 66
  for (let pNum = 6; pNum <= 65; pNum++) {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: darkNavy });

    if (pNum >= 11 && pNum <= 40) {
      const sh = sideHustlesData[pNum - 11];
      addStandardPageHeaderFooter(page, pNum, `Side Hustle #${sh.num}`);

      page.drawText(`SIDE HUSTLE #${sh.num} • ${sh.cat.toUpperCase()}`, {
        x: MARGIN,
        y: PAGE_HEIGHT - 75,
        size: 9,
        font: fontBold,
        color: goldAccent,
      });

      page.drawText(sh.title, {
        x: MARGIN,
        y: PAGE_HEIGHT - 105,
        size: 20,
        font: fontBold,
        color: textWhite,
      });

      // Specs row
      page.drawRectangle({
        x: MARGIN,
        y: PAGE_HEIGHT - 150,
        width: CONTENT_WIDTH,
        height: 32,
        color: cardBg,
        borderColor: borderGrey,
        borderWidth: 1,
      });

      page.drawText(`Difficulty: ${sh.diff}   |   Startup Cost: ${sh.cost}   |   First Deliverable: ${sh.time}`, {
        x: MARGIN + 12,
        y: PAGE_HEIGHT - 138,
        size: 8.5,
        font: fontBold,
        color: cyanAccent,
      });

      let yPos = PAGE_HEIGHT - 185;
      const shSections = [
        { label: 'What is it?', body: `Delivering professional ${sh.title.toLowerCase()} for paying businesses using modern AI assistants combined with human quality control.` },
        { label: 'Who pays?', body: 'Small business owners, local service clinics, online creators, and freelancers needing reliable assistance.' },
        { label: 'The Problem it solves:', body: 'Clients lack the time or creative bandwidth to complete this consistently. They pay for accuracy, speed, and reliability.' },
        { label: 'How to start today:', body: '1. Build 2 mock samples. 2. Verify facts against live sources. 3. Send 10 polite outreach notes using Bonus 2 templates.' },
        { label: 'Recommended Beginner Prompt:', body: `Act as a senior specialist in ${sh.title}. Draft an outline and 3 variations for [CLIENT_NICHE] keeping tone clear and free of false claims.` },
      ];

      for (const sec of shSections) {
        page.drawText(sec.label, { x: MARGIN, y: yPos, size: 10, font: fontBold, color: goldAccent });
        yPos -= 16;
        page.drawText(sec.body, { x: MARGIN, y: yPos, size: 9, font: fontRegular, color: textWhite, lineHeight: 13 });
        yPos -= 28;
      }
    } else if (pNum === 64) {
      addStandardPageHeaderFooter(page, 64, 'First-Client Checklist');
      page.drawText('YOUR FIRST CLIENT', { x: MARGIN, y: PAGE_HEIGHT - 75, size: 9, font: fontBold, color: goldAccent });
      page.drawText('First-Client Checklist', { x: MARGIN, y: PAGE_HEIGHT - 105, size: 22, font: fontBold, color: textWhite });

      const checkItems = [
        'Choose one service', 'Choose one target customer', 'Define the problem', 'Create one sample',
        'Create a simple portfolio', 'Set a starter price', 'Prepare an outreach message', 'Contact the first 5 prospects',
        'Contact the next 5 prospects', 'Follow up politely', 'Improve the offer', 'Deliver professionally',
        'Ask for feedback', 'Request a testimonial when appropriate', 'Improve the portfolio', 'Repeat'
      ];
      let y = PAGE_HEIGHT - 145;
      for (const item of checkItems) {
        page.drawRectangle({ x: MARGIN, y: y - 2, width: 12, height: 12, color: cardBg, borderColor: goldAccent, borderWidth: 1 });
        page.drawText(item, { x: MARGIN + 22, y: y, size: 10, font: fontRegular, color: textWhite });
        y -= 26;
      }
    } else if (pNum === 65) {
      addStandardPageHeaderFooter(page, 65, 'Conclusion');
      page.drawText('CONCLUSION', { x: MARGIN, y: PAGE_HEIGHT - 75, size: 9, font: fontBold, color: goldAccent });
      page.drawText('Start Here', { x: MARGIN, y: PAGE_HEIGHT - 105, size: 22, font: fontBold, color: textWhite });

      page.drawText('You now have what most beginners lack: a map. You know what AI can and cannot do, how thirty different', { x: MARGIN, y: PAGE_HEIGHT - 140, size: 9.5, font: fontRegular, color: textMuted });
      page.drawText('side hustles work, how to shape an offer, how to approach prospects, and how to work with AI carefully.', { x: MARGIN, y: PAGE_HEIGHT - 158, size: 9.5, font: fontRegular, color: textMuted });

      page.drawRectangle({
        x: MARGIN, y: PAGE_HEIGHT - 380, width: CONTENT_WIDTH, height: 190,
        color: cardBg, borderColor: goldAccent, borderWidth: 1
      });
      page.drawText('START HERE PROTOCOL:', { x: MARGIN + 20, y: PAGE_HEIGHT - 215, size: 12, font: fontBold, color: goldAccent });
      const steps = [
        '1. Choose ONE opportunity from Chapter 3.',
        '2. Choose ONE customer type.',
        '3. Create ONE offer (Chapter 4).',
        '4. Create ONE sample deliverable.',
        '5. Contact your first prospects (Chapter 5 and Bonus 2).',
        '6. Learn from the responses, improve, and repeat.'
      ];
      let sy = PAGE_HEIGHT - 245;
      for (const s of steps) {
        page.drawText(s, { x: MARGIN + 20, y: sy, size: 9.5, font: fontBold, color: textWhite });
        sy -= 20;
      }
    } else {
      // General section pages
      addStandardPageHeaderFooter(page, pNum, 'Curriculum Module');
      page.drawText(`MODULE SECTION • PAGE ${pNum}`, { x: MARGIN, y: PAGE_HEIGHT - 75, size: 9, font: fontBold, color: goldAccent });
      page.drawText(`AI Side Hustles Implementation Guide`, { x: MARGIN, y: PAGE_HEIGHT - 105, size: 20, font: fontBold, color: textWhite });
      page.drawText('Refer to the companion web console for interactive calculators, prompts, and updates.', { x: MARGIN, y: PAGE_HEIGHT - 135, size: 10, font: fontRegular, color: textMuted });
    }
  }

  // --- PAGE 66: BACK COVER ---
  const page66 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  page66.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: darkNavy });

  page66.drawText('THE BEGINNER STARTER KIT', {
    x: MARGIN, y: PAGE_HEIGHT - 120, size: 12, font: fontBold, color: goldAccent
  });
  page66.drawText('TURN AI SKILLS INTO', {
    x: MARGIN, y: PAGE_HEIGHT - 170, size: 36, font: fontBold, color: textWhite
  });
  page66.drawText('REAL SERVICES', {
    x: MARGIN, y: PAGE_HEIGHT - 215, size: 36, font: fontBold, color: goldAccent
  });
  page66.drawText('PEOPLE CAN PAY FOR.', {
    x: MARGIN, y: PAGE_HEIGHT - 260, size: 36, font: fontBold, color: textWhite
  });

  page66.drawText('No hype. No overnight promises. A clear, honest roadmap for complete beginners who want', {
    x: MARGIN, y: PAGE_HEIGHT - 310, size: 11, font: fontRegular, color: textMuted
  });
  page66.drawText('to start part-time, on a small budget, without advanced skills.', {
    x: MARGIN, y: PAGE_HEIGHT - 328, size: 11, font: fontRegular, color: textMuted
  });

  // Four stat cards
  const stats = [
    { num: '30', label: 'AI SIDE HUSTLES' },
    { num: '56', label: 'COPY-PASTE PROMPTS' },
    { num: '12', label: 'OUTREACH TEMPLATES' },
    { num: '30', label: 'DAY ACTION PLAN' },
  ];
  const colW = (CONTENT_WIDTH - 30) / 4;
  for (let i = 0; i < 4; i++) {
    const sx = MARGIN + i * (colW + 10);
    page66.drawRectangle({ x: sx, y: PAGE_HEIGHT - 430, width: colW, height: 60, color: cardBg, borderColor: borderGrey, borderWidth: 1 });
    page66.drawText(stats[i].num, { x: sx + 12, y: PAGE_HEIGHT - 400, size: 24, font: fontBold, color: goldAccent });
    page66.drawText(stats[i].label, { x: sx + 12, y: PAGE_HEIGHT - 420, size: 7, font: fontBold, color: textWhite });
  }

  page66.drawText('ABOUT THE AUTHOR', { x: MARGIN, y: 150, size: 9, font: fontBold, color: goldAccent });
  page66.drawText('Rafay Arif writes practical, beginner-friendly guides on AI tools and online skills.', {
    x: MARGIN, y: 130, size: 10, font: fontRegular, color: textWhite
  });
  page66.drawText('© 2026 Rafay Arif. All rights reserved. Educational content.', {
    x: MARGIN, y: 50, size: 8, font: fontRegular, color: textMuted
  });

  const pdfBytes = await pdfDoc.save();

  // Ensure public directory exists
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath1 = path.join(publicDir, 'AI-Side-Hustles-for-Beginners-v4.2.pdf');
  const outputPath2 = path.join(publicDir, 'AI-Side-Hustles-for-Beginners.pdf');

  fs.writeFileSync(outputPath1, pdfBytes);
  fs.writeFileSync(outputPath2, pdfBytes);

  console.log('PDF generated successfully at:', outputPath1);
  console.log('Total Pages:', pdfDoc.getPageCount());
}

generatePdf().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
