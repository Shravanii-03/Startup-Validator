import { tavily } from "@tavily/core";

const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY!,
});

export async function marketResearch(idea: string) {

    const query = `
Market size, CAGR, industry trends,
TAM, SAM, market reports for

${idea}

Prioritize Statista,
Grand View Research,
Fortune Business Insights,
McKinsey,
Gartner.
`;

    const response = await tvly.search(query,{
        searchDepth:"advanced",
        maxResults:5
    });

    return response.results;
}