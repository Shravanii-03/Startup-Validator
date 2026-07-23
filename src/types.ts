export interface ValidationRequest {
    idea: string;
    targetMarket?: string;
    pricePoint?: string;
    budget?: string;
  }
  
  export interface BuyerPersona {
    role: string;
    willingnessToPay: string;
    quote: string;
    topPain: string;
  }
  
  export interface FailureRisk {
    riskTitle: string;
    severity: "High" | "Medium" | "Low" | string;
    description: string;
    mitigation: string;
  }
  
  export interface Competitor {
    name: string;
    flaw: string;
    yourAdvantage: string;
  }
  
  export interface SmokeTestStep {
    dayRange: string;
    action: string;
    successMetric: string;
  }
  
  export interface MarketSize {
    tam: string;
    sam: string;
    growthRate: string;
  }
  
  export interface ValidationResult {
    overallScore: number;
    scoreBreakdown:{
        marketDemand:number;
        competition:number;
        innovation:number;
        execution:number;
        monetization:number;
    }
    swotAnalysis: {
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
    };
    riskLevel: "Low Risk" | "Moderate Risk" | "High Risk" | string;
    summary: string;
    marketSize: MarketSize;
    buyerPersonas: BuyerPersona[];
    failureRisks: FailureRisk[];
    competitors: Competitor[];
    smokeTestPlan: SmokeTestStep[];
    suggestedPivot: string;
  }
  
  export interface SampleReport {
    id: string;
    title: string;
    category: string;
    score: number;
    verdict: string;
    result: ValidationResult;
  }
  