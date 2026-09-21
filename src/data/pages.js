// Static page content for the footer pages (Disclosure, About, Privacy, Terms,
// Editorial). Same structure as the live site.
//
// Block types: h2, h3, p, ul, ol.
// Inline syntax inside any text: **bold**, [label](/internal-path), [label](mailto:...),
// and "\n" for a line break inside a paragraph.

const EMAIL = "[contact@jyncow.com](mailto:contact@jyncow.com)";

export const legalPages = {
  disclosure: {
    title: "Company & Advertising Disclosure",
    blocks: [
      { t: "h2", x: "About This Website" },
      {
        t: "p",
        x: "Terms and conditions apply. Loan offers, interest rates, and repayment terms are subject to the lender's final assessment and Reserve Bank of India (RBI) guidelines, including digital lending regulations.",
      },
      {
        t: "p",
        x: "This website is an independent comparison portal and not a bank or Non-Banking Financial Company (NBFC) regulated by the RBI; we do not provide loans, make credit decisions, or guarantee approval.",
      },
      {
        t: "p",
        x: "Not a lender. Loan offers from third-party partners, results may be broadened. Commission may apply.",
      },
      { t: "h2", x: "Company Information" },
      { t: "p", x: "This website is published, operated, and promoted by:" },
      {
        t: "p",
        x: `**4ADS MEDIA LLC**\nRegistered in Florida, US\nRegistration: L21000233395\nEIN: 37-2002466\n5401 S Kirkman RD, Suite 135 - Orlando, FL 32819\nContact: ${EMAIL}`,
      },
      { t: "h2", x: "How We Make Money" },
      { t: "h3", x: "Display Advertising" },
      {
        t: "p",
        x: "We display advertisements managed by third-party advertising networks (including Google). Ad content is determined by the advertising networks based on various factors, and we do not control the specific ads shown.",
      },
      { t: "h3", x: "Affiliate Partnerships" },
      {
        t: "p",
        x: "When you click on a loan offer or apply through links on our site, we may earn a commission from the provider. This commission comes from the provider, not from you \u2014 there is no extra cost to you.",
      },
      { t: "h3", x: "Editorial Independence" },
      {
        t: "p",
        x: "Our revenue sources do not influence our editorial content. Providers cannot pay for better placement, more favorable coverage, or editorial changes. See our [Editorial Policy](/editorial) for details.",
      },
      { t: "h2", x: "Technology and Human Oversight" },
      {
        t: "p",
        x: "We use technology, including AI tools, to aggregate, organize, and present information. All automated processes are subject to human editorial oversight. For details, see our [Editorial Policy](/editorial).",
      },
    ],
  },

  about: {
    title: "About Us",
    blocks: [
      { t: "h2", x: "Our Mission" },
      {
        t: "p",
        x: "Jyncow helps you find and compare personal loans, credit options, and financial products. We believe everyone deserves access to clear, unbiased information to make better decisions.",
      },
      { t: "h2", x: "What We Do" },
      {
        t: "p",
        x: "We are a financial comparison platform that compiles loan offers from multiple sources, presenting them in a structured format so you can easily compare options and find what works for you.",
      },
      {
        t: "p",
        x: "**Jyncow** \u2014 We help you compare personal loan offers from multiple lenders, so you can find the best rates and terms for your financial needs.",
      },
      { t: "h2", x: "Our Team" },
      {
        t: "ul",
        items: [
          "**Esther de Sales** \u2014 Content Coordinator. Esther leads the editorial operation, setting content strategy, quality standards, and editorial guidelines across all verticals.",
          "**Nathalia Brum** \u2014 Editorial Research Analyst. Nathalia curates and verifies content, conducts market research, fact-checks data, and analyzes trends to maintain editorial accuracy.",
        ],
      },
      { t: "p", x: "Learn more about how we create content in our [Editorial Policy](/editorial)." },
      { t: "h2", x: "How We Stay Free" },
      {
        t: "p",
        x: "Jyncow is free to use. We fund our operations through display advertising and affiliate partnerships. When you interact with links on our site, we may earn a commission \u2014 at no extra cost to you.",
      },
      {
        t: "p",
        x: "Our revenue model is fully transparent. See our [Advertising Disclosure](/disclosure) for full details.",
      },
      { t: "h2", x: "Where We Are" },
      {
        t: "p",
        x: `**4ADS MEDIA LLC**\nFlorida, US\n5401 S Kirkman RD, Suite 135 - Orlando, FL 32819\n${EMAIL}`,
      },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    intro:
      "This Privacy Policy describes how 4ADS MEDIA LLC collects, uses, and protects your personal information when you visit jyncow.com.",
    blocks: [
      { t: "h2", x: "What We Do" },
      {
        t: "p",
        x: "**Jyncow** \u2014 We help you compare personal loan offers from multiple lenders, so you can find the best rates and terms for your financial needs.",
      },
      { t: "h2", x: "Aggregator Disclaimer" },
      {
        t: "p",
        x: "This website aggregates loan offers from third-party lenders and financial institutions. We do not directly provide, sell, or fulfill any loan offers listed on this platform.",
      },
      {
        t: "p",
        x: "Our editorial process and compensation structure are described in our [Advertising Disclosure](/disclosure) and [Editorial Policy](/editorial).",
      },
      { t: "h2", x: "Your Privacy Matters" },
      {
        t: "p",
        x: "We take your privacy seriously. If you have questions or concerns about this policy, please [contact us](/contact).",
      },
      { t: "h2", x: "Scope" },
      {
        t: "p",
        x: "This Privacy Policy applies solely to information collected through jyncow.com. Our site may contain links to third-party websites, which have their own privacy policies. We are not responsible for the privacy practices of those sites.",
      },
      { t: "h2", x: "Consent" },
      {
        t: "p",
        x: "By using this website, you consent to the collection and use of your information as described in this Privacy Policy and our [Terms of Use](/terms).",
      },
      { t: "h2", x: "AI Disclosure" },
      {
        t: "p",
        x: "Parts of our content may be produced or enhanced with the support of artificial intelligence tools. All AI-assisted content is reviewed for accuracy and quality. For more information about our content standards, see our [Editorial Policy](/editorial).",
      },
      { t: "h2", x: "I. Data Collection" },
      { t: "h3", x: "A. Information You Provide" },
      { t: "p", x: "We may collect information you voluntarily provide, including:" },
      {
        t: "ul",
        items: [
          "Email address (e.g. newsletter sign-up, account creation)",
          "Phone number (if you opt in to SMS notifications)",
          "Location preferences (city, region)",
          "Search queries and filter selections",
        ],
      },
      { t: "h3", x: "B. Information Collected Automatically" },
      { t: "p", x: "When you visit our site, we may automatically collect:" },
      {
        t: "ul",
        items: [
          "IP address and approximate geographic location",
          "Browser type, operating system, and device information",
          "Pages visited, time spent, and navigation patterns",
          "Cookies and similar tracking technologies (see Section V)",
          "Analytics data via third-party services (e.g. Google Analytics)",
        ],
      },
      { t: "h3", x: "C. Third Parties and Affiliate Partners" },
      {
        t: "p",
        x: "Our advertising and affiliate partners may use cookies, web beacons, and similar tracking technologies to collect anonymous data about your interactions with our site. For more details, see our [Advertising Disclosure](/disclosure).",
      },
      { t: "h2", x: "II. SMS Notifications" },
      {
        t: "p",
        x: "If you opt in to receive SMS notifications, you expressly consent to receiving text messages at the phone number you provide. You may opt out at any time by replying STOP. Message and data rates may apply.",
      },
      { t: "h2", x: "III. How We Use Your Information" },
      { t: "p", x: "We use the information we collect to:" },
      {
        t: "ul",
        items: [
          "Provide, maintain, and improve our services",
          "Personalize your experience and search results",
          "Display relevant advertising",
          "Communicate with you about updates or changes",
          "Detect and prevent fraud or abuse",
          "Comply with legal obligations",
        ],
      },
      { t: "h2", x: "IV. Data Sharing" },
      {
        t: "p",
        x: "We do not sell your personal data. We may share anonymized, aggregated data with our advertising and affiliate partners to improve service quality. Our partners may independently collect anonymized interaction signals through their own tracking technologies.",
      },
      { t: "h2", x: "V. Cookies" },
      { t: "p", x: "We use cookies and similar technologies for:" },
      {
        t: "ul",
        items: [
          "**Essential cookies:** Required for basic site functionality (e.g. session management).",
          "**Analytics cookies:** Help us understand how visitors use our site (e.g. Google Analytics). To learn how Google processes this data, visit [Google's Privacy & Terms](https://policies.google.com/technologies/partner-sites).",
          "**Advertising cookies:** Used by our advertising partners to serve relevant ads.",
          "**Preference cookies:** Remember your settings and preferences.",
        ],
      },
      {
        t: "p",
        x: "You can manage cookie preferences through your browser settings. Additionally, you can opt out of personalized advertising from third-party networks by visiting the following platforms:",
      },
      {
        t: "ul",
        items: [
          "[Google My Ad Center](https://myadcenter.google.com/) \u2014 Manage your ad personalization settings with Google.",
          "[YourAdChoices](https://youradchoices.com/) \u2014 Opt out of interest-based advertising from participating companies.",
        ],
      },
      { t: "p", x: "Disabling certain cookies may affect site functionality." },
      { t: "h2", x: "VI. Data Security" },
      {
        t: "p",
        x: "We implement reasonable technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
      },
      { t: "h2", x: "VII. Your Rights" },
      { t: "p", x: "You have the right to:" },
      {
        t: "ul",
        items: [
          "Access the personal information we hold about you",
          "Request correction of inaccurate information",
          "Request deletion of your personal information",
          "Withdraw consent for data processing where applicable",
        ],
      },
      { t: "p", x: "To exercise these rights, please [contact us](/contact)." },
      { t: "h2", x: "VIII. Children's Privacy" },
      {
        t: "p",
        x: "Our services are not directed to children under 16. We do not knowingly collect personal information from children under 16. If you believe a child has provided us with personal data, please [contact us](/contact) and we will promptly remove such information.",
      },
      { t: "h2", x: "IX. Changes to This Policy" },
      {
        t: "p",
        x: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Your continued use of the site after any changes constitutes acceptance of the revised policy.",
      },
      { t: "h2", x: "X. Contact" },
      { t: "p", x: "If you have questions about this Privacy Policy, please contact us:" },
      { t: "p", x: `**Email:** ${EMAIL}` },
      { t: "p", x: "You can also reach us through our [Contact page](/contact)." },
    ],
  },

  terms: {
    title: "Terms of Use",
    intro: "Welcome to jyncow.com. This website is published and operated by 4ADS MEDIA LLC.",
    blocks: [
      { t: "h2", x: "About the Platform" },
      {
        t: "p",
        x: "**Jyncow** \u2014 We help you compare personal loan offers from multiple lenders, so you can find the best rates and terms for your financial needs.",
      },
      {
        t: "p",
        x: "This website aggregates loan offers from third-party lenders and financial institutions. We do not directly provide, sell, or fulfill any loan offers listed on this platform.",
      },
      { t: "h2", x: "International Content" },
      {
        t: "p",
        x: "Our content may reference products, services, or providers that are not available in your country or region. Availability varies by location and is subject to the terms of individual providers.",
      },
      { t: "h2", x: "Copyright" },
      {
        t: "p",
        x: "All content on this website, including text, graphics, logos, and software, is the property of 4ADS MEDIA LLC or its content suppliers and is protected by international copyright laws. Unauthorized reproduction is prohibited.",
      },
      { t: "h2", x: "Article I \u2014 User Agreement" },
      {
        t: "p",
        x: "By accessing or using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree, please do not use this website.",
      },
      {
        t: "p",
        x: "You represent that you have the legal capacity to enter into this agreement and that you are at least 16 years of age.",
      },
      { t: "h2", x: "Article II \u2014 Communication" },
      {
        t: "p",
        x: "For questions, feedback, or concerns regarding the platform or these Terms, please visit our [Contact page](/contact).",
      },
      { t: "h2", x: "Article III \u2014 User and Platform Responsibilities" },
      {
        t: "ol",
        items: [
          "This platform is an aggregator. We compile loan offers from third-party sources for informational and comparison purposes.",
          "Links to third-party websites are provided for convenience. We are not a lender. All loan products are offered by third-party financial institutions. We do not guarantee approval or specific terms.",
          "We may earn commissions from affiliate partnerships when you interact with links on this site. This does not affect the price you pay. See our [Disclosure](/disclosure) for details.",
          "We display advertising from third-party networks. Ad content is determined by advertisers and ad networks, not by our editorial team.",
          "We do not sell your personal data. See our [Privacy Policy](/privacy) for details.",
          "You are responsible for maintaining the security of your device and any credentials used to access this site.",
          "We make reasonable efforts to ensure the site is available, but we do not guarantee uninterrupted or error-free access.",
          "Access to this website is provided free of charge.",
        ],
      },
      { t: "h2", x: "Article IV \u2014 Limitation of Liability" },
      {
        t: "p",
        x: "To the fullest extent permitted by applicable law, 4ADS MEDIA LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use this website.",
      },
      {
        t: "p",
        x: 'The information on this site is provided "as is" without warranties of any kind, either express or implied. We do not warrant the accuracy, completeness, or reliability of any content.',
      },
      { t: "h2", x: "Article V \u2014 Modifications" },
      {
        t: "p",
        x: "We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting. Your continued use of the site constitutes acceptance of the modified terms.",
      },
      { t: "h2", x: "Article VI \u2014 Governing Law" },
      {
        t: "p",
        x: "These Terms shall be governed by and construed in accordance with the laws of Florida, US, without regard to conflict of law principles.",
      },
      { t: "h2", x: "Article VII \u2014 Contact" },
      { t: "p", x: "If you have questions about these Terms of Use, please contact us:" },
      { t: "p", x: `**Email:** ${EMAIL}` },
      { t: "p", x: "[Contact page](/contact)" },
    ],
  },

  editorial: {
    title: "Editorial Policy",
    intro:
      "Jyncow is an independent financial comparison platform. We are committed to providing accurate, useful, and transparent content to help you make informed decisions.",
    blocks: [
      { t: "h2", x: "I. How We Produce Content" },
      {
        t: "p",
        x: "We aggregate loan offers from third-party lenders and financial institutions and present them in a structured, comparable format. Our editorial process includes:",
      },
      {
        t: "ul",
        items: [
          "Research and verification of listed information",
          "Structured categorization and comparison tools",
          "Regular updates to ensure accuracy",
        ],
      },
      {
        t: "p",
        x: "Parts of our content may be produced or enhanced with the support of artificial intelligence tools. All AI-assisted content is reviewed and validated by our editorial team to ensure quality and accuracy.",
      },
      { t: "h2", x: "II. Independence" },
      { t: "p", x: "We may earn commissions when you interact with affiliate links on our site. However:" },
      {
        t: "ul",
        items: [
          "Commissions never influence our editorial content, rankings, or recommendations.",
          "No provider can pay for better placement or more favorable coverage.",
          "Our editorial team operates independently from our business team.",
        ],
      },
      { t: "p", x: "For full details about our revenue model, see our [Advertising Disclosure](/disclosure)." },
      { t: "h2", x: "III. Our Editorial Team" },
      {
        t: "ul",
        items: [
          "**Esther de Sales** \u2014 Content Coordinator. Esther leads the editorial operation, setting content strategy, quality standards, and editorial guidelines across all verticals.",
          "**Nathalia Brum** \u2014 Editorial Research Analyst. Nathalia curates and verifies content, conducts market research, fact-checks data, and analyzes trends to maintain editorial accuracy.",
        ],
      },
      { t: "h2", x: "IV. Contact" },
      {
        t: "p",
        x: "If you have questions about our editorial process, corrections, or content concerns, please [contact us](/contact).",
      },
    ],
  },
};
