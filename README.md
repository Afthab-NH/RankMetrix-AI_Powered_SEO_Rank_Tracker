# RankMetrix

AI-powered SEO analyzer and Google keyword rank tracker built on the MERN stack.

RankMetrix lets users track where their website ranks on Google for specific keywords over time, and run a full AI-generated SEO audit on any URL. Live Google search results are scraped via Browserbase and Playwright to determine keyword rankings and surface competing pages, while Google's Gemini API analyzes scraped page data — meta tags, headings, links, images, load time — to produce a scored, structured SEO report with prioritized, actionable recommendations. A daily cron job keeps tracked keyword rankings automatically up to date.

**Tech stack:** React, TypeScript, Node.js, Express, MongoDB, Browserbase, Playwright, Google Gemini API, JWT.
