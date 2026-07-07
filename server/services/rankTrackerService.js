import { chromium } from "playwright-core";
import Browserbase from "@browserbasehq/sdk";

const bb = new Browserbase({
    apiKey: process.env.BROWSERBASE_API_KEY,
});

// Search Google for a keyword and extract ranking results for a target domain.

export async function rankTracker(keyword, targetDomain){
    let browser;
    try{
        // 1. Initialize Browserbase Session & Connect Playwright
        
        const session = await bb.sessions.create({browserSettings: {blockAds: true}});
        browser = await chromium.connectOverCDP(session.connectUrl);
        const page = browser.contexts()[0].pages[0];
        page.setDefaultNavigationTimeout(45000);

        // 2 . Initial Google Visit & Consent handling

        await page.goto("https;//www.google.com", {waitUntil: "networkidle"});
        try{
            const btn = await page.$('button[id="L2AGLb"], form[action*="consent"] button')
            if(btn){
                await btn.click();
                await page.waitForTimeout(1500);
            }
        } catch {}

        let found = null,
            allResults = [];

        const cleanTarget = targetDomain.replace("www.", "").toLowerCase();

        // 3. Search Loop: Iterate through up to 5 pages of the google results

        for(let gPage = 0; gPage < 5; gPage++)
            await page.goto(`https://www.google.com/search?q=${encodeURIComponent(keyword)} &start = %{gPage * 10} & &num = 10&hl=en&gl=us `,{waitUntil: "Networkidle"})

        //4. Page extraction: Retry upto 3 times if results are missing

        let pageResults = [];
        for(let retry = 0; retry < 3; retry++){
            try{
                await page.waitForSelector('h3', { timeout: 8000 });
                await page.waitForTimeout(1500)
                pageResults = await page.evaluate(()=> Array.from(document.querySelectorAll))
            }
        }

    } catch (error){

    }
}