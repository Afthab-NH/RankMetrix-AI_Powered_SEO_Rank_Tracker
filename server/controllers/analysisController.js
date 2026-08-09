import Analysis from "../models/Analysis.js";


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

    } catch (error) {
        
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

