// Calculator registry. Each entry drives one routed page (/calculators/:slug)
// and one card on the /calculators index. `kind` picks the component in
// pages/calculator/calculator.jsx; `props` are passed straight to it.

const CORE = "Core loan calculators";

const emiFormula = {
  main: "EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)",
  where: [
    "P = loan amount (principal)",
    "r = monthly interest rate = annual rate ÷ 12 ÷ 100",
    "n = number of monthly instalments",
    "If the rate is 0%, EMI = P ÷ n",
  ],
};

const emiAbout = (subject) => [
  `An EMI (Equated Monthly Instalment) is the fixed amount paid every month until a loan is fully repaid. Each EMI has two parts: interest on the balance still owed, and a principal portion that reduces the balance. Early instalments are mostly interest; later ones are mostly principal.`,
  `This calculator uses the reducing-balance method, where interest is charged only on the outstanding balance. Use it to understand how ${subject} works and to compare scenarios. Results are estimates; actual loan terms, fees and rounding vary by lender.`,
];

function emiTool({ slug, title, summary, intro, subject, principalLabel, defaults, limits }) {
  return {
    slug,
    kind: "emi",
    title,
    category: CORE,
    summary,
    metaTitle: `${title} – Estimate Monthly EMI`,
    metaDescription: `Free ${title.toLowerCase()}: enter amount, interest rate and tenure to estimate your monthly EMI, total interest and total payment. For information only.`,
    intro,
    props: { principalLabel, defaults, limits },
    about: emiAbout(subject),
    formula: emiFormula,
  };
}

export const calculators = [
  emiTool({
    slug: "emi-calculator",
    title: "EMI Calculator",
    summary: "Monthly EMI, total interest and total payment for any loan.",
    intro:
      "Estimate the monthly instalment (EMI) for any loan. Enter the amount, yearly interest rate and tenure to see the EMI, the total interest and the total amount repaid.",
    subject: "a loan",
    principalLabel: "Loan amount",
    defaults: { principal: 500000, rate: 10, tenure: 5 },
    limits: { principal: [10000, 100000000], rate: [1, 30], tenureYears: [1, 30] },
  }),
  emiTool({
    slug: "home-loan-emi-calculator",
    title: "Home Loan EMI Calculator",
    summary: "Estimate mortgage EMI over long tenures of up to 30 years.",
    intro:
      "Estimate the monthly EMI on a home loan or mortgage. Long tenures lower the EMI but increase the total interest paid, and this tool shows both.",
    subject: "a home loan or mortgage",
    principalLabel: "Home loan amount",
    defaults: { principal: 5000000, rate: 8.5, tenure: 20 },
    limits: { principal: [100000, 100000000], rate: [5, 20], tenureYears: [1, 30] },
  }),
  emiTool({
    slug: "car-loan-emi-calculator",
    title: "Car Loan EMI Calculator",
    summary: "Estimate monthly EMI for a new or used car loan.",
    intro:
      "Estimate the monthly EMI for a car loan. Try different amounts and tenures to see how the instalment and total interest change.",
    subject: "a car loan",
    principalLabel: "Car loan amount",
    defaults: { principal: 800000, rate: 9, tenure: 5 },
    limits: { principal: [50000, 50000000], rate: [5, 25], tenureYears: [1, 10] },
  }),
  emiTool({
    slug: "bike-loan-emi-calculator",
    title: "Bike Loan EMI Calculator",
    summary: "Estimate EMI for a two-wheeler (bike or scooter) loan.",
    intro:
      "Estimate the monthly EMI for a bike or two-wheeler loan. Two-wheeler loans usually have shorter tenures, so compare a few options.",
    subject: "a two-wheeler loan",
    principalLabel: "Bike loan amount",
    defaults: { principal: 100000, rate: 12, tenure: 3 },
    limits: { principal: [10000, 3000000], rate: [5, 30], tenureYears: [1, 7] },
  }),
  emiTool({
    slug: "personal-loan-emi-calculator",
    title: "Personal Loan EMI Calculator",
    summary: "Estimate EMI for an unsecured personal loan.",
    intro:
      "Estimate the monthly EMI for a personal loan. Unsecured loans usually carry higher rates, so small rate differences can change the total cost noticeably.",
    subject: "a personal loan",
    principalLabel: "Personal loan amount",
    defaults: { principal: 300000, rate: 12, tenure: 3 },
    limits: { principal: [10000, 5000000], rate: [6, 36], tenureYears: [1, 7] },
  }),
  emiTool({
    slug: "education-loan-emi-calculator",
    title: "Education Loan EMI Calculator",
    summary: "Estimate EMI for a student or education loan.",
    intro:
      "Estimate the monthly EMI for an education or student loan. This tool covers the repayment stage; any moratorium or study-period interest is not included.",
    subject: "an education loan",
    principalLabel: "Education loan amount",
    defaults: { principal: 1000000, rate: 9.5, tenure: 7 },
    limits: { principal: [50000, 20000000], rate: [5, 20], tenureYears: [1, 15] },
  }),
  emiTool({
    slug: "business-loan-emi-calculator",
    title: "Business Loan EMI Calculator",
    summary: "Estimate EMI for a small or medium business loan.",
    intro:
      "Estimate the monthly EMI for a business loan. Use it to see how loan size, rate and tenure affect your monthly cash outflow.",
    subject: "a business loan",
    principalLabel: "Business loan amount",
    defaults: { principal: 1000000, rate: 14, tenure: 3 },
    limits: { principal: [50000, 100000000], rate: [6, 36], tenureYears: [1, 15] },
  }),
  emiTool({
    slug: "gold-loan-emi-calculator",
    title: "Gold Loan EMI Calculator",
    summary: "Estimate EMI for a loan secured against gold.",
    intro:
      "Estimate the monthly EMI for a gold loan. Gold loans are secured and usually short-term, so tenures here run from 1 to 3 years.",
    subject: "a gold loan",
    principalLabel: "Gold loan amount",
    defaults: { principal: 100000, rate: 10, tenure: 1 },
    limits: { principal: [10000, 5000000], rate: [5, 30], tenureYears: [1, 3] },
  }),
];

export const calculatorCategories = [...new Set(calculators.map((c) => c.category))];

export const getCalculator = (slug) => calculators.find((c) => c.slug === slug);