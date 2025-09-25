export interface Report {
  id: string;
  startupName: string;
  date: string;
  workDone: string;
  blockers: string;
  planForTomorrow: string;
  fileName?: string;
  adminFeedback?: string;
}

export interface Startup {
  id: string;
  name: string;
  sector: string;
  founder: string;
}

export const mockStartups: Startup[] = [
  {
    id: "1",
    name: "TechFlow AI",
    sector: "Artificial Intelligence",
    founder: "Sarah Chen",
  },
  {
    id: "2",
    name: "GreenEnergy Solutions",
    sector: "Clean Technology",
    founder: "Michael Rodriguez",
  },
  {
    id: "3",
    name: "HealthTracker Pro",
    sector: "Healthcare",
    founder: "Emily Johnson",
  },
  {
    id: "4",
    name: "FinanceWise",
    sector: "Fintech",
    founder: "David Kumar",
  },
];

export const mockReports: Report[] = [
  {
    id: "1",
    startupName: "TechFlow AI",
    date: "2024-01-15",
    workDone:
      "Completed user interface wireframes for the main dashboard. Implemented the machine learning model for text classification with 85% accuracy. Conducted user interviews with 5 potential customers to validate our product-market fit.",
    blockers:
      "Having issues with API rate limiting from our third-party data provider. The current limits are affecting our testing capabilities and we need to upgrade to a higher tier plan.",
    planForTomorrow:
      "Schedule a meeting with the API provider to discuss enterprise pricing. Begin implementation of the dashboard frontend using React. Start preparing for the investor pitch deck review.",
    fileName: "ml_model_results.pdf",
    adminFeedback:
      "Great progress on the ML model! Consider reaching out to alternative API providers as a backup plan. The user interview insights are valuable - document them well.",
  },
  {
    id: "2",
    startupName: "GreenEnergy Solutions",
    date: "2024-01-15",
    workDone:
      "Finalized the prototype design for our solar panel efficiency optimizer. Completed patent research and filed preliminary patent application. Met with potential manufacturing partner in Germany via video call.",
    blockers:
      "Waiting for regulatory approval from the energy commission. The process is taking longer than expected and might delay our product launch timeline.",
    planForTomorrow:
      "Follow up with regulatory team. Continue working on the mobile app mockups. Schedule a meeting with the incubator legal team to discuss patent strategy.",
    fileName: "prototype_specs.docx",
  },
  {
    id: "3",
    startupName: "HealthTracker Pro",
    date: "2024-01-14",
    workDone:
      "Integrated wearable device APIs (Fitbit, Apple Health) into our platform. Fixed critical bugs in the data synchronization module. Completed HIPAA compliance documentation review.",
    blockers:
      "Need additional funding for FDA approval process. Current runway allows us to operate for 4 more months, but FDA process requires 6-8 months.",
    planForTomorrow:
      "Prepare funding presentation for Series A round. Contact FDA consultant to optimize approval timeline. Test the new API integrations with beta users.",
    fileName: "hipaa_compliance.pdf",
    adminFeedback:
      "Excellent work on HIPAA compliance! For funding, consider applying for healthcare innovation grants in addition to Series A. The FDA consultant is a smart move.",
  },
  {
    id: "4",
    startupName: "FinanceWise",
    date: "2024-01-14",
    workDone:
      "Launched MVP version of our personal finance app on the App Store. Acquired first 100 beta users through social media marketing. Implemented bank account linking using Plaid API.",
    blockers:
      "User acquisition cost is higher than projected. Current CAC is $15 but our target was $8. Need to optimize marketing channels and messaging.",
    planForTomorrow:
      "Analyze user acquisition data to identify most cost-effective channels. A/B test different app store descriptions and screenshots. Plan influencer partnership strategy.",
    fileName: "mvp_metrics.xlsx",
  },
  {
    id: "5",
    startupName: "TechFlow AI",
    date: "2024-01-13",
    workDone:
      "Resolved API rate limiting issues by implementing caching layer. Improved model accuracy to 89% through hyperparameter tuning. Created project roadmap for next quarter.",
    blockers:
      "Team member availability - our lead developer has limited hours due to personal commitments. This might slow down frontend development.",
    planForTomorrow:
      "Interview potential frontend developers. Continue model optimization. Prepare technical documentation for the development team.",
    adminFeedback:
      "Consider hiring a freelance frontend developer as interim solution. Great improvement on model accuracy!",
  },
];
