import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { searchCompetitors } from "./server/services/competitorSearch";
import { marketResearch } from "./server/services/marketResearch";


dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header as required
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Validation API endpoint
app.post("/api/validate", async (req, res) => {
  try {
    const { idea, targetMarket, pricePoint } = req.body;

    if (
        !idea ||
        typeof idea !== "string" ||
        idea.trim().length < 20
    ) {
        return res.status(400).json({
            error:
                "Please provide a startup idea with at least 20 characters."
        });
    }

    if (!ai) {
      // Return smart structured mock if key not set
      return res.json(getMockValidation(idea, targetMarket, pricePoint));
    }
    const competitors = await searchCompetitors(idea);

    const marketData = await marketResearch(idea);

   
const competitorContext = competitors
  .map((c, index) => {
    return `
Competitor ${index + 1}

Name: ${c.title}

Summary:
${c.content}

Website:
${c.url}
`;
  })
  .join("\n----------------------------------\n");


  const marketContext = marketData
  .map((m,index)=>`
  Market Source ${index+1}
  
  Title:
  ${m.title}
  
  Summary:
  ${m.content}
  
  Website:
  ${m.url}
  `)
  .join("\n-------------------------\n");
  
    const prompt = `
You are Validify AI, an experienced Venture Capital analyst.

Analyze the following startup idea.

Startup Idea:
${idea}

Target Market:
${targetMarket || "General / B2B"}

Price Point:
${pricePoint || "SaaS Subscription"}

----------------------------------------------------
REAL COMPETITORS FOUND FROM WEB SEARCH
----------------------------------------------------

${competitorContext}

----------------------------------------------------

While generating the report:

- Compare the startup against these competitors.
- Explain where these competitors are weak.
- Explain where this startup has an advantage.
- Recommend a pivot if the market looks saturated.
- If no relevant competitors exist, explicitly mention that.

For every competitor:

- Use the company website from the supplied search results.
- Do not invent website URLs.
- If no website exists in the supplied search results, return an empty string.

REAL MARKET RESEARCH

${marketContext}

Use these reports while estimating:

• TAM
• SAM
• CAGR
• Market Growth

Never invent market sizes if reliable evidence is unavailable.

Mention uncertainty if needed.

------------------------------------

The overall startup score must be calculated using exactly FIVE categories.

Each category is scored from 0–20.

Categories:

1. Market Demand
2. Competition
3. Innovation
4. Execution Feasibility
5. Monetization

The sum of these five scores MUST equal overallScore.

Also perform a SWOT analysis.

Return exactly:

Strengths (3)
Weaknesses (3)
Opportunities (3)
Threats (3)

Requirements:

- Each point must be concise (one sentence maximum).
- Base the SWOT analysis on the startup idea, market research, and competitors provided above.
- Avoid generic advice.
- Make each point specific to this startup idea.
Return ONLY valid JSON matching the schema.`;


    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are Validify AI, a startup validation engine. You analyze startup ideas against market demand, buyer willingness to pay, competitor flaws, unit economics, and execution risks. Format all financial figures, market estimates, and pricing in Indian Rupees (₹) e.g., ₹2,499/mo, ₹50,000 Cr TAM. Be realistic, clear, data-informed, and easy to understand.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: { type: Type.NUMBER, description: "Market validation score out of 100" },
            scoreBreakdown: {
                type: Type.OBJECT,
                properties: {
                  marketDemand: {
                    type: Type.NUMBER
                  },
                  competition: {
                    type: Type.NUMBER
                  },
                  innovation: {
                    type: Type.NUMBER
                  },
                  execution: {
                    type: Type.NUMBER
                  },
                  monetization: {
                    type: Type.NUMBER
                  }
                },
                required: [
                  "marketDemand",
                  "competition",
                  "innovation",
                  "execution",
                  "monetization"
                ]
              },

              swotAnalysis: {
                type: Type.OBJECT,
                properties: {
                    strengths: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        }
                    },
        
                    weaknesses: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        }
                    },
        
                    opportunities: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        }
                    },
        
                    threats: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        }
                    }
                },
                required: [
                    "strengths",
                    "weaknesses",
                    "opportunities",
                    "threats"
                ]
            },
            riskLevel: { type: Type.STRING, description: "Low Risk, Moderate Risk, or High Risk" },
            summary: { type: Type.STRING, description: "1-2 sentence core verdict" },
            marketSize: {
              type: Type.OBJECT,
              properties: {
                tam: { type: Type.STRING, description: "Total Addressable Market e.g. ₹35,000 Cr" },
                sam: { type: Type.STRING, description: "Serviceable Addressable Market e.g. ₹5,200 Cr" },
                growthRate: { type: Type.STRING, description: "CAGR percentage e.g. 18.4%" }
              },
              required: ["tam", "sam", "growthRate"]
            },
            buyerPersonas: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  role: { type: Type.STRING },
                  willingnessToPay: { type: Type.STRING },
                  quote: { type: Type.STRING },
                  topPain: { type: Type.STRING }
                },
                required: ["role", "willingnessToPay", "quote", "topPain"]
              }
            },
            failureRisks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  riskTitle: { type: Type.STRING },
                  severity: { type: Type.STRING },
                  description: { type: Type.STRING },
                  mitigation: { type: Type.STRING }
                },
                required: ["riskTitle", "severity", "description", "mitigation"]
              }
            },
            competitors: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                    name: {
                        type: Type.STRING
                    },
                
                    website: {
                        type: Type.STRING
                    },
                
                    flaw: {
                        type: Type.STRING
                    },
                
                    yourAdvantage: {
                        type: Type.STRING
                    }
                },
                required: [
                    "name",
                    "website",
                    "flaw",
                    "yourAdvantage"
                ]
              }
            },
            smokeTestPlan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  dayRange: { type: Type.STRING },
                  action: { type: Type.STRING },
                  successMetric: { type: Type.STRING }
                },
                required: ["dayRange", "action", "successMetric"]
              }
            },
            suggestedPivot: { type: Type.STRING }
          },
          required: [
            "overallScore",
            "scoreBreakdown",
            "swotAnalysis",
            "riskLevel",
            "summary",
            "marketSize",
            "buyerPersonas",
            "failureRisks",
            "competitors",
            "smokeTestPlan",
            "suggestedPivot"
          ]
        }
      }
    });

    if (!response.text) {
      throw new Error("Empty response from AI engine");
    }

    const result = JSON.parse(response.text.trim());
    return res.json(result);
  } catch (error) {
    console.error("Validation API error:", error);
    // Fallback to rich mock data if error occurs
    return res.json(getMockValidation(req.body.idea, req.body.targetMarket, req.body.pricePoint));
  }
});

function getMockValidation(idea: string, targetMarket?: string, pricePoint?: string) {
  const isB2B = idea.toLowerCase().includes("b2b") || idea.toLowerCase().includes("invoice") || idea.toLowerCase().includes("enterprise") || idea.toLowerCase().includes("tax");
  
  return {
    overallScore: isB2B ? 88 : 79,
    scoreBreakdown: {
        marketDemand: isB2B ? 19 : 17,
        competition: isB2B ? 16 : 15,
        innovation: isB2B ? 18 : 16,
        execution: isB2B ? 17 : 16,
        monetization: isB2B ? 18 : 15
    },
    swotAnalysis: {
        strengths: [
            "Addresses a clearly identifiable customer pain point.",
            "Can be launched quickly with an MVP using AI.",
            "Subscription business model enables recurring revenue."
        ],
    
        weaknesses: [
            "Faces strong competition from existing AI tools.",
            "Requires continuous model improvements to stay competitive.",
            "Success depends heavily on customer acquisition."
        ],
    
        opportunities: [
            "Rapid growth in AI adoption across industries.",
            "Potential partnerships with incubators and accelerators.",
            "Expansion into enterprise and international markets."
        ],
    
        threats: [
            "Large technology companies could replicate the product.",
            "AI regulations may affect future capabilities.",
            "Customers may switch to lower-cost competitors."
        ]
    },
    riskLevel: isB2B ? "Low Risk" : "Moderate Risk",
    summary: `Validify AI evaluated "${idea.slice(0, 50)}...". Demand signals indicate strong customer pain points with clear monetization potential if distribution friction is minimized.`,
    marketSize: {
      tam: isB2B ? "₹68,000 Crore" : "₹25,000 Crore",
      sam: isB2B ? "₹9,800 Crore" : "₹3,800 Crore",
      growthRate: "22.5% CAGR"
    },
    buyerPersonas: [
      {
        role: isB2B ? "VP of Operations / Finance Lead" : "Early-stage Founder & Creator",
        willingnessToPay: isB2B ? "₹15,000 - ₹40,000/mo" : "₹2,499 - ₹5,999/mo",
        quote: isB2B ? "If this saves my team 5 hours a week in tedious manual sync, I'll swipe my corporate card today." : "I need a solution that works out of the box without complex manual setups.",
        topPain: isB2B ? "High operational overhead and fragmented tool stack" : "Wasted time on repetitive manual tasks"
      },
      {
        role: "Indie Operator & Tech Lead",
        willingnessToPay: "₹3,999 - ₹12,000/mo",
        quote: "Current solutions are bloated and cost ₹80,000+/mo. Give me a lightweight, fast alternative.",
        topPain: "Overpriced legacy software with poor UX"
      }
    ],
    failureRisks: [
      {
        riskTitle: "Distribution Friction & CAC Spike",
        severity: "High",
        description: "Acquiring early users through paid ads could exceed $120 CAC before establishing organic viral loops.",
        mitigation: "Partner directly with existing niche communities, newsletters, and Reddit sub-channels."
      },
      {
        riskTitle: "Incumbent Feature Absorption",
        severity: "Medium",
        description: "Existing market leaders could launch a basic version of your main hook within 6 months.",
        mitigation: "Build workflow integration depth and proprietary data network effects."
      }
    ],
    competitors: [
      {
        name: "Legacy Incumbent Pro",
        flaw: "Overly complex enterprise setup taking 3 weeks to onboard",
        website: "",
        yourAdvantage: "Instant 60-second self-serve setup with zero technical overhead"
      },
      {
        name: "Generalist Automation Tool",
        flaw: "Generic templates with low contextual accuracy",
        website: "",
        yourAdvantage: "Domain-specific AI workflow tuned for maximum precision"
      }
    ],
    smokeTestPlan: [
      {
        dayRange: "Days 1 - 3",
        action: "Launch a 1-page value proposition landing page with a waitlist & deposit form",
        successMetric: "15%+ email conversion rate from 200 targeted visitors"
      },
      {
        dayRange: "Days 4 - 5",
        action: "Run 20 personalized cold outreach messages to ICPs on LinkedIn",
        successMetric: "5 booked 15-minute feedback calls with decision makers"
      },
      {
        dayRange: "Days 6 - 7",
        action: "Conduct manual concierge service for 2 pilot users to prove core value",
        successMetric: "2 signed pre-order letters of intent (LOI)"
      }
    ],
    suggestedPivot: "Focus initially on a hyper-niched vertical (e.g. Shopify brands doing $50k-$500k ARR) before expanding to horizontal markets."
  };
}

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }


  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Validify Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
