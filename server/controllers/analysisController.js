import Analysis from "../models/Analysis.js";
import { scrapeUrl } from "../services/scraperService.js";


// Analyse a URL
export const analyseUrl = async (req, res) => {
    try {
        const {url} = req.body;
        if(!url) return res.status(400).json({ success : false, message : "URL is required!" });

        //Validate URL Format
        let validUrl;
        try {
            validUrl = new URL(url.startsWith("http") ? url : `https://${url}`)
        } catch (error) {
            return res.status(400).json({ success : false, message : "Invalid URL Format!"});
        }

        //Create analysis record with pending status
        const analysis = await Analysis.create({userId: req.userId, url: validUrl.href, status: "Processing..."});

        //Send immediate response with analysis ID
        res.json({ success: true, message: "Analysis Started.", analysisId: analysis._id })

        // Run scraping analysis in background
        try {
            //Step 1: Scrape the URL with BrowserBase
            const scrapeResult = await scrapeUrl(validUrl.href)

            if(!scrapeResult.success){
                analysis.status = "failed";
                await analysis.save();
                return;
            }

            //Step 2: Analyze with Gemini AI




        } catch (bgError) {
            console.error("Background analysis Error:", bgError.message);
            try{
                analysis.status = "failed";
                await analysis.save()
            } catch (saveError) {

            }

            console.error("Failed to save failed status:", saveError.message);

        }


    } catch (error) {
        console.error("Analyze URL error:", error.message)
        if(!res.headersSent){
            res.status(500).json({success: false, message: "Server Error"})
        }
    }
}

//Get analysis by ID
export const getAnalysis = async (req, res) => {

}

//Get analysis for all User
export const getAnalyses = async (req, res) = {

}

//Delete Analysis
export const deleteAnalysis = async (req, res) => {

}

