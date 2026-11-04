// NP Associates service content based on the supplied company presentation.
// Business claims, lender partnerships, and service availability require confirmation.
// No fabricated lender affiliations, interest rates, or approval guarantees.

export const SAMPLE_SERVICES = [
  {
    slug: 'personal-loans',
    category: 'personal-loan',
    title: {
      en: 'Personal Loans',
      hi: 'व्यक्तिगत ऋण (पर्सनल लोन)',
    },
    shortDescription: {
      en: 'Financial guidance and assistance with personal loan documentation and application processes.',
      hi: 'पर्सनल लोन के दस्तावेज़ीकरण और आवेदन प्रक्रिया में वित्तीय मार्गदर्शन एवं सहायता।',
    },
    description: {
      en: 'NP Associates provides guidance to individuals exploring personal loan options through lending institutions. The service focuses on understanding documentation requirements and supporting the application process. Eligibility, interest rates, repayment terms, and final approval are determined by the respective lender.',
      hi: 'एन.पी. एसोसिएट्स व्यक्तिगत ऋण के विकल्प तलाशने वाले लोगों को ऋण संस्थानों के माध्यम से मार्गदर्शन प्रदान करता है। यह सेवा दस्तावेज़ों की आवश्यकताओं को समझने और आवेदन प्रक्रिया में सहायता करने पर केंद्रित है। पात्रता, ब्याज दरें, पुनर्भुगतान की शर्तें और अंतिम स्वीकृति संबंधित ऋणदाता द्वारा निर्धारित की जाती हैं।',
    },
    eligibility: {
      en: [
        'Eligibility is assessed according to the requirements of the respective lending institution',
        'Applicant identity, income, and other supporting information may be required',
        'Final eligibility and credit assessment remain the responsibility of the lender',
      ],
      hi: [
        'पात्रता का आकलन संबंधित ऋण संस्थान की आवश्यकताओं के अनुसार किया जाता है',
        'आवेदक की पहचान, आय और अन्य सहायक जानकारी की आवश्यकता हो सकती है',
        'अंतिम पात्रता और क्रेडिट मूल्यांकन की जिम्मेदारी ऋणदाता की होती है',
      ],
    },
    documents: {
      en: [
        'Identity and KYC documents, as required by the lender',
        'Address and residence proof, where applicable',
        'Income-related documents, where required',
        'Bank statements or other supporting financial records, as requested by the lender',
      ],
      hi: [
        'ऋणदाता की आवश्यकताओं के अनुसार पहचान और केवाईसी दस्तावेज़',
        'जहाँ आवश्यक हो, पते और निवास का प्रमाण',
        'आवश्यकतानुसार आय से संबंधित दस्तावेज़',
        'ऋणदाता द्वारा मांगे जाने पर बैंक स्टेटमेंट या अन्य वित्तीय रिकॉर्ड',
      ],
    },
    status: 'published',
    sortOrder: 1,
    reviewedAt: new Date(),
  },

  {
    slug: 'business-loans',
    category: 'business-loan',
    title: {
      en: 'Business Loans',
      hi: 'व्यापार ऋण (बिजनेस लोन)',
    },
    shortDescription: {
      en: 'Guidance for businesses seeking financial support for working capital and business expansion.',
      hi: 'कार्यशील पूंजी और व्यवसाय विस्तार के लिए वित्तीय सहायता तलाशने वाले व्यवसायों हेतु मार्गदर्शन।',
    },
    description: {
      en: 'NP Associates provides consultation and documentation assistance for businesses exploring financing options through banks and NBFCs. Business loans may be considered for working capital and expansion requirements, subject to the applicable lending product and lender assessment. The presentation also discusses overdraft (OD) and cash credit (CC) facilities. Availability and terms must be confirmed with the respective institution.',
      hi: 'एन.पी. एसोसिएट्स बैंकों और एनबीएफसी के माध्यम से वित्तपोषण विकल्प तलाशने वाले व्यवसायों को परामर्श और दस्तावेज़ीकरण में सहायता प्रदान करता है। कार्यशील पूंजी और व्यवसाय विस्तार की आवश्यकताओं के लिए बिजनेस लोन पर विचार किया जा सकता है, जो संबंधित ऋण उत्पाद और ऋणदाता के मूल्यांकन पर निर्भर करता है। प्रस्तुति में ओवरड्राफ्ट (OD) और कैश क्रेडिट (CC) सुविधाओं का भी उल्लेख है। इनकी उपलब्धता और शर्तों की पुष्टि संबंधित संस्था से की जानी चाहिए।',
    },
    eligibility: {
      en: [
        'Business eligibility is assessed according to the selected lender and financing product',
        'Business financial information and supporting records may be required',
        'Credit assessment, repayment capacity, and applicable lending criteria determine the outcome',
      ],
      hi: [
        'व्यवसाय की पात्रता चयनित ऋणदाता और वित्तपोषण उत्पाद के अनुसार निर्धारित होती है',
        'व्यवसाय से संबंधित वित्तीय जानकारी और सहायक रिकॉर्ड मांगे जा सकते हैं',
        'क्रेडिट मूल्यांकन, पुनर्भुगतान क्षमता और लागू ऋण मानदंडों के आधार पर निर्णय लिया जाता है',
      ],
    },
    documents: {
      en: [
        'Business registration and applicable business documents',
        'Financial statements and income-related records, as required',
        'Business bank statements, where requested',
        'Identity and KYC documents of the proprietor, partners, or directors, as applicable',
        'Additional documents required by the selected lending institution',
      ],
      hi: [
        'व्यवसाय पंजीकरण और लागू व्यावसायिक दस्तावेज़',
        'आवश्यकतानुसार वित्तीय विवरण और आय से संबंधित रिकॉर्ड',
        'मांगे जाने पर व्यवसाय के बैंक स्टेटमेंट',
        'लागू होने पर स्वामी, साझेदारों या निदेशकों के पहचान और केवाईसी दस्तावेज़',
        'चयनित ऋण संस्थान द्वारा मांगे गए अतिरिक्त दस्तावेज़',
      ],
    },
    status: 'published',
    sortOrder: 2,
    reviewedAt: new Date(),
  },

  {
    slug: 'home-loans',
    category: 'home-loan',
    title: {
      en: 'Home Loans',
      hi: 'गृह ऋण (होम लोन)',
    },
    shortDescription: {
      en: 'Guidance on home loan documentation and application requirements for residential property.',
      hi: 'आवासीय संपत्ति के लिए होम लोन के दस्तावेज़ों और आवेदन संबंधी आवश्यकताओं पर मार्गदर्शन।',
    },
    description: {
      en: 'NP Associates helps customers understand documentation and application requirements when exploring home financing options through lending institutions. The company presentation identifies home loans as one of its services. Property-related checks, eligibility, loan terms, and approval are subject to the requirements and assessment of the respective lender.',
      hi: 'एन.पी. एसोसिएट्स ऋण संस्थानों के माध्यम से गृह वित्तपोषण के विकल्प तलाशने वाले ग्राहकों को दस्तावेज़ों और आवेदन संबंधी आवश्यकताओं को समझने में सहायता करता है। कंपनी की प्रस्तुति में होम लोन को इसकी सेवाओं में शामिल किया गया है। संपत्ति संबंधी जाँच, पात्रता, ऋण की शर्तें और स्वीकृति संबंधित ऋणदाता की आवश्यकताओं एवं मूल्यांकन पर निर्भर करती हैं।',
    },
    eligibility: {
      en: [
        'Applicant eligibility is determined by the respective lending institution',
        'Income and repayment-related information may be required',
        'Property documents and applicable property checks are subject to lender requirements',
      ],
      hi: [
        'आवेदक की पात्रता संबंधित ऋण संस्थान द्वारा निर्धारित की जाती है',
        'आय और पुनर्भुगतान से संबंधित जानकारी मांगी जा सकती है',
        'संपत्ति के दस्तावेज़ और संबंधित जाँच ऋणदाता की आवश्यकताओं के अधीन हैं',
      ],
    },
    documents: {
      en: [
        'Identity and KYC documents',
        'Address and residence proof',
        'Income proof and relevant financial records',
        'Bank statements, where required',
        'Property documents or agreement copies, as applicable',
        'Additional documents requested by the lender',
      ],
      hi: [
        'पहचान और केवाईसी दस्तावेज़',
        'पते और निवास का प्रमाण',
        'आय प्रमाण और संबंधित वित्तीय रिकॉर्ड',
        'आवश्यकतानुसार बैंक स्टेटमेंट',
        'लागू होने पर संपत्ति के दस्तावेज़ या समझौते की प्रतियाँ',
        'ऋणदाता द्वारा मांगे गए अतिरिक्त दस्तावेज़',
      ],
    },
    status: 'published',
    sortOrder: 3,
    reviewedAt: new Date(),
  },

  {
    slug: 'loan-against-property',
    category: 'loan-against-property',
    title: {
      en: 'Loan Against Property',
      hi: 'संपत्ति पर ऋण (लोन अगेंस्ट प्रॉपर्टी)',
    },
    shortDescription: {
      en: 'Guidance on documentation and application requirements for property-backed financing.',
      hi: 'संपत्ति के बदले वित्तपोषण हेतु दस्तावेज़ों और आवेदन संबंधी आवश्यकताओं पर मार्गदर्शन।',
    },
    description: {
      en: 'NP Associates provides guidance to customers exploring a loan against property, also referred to as a mortgage loan. The company presentation identifies this as a service and discusses property-related documentation. Property ownership verification, legal checks, valuation, eligibility, and final lending terms are determined by the relevant institution and its appointed professionals.',
      hi: 'एन.पी. एसोसिएट्स संपत्ति के बदले ऋण लेने के विकल्प तलाशने वाले ग्राहकों को मार्गदर्शन प्रदान करता है। इसे मॉर्टगेज लोन भी कहा जाता है। कंपनी की प्रस्तुति में इस सेवा और संपत्ति से संबंधित दस्तावेज़ों का उल्लेख है। संपत्ति के स्वामित्व का सत्यापन, कानूनी जाँच, मूल्यांकन, पात्रता और अंतिम ऋण शर्तें संबंधित संस्था तथा उसके नियुक्त विशेषज्ञों द्वारा निर्धारित की जाती हैं।',
    },
    eligibility: {
      en: [
        'Eligibility depends on the lending institution and the proposed financing product',
        'Property ownership and supporting property documents may be required',
        'Repayment capacity, property assessment, and applicable lender criteria determine approval',
      ],
      hi: [
        'पात्रता ऋण संस्थान और प्रस्तावित वित्तपोषण उत्पाद पर निर्भर करती है',
        'संपत्ति का स्वामित्व और संबंधित दस्तावेज़ मांगे जा सकते हैं',
        'पुनर्भुगतान क्षमता, संपत्ति का मूल्यांकन और ऋणदाता के मानदंड स्वीकृति निर्धारित करते हैं',
      ],
    },
    documents: {
      en: [
        'Identity and KYC documents',
        'Property ownership or title documents',
        'Available property-related records, as requested',
        'Income and financial records required for the application',
        'Additional documents requested for legal verification or property assessment',
      ],
      hi: [
        'पहचान और केवाईसी दस्तावेज़',
        'संपत्ति के स्वामित्व या टाइटल से संबंधित दस्तावेज़',
        'मांगे जाने पर उपलब्ध संपत्ति संबंधी रिकॉर्ड',
        'आवेदन के लिए आवश्यक आय और वित्तीय रिकॉर्ड',
        'कानूनी सत्यापन या संपत्ति मूल्यांकन हेतु मांगे गए अतिरिक्त दस्तावेज़',
      ],
    },
    status: 'published',
    sortOrder: 4,
    reviewedAt: new Date(),
  },

  {
    slug: 'life-insurance',
    category: 'life-insurance',
    title: {
      en: 'Life Insurance',
      hi: 'जीवन बीमा (लाइफ इंश्योरेंस)',
    },
    shortDescription: {
      en: 'Assistance with life insurance enquiries and understanding the relevant documentation process.',
      hi: 'जीवन बीमा संबंधी पूछताछ और आवश्यक दस्तावेज़ीकरण प्रक्रिया को समझने में सहायता।',
    },
    description: {
      en: 'Life insurance is listed among the services in the NP Associates company presentation. Customers can enquire about available options and the applicable application process. Specific policy availability, benefits, premiums, exclusions, and issuance requirements must be confirmed with the relevant insurer or authorized provider.',
      hi: 'एन.पी. एसोसिएट्स की कंपनी प्रस्तुति में जीवन बीमा को इसकी सेवाओं में शामिल किया गया है। ग्राहक उपलब्ध विकल्पों और संबंधित आवेदन प्रक्रिया के बारे में जानकारी प्राप्त कर सकते हैं। पॉलिसी की उपलब्धता, लाभ, प्रीमियम, अपवाद और पॉलिसी जारी करने की आवश्यकताओं की पुष्टि संबंधित बीमाकर्ता या अधिकृत प्रदाता से की जानी चाहिए।',
    },
    eligibility: {
      en: [
        'Eligibility depends on the specific insurance policy and insurer requirements',
        'Applicant information and supporting documents may be required',
        'Policy issuance and acceptance are subject to the insurer’s applicable terms',
      ],
      hi: [
        'पात्रता संबंधित बीमा पॉलिसी और बीमाकर्ता की आवश्यकताओं पर निर्भर करती है',
        'आवेदक की जानकारी और सहायक दस्तावेज़ मांगे जा सकते हैं',
        'पॉलिसी जारी करना और आवेदन स्वीकार करना बीमाकर्ता की लागू शर्तों के अधीन है',
      ],
    },
    documents: {
      en: [
        'Identity and KYC documents, as required',
        'Address and contact information',
        'Additional information or documents requested by the insurer',
      ],
      hi: [
        'आवश्यकतानुसार पहचान और केवाईसी दस्तावेज़',
        'पते और संपर्क की जानकारी',
        'बीमाकर्ता द्वारा मांगी गई अतिरिक्त जानकारी या दस्तावेज़',
      ],
    },
    status: 'published',
    sortOrder: 5,
    reviewedAt: new Date(),
  },

  {
    slug: 'health-insurance',
    category: 'health-insurance',
    title: {
      en: 'Health Insurance',
      hi: 'स्वास्थ्य बीमा (हेल्थ इंश्योरेंस)',
    },
    shortDescription: {
      en: 'Assistance with health insurance enquiries and understanding policy application requirements.',
      hi: 'स्वास्थ्य बीमा संबंधी पूछताछ और पॉलिसी आवेदन की आवश्यकताओं को समझने में सहायता।',
    },
    description: {
      en: 'Health insurance is included in the services listed in the NP Associates presentation. Customers can enquire about policy options and the relevant application requirements. Coverage, premiums, waiting periods, exclusions, eligibility, and policy issuance are governed by the specific policy and insurer terms.',
      hi: 'एन.पी. एसोसिएट्स की प्रस्तुति में स्वास्थ्य बीमा को इसकी सेवाओं में शामिल किया गया है। ग्राहक बीमा पॉलिसी के विकल्पों और संबंधित आवेदन आवश्यकताओं के बारे में पूछताछ कर सकते हैं। कवरेज, प्रीमियम, प्रतीक्षा अवधि, अपवाद, पात्रता और पॉलिसी जारी करने की प्रक्रिया संबंधित पॉलिसी एवं बीमाकर्ता की शर्तों के अनुसार निर्धारित होती है।',
    },
    eligibility: {
      en: [
        'Eligibility depends on the selected policy and insurer requirements',
        'Applicant details and other information requested by the insurer may be required',
        'Coverage and policy acceptance are subject to the applicable policy terms',
      ],
      hi: [
        'पात्रता चयनित पॉलिसी और बीमाकर्ता की आवश्यकताओं पर निर्भर करती है',
        'आवेदक का विवरण और बीमाकर्ता द्वारा मांगी गई अन्य जानकारी आवश्यक हो सकती है',
        'कवरेज और पॉलिसी की स्वीकृति लागू पॉलिसी शर्तों के अधीन हैं',
      ],
    },
    documents: {
      en: [
        'Identity and KYC documents, as required',
        'Address and contact information',
        'Additional information or documents requested by the insurer',
      ],
      hi: [
        'आवश्यकतानुसार पहचान और केवाईसी दस्तावेज़',
        'पते और संपर्क की जानकारी',
        'बीमाकर्ता द्वारा मांगी गई अतिरिक्त जानकारी या दस्तावेज़',
      ],
    },
    status: 'published',
    sortOrder: 6,
    reviewedAt: new Date(),
  },

  {
    slug: 'other-services',
    category: 'other-services',
    title: {
      en: 'Other Financial Services',
      hi: 'अन्य वित्तीय सेवाएँ',
    },
    shortDescription: {
      en: 'General financial guidance, banking information, and assistance understanding documentation requirements.',
      hi: 'सामान्य वित्तीय मार्गदर्शन, बैंकिंग संबंधी जानकारी और दस्तावेज़ीकरण आवश्यकताओं को समझने में सहायता।',
    },
    description: {
      en: 'The NP Associates presentation also introduces different types of banks and bank accounts. Customers can enquire about general banking information and documentation support relevant to their needs. Any specific financial product, account facility, balance transfer, or other service must be confirmed before being represented as available through NP Associates.',
      hi: 'एन.पी. एसोसिएट्स की प्रस्तुति में विभिन्न प्रकार के बैंकों और बैंक खातों का परिचय भी दिया गया है। ग्राहक अपनी आवश्यकताओं से संबंधित सामान्य बैंकिंग जानकारी और दस्तावेज़ीकरण सहायता के लिए पूछताछ कर सकते हैं। किसी विशेष वित्तीय उत्पाद, खाता सुविधा, बैलेंस ट्रांसफर या अन्य सेवा को एन.पी. एसोसिएट्स के माध्यम से उपलब्ध बताने से पहले उसकी पुष्टि आवश्यक है।',
    },
    eligibility: {
      en: [
        'Requirements depend on the specific banking or financial service requested',
        'The relevant bank or financial institution determines its own eligibility criteria',
        'Additional verification may be required by the institution providing the service',
      ],
      hi: [
        'आवश्यकताएँ अनुरोधित बैंकिंग या वित्तीय सेवा पर निर्भर करती हैं',
        'संबंधित बैंक या वित्तीय संस्था अपने पात्रता मानदंड निर्धारित करती है',
        'सेवा प्रदान करने वाली संस्था द्वारा अतिरिक्त सत्यापन आवश्यक हो सकता है',
      ],
    },
    documents: {
      en: [
        'Identity and KYC documents, where applicable',
        'Address and contact information, where required',
        'Documents specific to the requested banking or financial service',
      ],
      hi: [
        'जहाँ लागू हो, पहचान और केवाईसी दस्तावेज़',
        'आवश्यकतानुसार पते और संपर्क की जानकारी',
        'अनुरोधित बैंकिंग या वित्तीय सेवा से संबंधित विशिष्ट दस्तावेज़',
      ],
    },
    status: 'published',
    sortOrder: 7,
    reviewedAt: new Date(),
  },
];

export const SAMPLE_GUIDELINES = [
  {
    slug: 'general-documentation-checklist',
    title: {
      en: 'General Documentation Checklist',
      hi: 'सामान्य दस्तावेज़ीकरण जाँच-सूची',
    },
    content: {
      en: 'The NP Associates presentation highlights the importance of preparing documents relevant to the requested financial service. Depending on the product, these may include identity and KYC documents, address proof, income-related records, bank statements, business records, or property documents. The exact checklist depends on the relevant bank, NBFC, insurer, and product. Confirm the current requirements before submitting an application.',
      hi: 'एन.पी. एसोसिएट्स की प्रस्तुति अनुरोधित वित्तीय सेवा से संबंधित दस्तावेज़ तैयार रखने के महत्व पर जोर देती है। उत्पाद के अनुसार इनमें पहचान और केवाईसी दस्तावेज़, पते का प्रमाण, आय संबंधी रिकॉर्ड, बैंक स्टेटमेंट, व्यावसायिक रिकॉर्ड या संपत्ति के दस्तावेज़ शामिल हो सकते हैं। सटीक जाँच-सूची संबंधित बैंक, एनबीएफसी, बीमाकर्ता और उत्पाद पर निर्भर करती है। आवेदन जमा करने से पहले वर्तमान आवश्यकताओं की पुष्टि करें।',
    },
    status: 'published',
    sortOrder: 1,
    reviewedAt: new Date(),
  },

  {
    slug: 'understanding-financial-eligibility',
    title: {
      en: 'Understanding Financial Eligibility',
      hi: 'वित्तीय पात्रता को समझना',
    },
    content: {
      en: 'Eligibility and approval conditions vary across financial products and institutions. Banks, NBFCs, and insurers apply their own requirements when assessing an application or proposal. NP Associates presents itself as a source of financial guidance and application assistance; the company presentation does not establish guaranteed approvals, fixed interest rates, or universal eligibility criteria. Customers should confirm applicable terms directly with the relevant institution.',
      hi: 'वित्तीय उत्पादों और संस्थानों के अनुसार पात्रता तथा स्वीकृति की शर्तें अलग-अलग होती हैं। बैंक, एनबीएफसी और बीमाकर्ता आवेदन या प्रस्ताव का मूल्यांकन करते समय अपनी आवश्यकताएँ लागू करते हैं। एन.पी. एसोसिएट्स स्वयं को वित्तीय मार्गदर्शन और आवेदन सहायता प्रदान करने वाली संस्था के रूप में प्रस्तुत करता है; कंपनी की प्रस्तुति में ऋण स्वीकृति की गारंटी, निश्चित ब्याज दरों या सभी पर लागू होने वाले पात्रता मानदंडों की पुष्टि नहीं की गई है। ग्राहकों को संबंधित संस्था से लागू शर्तों की पुष्टि करनी चाहिए।',
    },
    status: 'published',
    sortOrder: 2,
    reviewedAt: new Date(),
  },

  {
    slug: 'financial-application-process',
    title: {
      en: 'Financial Application Process',
      hi: 'वित्तीय आवेदन प्रक्रिया',
    },
    content: {
      en: 'The NP Associates presentation emphasizes guidance, documentation assistance, transparent processing, and support for customers exploring financial solutions. A general enquiry may begin with understanding the customer’s requirement, identifying the relevant service, preparing the required information, and confirming the next steps with the relevant institution. The formal application, assessment, and final decision are subject to the applicable bank, NBFC, or insurer process.',
      hi: 'एन.पी. एसोसिएट्स की प्रस्तुति वित्तीय समाधान तलाशने वाले ग्राहकों के लिए मार्गदर्शन, दस्तावेज़ीकरण सहायता, पारदर्शी प्रक्रिया और सहयोग पर जोर देती है। सामान्य पूछताछ की शुरुआत ग्राहक की आवश्यकता समझने, संबंधित सेवा की पहचान करने, आवश्यक जानकारी तैयार करने और संबंधित संस्था से अगले चरणों की पुष्टि करने से हो सकती है। औपचारिक आवेदन, मूल्यांकन और अंतिम निर्णय संबंधित बैंक, एनबीएफसी या बीमाकर्ता की प्रक्रिया के अधीन हैं।',
    },
    status: 'published',
    sortOrder: 3,
    reviewedAt: new Date(),
  },
];