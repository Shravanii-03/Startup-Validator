import { tavily } from "@tavily/core";

const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY!,
});

export async function searchCompetitors(idea: string) {
  const response = await tvly.search(
    `Find startup competitors for: ${idea}`,
    {
      searchDepth: "advanced",
      maxResults: 5,
    }
  );

  return response.results;
}