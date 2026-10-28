// Safe illustrative sample content labeled as requiring business confirmation.
// No fabricated lender claims, interest rates, or guarantees.

export const SAMPLE_SERVICES = [
  {
    slug: 'home-loans',
    category: 'home-loan',
    title: {
      en: 'Home Loans',
      hi: 'गृह ऋण (होम लोन)',
    },
    shortDescription: {
      en: 'Guidance on documentation and application processes for purchasing or constructing residential property.',
      hi: 'आवासीय संपत्ति खरीदने या निर्माण के लिए दस्तावेज़ीकरण और आवेदन प्रक्रिया पर मार्गदर्शन।',
    },
    description: {
      en: 'N.P Associates acts as an intermediary helping you understand lender requirements for residential home purchases, plot purchases, and construction. Note: Loan approvals and terms are determined solely by lending institutions.',
      hi: 'एन.पी एसोसिएट्स एक मध्यस्थ के रूप में आवासीय घर खरीद, प्लॉट खरीद और निर्माण के लिए ऋणदाता आवश्यकताओं को समझने में मदद करता है। ध्यान दें: ऋण स्वीकृति और शर्तें केवल संबंधित ऋण संस्थानों द्वारा निर्धारित की जाती हैं।',
    },
    eligibility: {
      en: [
        'Salaried or self-employed individuals with verifiable regular income source',
        'Valid identity, residence, and property ownership documentation',
        'Lender-specific credit criteria and underwriting parameters apply',
      ],
      hi: [
        'सत्यापन योग्य नियमित आय स्रोत वाले वेतनभोगी या स्व-नियोजित व्यक्ति',
        'वैध पहचान, निवास और संपत्ति के स्वामित्व से जुड़े दस्तावेज़',
        'ऋणदाता-विशिष्ट क्रेडिट मानदंड और शर्तें लागू होंगी',
      ],
    },
    documents: {
      en: [
        'Proof of Identity (PAN Card, Aadhaar Card, Passport or Voter ID)',
        'Proof of Residence / Address',
        'Income Proof: Recent Salary Slips / Form 16 / ITR with computation sheets',
        'Bank account statements for the past 6 months',
        'Property documents / agreement copy (subject to legal verification)',
      ],
      hi: [
        'पहचान का प्रमाण (पैन कार्ड, आधार कार्ड, पासपोर्ट या मतदाता पहचान पत्र)',
        'निवास / पते का प्रमाण',
        'आय प्रमाण: हाल की वेतन पर्चियां / फॉर्म 16 / गणना पत्रक के साथ आईटीआर',
        'पिछले 6 महीनों के बैंक खाते का विवरण',
        'संपत्ति के दस्तावेज़ / समझौते की प्रति (कानूनी सत्यापन के अधीन)',
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
      en: 'Assistance for enterprise working capital and business expansion application preparation.',
      hi: 'उद्यम कार्यशील पूंजी और व्यवसाय विस्तार आवेदन की तैयारी में सहायता।',
    },
    description: {
      en: 'Consultation and preliminary file preparation for registered businesses seeking working capital or expansion facilities through recognized institutional lenders.',
      hi: 'मान्यता प्राप्त संस्थागत ऋणदाताओं के माध्यम से कार्यशील पूंजी या विस्तार की तलाश करने वाले पंजीकृत व्यवसायों के लिए परामर्श और प्रारंभिक फ़ाइल तैयारी।',
    },
    eligibility: {
      en: [
        'Operating business with established continuity and valid registration (GST/MSME/Udyam)',
        'Audited or certified financial statements as required by lenders',
        'Satisfactory operational track record and lender credit assessment',
      ],
      hi: [
        'स्थापित निरंतरता और वैध पंजीकरण (जीएसटी/एमएसएमई/उद्यम) वाला सक्रिय व्यवसाय',
        'ऋणदाताओं द्वारा आवश्यक ऑडिटेड या प्रमाणित वित्तीय विवरण',
        'संतोषजनक परिचालन ट्रैक रिकॉर्ड और ऋणदाता क्रेडिट मूल्यांकन',
      ],
    },
    documents: {
      en: [
        'Business registration & license documents (GST certificate, MSME/Udyam)',
        'Last 2-3 years Income Tax Returns and financial statements',
        'Business bank account statements (last 6-12 months)',
        'KYC documents of partners, directors, or proprietor',
      ],
      hi: [
        'व्यवसाय पंजीकरण और लाइसेंस दस्तावेज़ (जीएसटी प्रमाणपत्र, एमएसएमई/उद्यम)',
        'पिछले 2-3 वर्षों के आयकर रिटर्न और वित्तीय विवरण',
        'व्यावसायिक बैंक खाता विवरण (पिछले 6-12 महीने)',
        'साझेदारों, निदेशकों या स्वामी के केवाईसी दस्तावेज़',
      ],
    },
    status: 'published',
    sortOrder: 2,
    reviewedAt: new Date(),
  },
  {
    slug: 'personal-loans',
    category: 'personal-loan',
    title: {
      en: 'Personal Loans',
      hi: 'व्यक्तिगत ऋण (पर्सनल लोन)',
    },
    shortDescription: {
      en: 'Guidance regarding unsecured personal loan options and prerequisite paperwork.',
      hi: 'असुरक्षित व्यक्तिगत ऋण विकल्पों और पूर्व-आवश्यक कागजी कार्रवाई से संबंधित मार्गदर्शन।',
    },
    description: {
      en: 'Support with comparing informational checklists for general personal credit needs. All interest rates, tenure, and approvals depend on the lending institution.',
      hi: 'सामान्य व्यक्तिगत ऋण आवश्यकताओं के लिए सूचनात्मक जाँच-सूचियों की तुलना में सहायता। सभी ब्याज दरें, अवधि और स्वीकृतियां ऋण देने वाली संस्था पर निर्भर करती हैं।',
    },
    eligibility: {
      en: [
        'Minimum age requirement as set by respective lending guidelines',
        'Regular monthly income via formal banking channel',
        'Subject to lender underwriting and credit bureau evaluations',
      ],
      hi: [
        'संबंधित ऋण दिशानिर्देशों द्वारा निर्धारित न्यूनतम आयु आवश्यकता',
        'औपचारिक बैंकिंग चैनल के माध्यम से नियमित मासिक आय',
        'ऋणदाता मूल्यांकन और क्रेडिट ब्यूरो रिपोर्ट के अधीन',
      ],
    },
    documents: {
      en: [
        'Standard KYC Documents (PAN, Aadhaar/ID proof)',
        'Recent salary slips (typically 3 months for salaried applicants)',
        'Bank statement showing salary credits for 3-6 months',
      ],
      hi: [
        'मानक केवाईसी दस्तावेज़ (पैन, आधार/पहचान प्रमाण)',
        'हाल की वेतन पर्चियां (आमतौर पर 3 महीने)',
        '3-6 महीने का बैंक स्टेटमेंट जिसमें वेतन क्रेडिट दिखता हो',
      ],
    },
    status: 'published',
    sortOrder: 3,
    reviewedAt: new Date(),
  },
  {
    slug: 'vehicle-loans',
    category: 'vehicle-loan',
    title: {
      en: 'Vehicle Loans',
      hi: 'वाहन ऋण (व्हीकल लोन)',
    },
    shortDescription: {
      en: 'Help with organizing your application for new or pre-owned vehicle financing.',
      hi: 'नए या पुराने वाहन वित्तपोषण के लिए अपना आवेदन व्यवस्थित करने में सहायता।',
    },
    description: {
      en: 'Assistance understanding proforma invoices, quotation guidelines, and lender documentation requirements for personal and commercial vehicles.',
      hi: 'व्यक्तिगत और वाणिज्यिक वाहनों के लिए प्रोफार्मा चालान, कोटेशन दिशानिर्देशों और ऋणदाता दस्तावेज़ीकरण आवश्यकताओं को समझने में सहायता।',
    },
    eligibility: {
      en: [
        'Eligible individual or business entity with stable repayment capability',
        'Valid vehicle quotation or valuation certificate (for pre-owned vehicles)',
      ],
      hi: [
        'स्थिर पुनर्भुगतान क्षमता वाला पात्र व्यक्ति या व्यावसायिक इकाई',
        'वैध वाहन कोटेशन या मूल्यांकन प्रमाणपत्र (पुराने वाहनों के लिए)',
      ],
    },
    documents: {
      en: [
        'Identity & residence verification paperwork',
        'Income stability proof (ITR or bank statements)',
        'Vehicle quotation or proforma invoice from an authorized dealer',
      ],
      hi: [
        'पहचान और निवास सत्यापन कागजी कार्रवाई',
        'आय स्थिरता प्रमाण (आईटीआर या बैंक विवरण)',
        'अधिकृत डीलर से वाहन कोटेशन या प्रोफार्मा चालान',
      ],
    },
    status: 'published',
    sortOrder: 4,
    reviewedAt: new Date(),
  },
  {
    slug: 'loan-against-property',
    category: 'loan-against-property',
    title: {
      en: 'Loan Against Property',
      hi: 'संपत्ति पर ऋण (मॉर्टगेज लोन)',
    },
    shortDescription: {
      en: 'Guidance on structuring mortgage loan applications against freehold property.',
      hi: 'फ्रीहोल्ड संपत्ति पर मॉर्टगेज ऋण आवेदनों को संरचित करने पर मार्गदर्शन।',
    },
    description: {
      en: 'Informational advisory on mortgaging residential or commercial property to access liquidity. Legal title clearance and technical property valuation are conducted by the respective lender.',
      hi: 'तरलता तक पहुँचने के लिए आवासीय या वाणिज्यिक संपत्ति को गिरवी रखने पर सूचनात्मक परामर्श। कानूनी शीर्षक मंजूरी और तकनीकी संपत्ति मूल्यांकन संबंधित ऋणदाता द्वारा किया जाता है।',
    },
    eligibility: {
      en: [
        'Clear and marketable title of the property without ongoing legal encumbrance',
        'Property owners and co-applicants with verifiable cash flows for repayment',
      ],
      hi: [
        'चल रहे कानूनी भार के बिना संपत्ति का स्पष्ट और विपणन योग्य शीर्षक',
        'पुनर्भुगतान के लिए सत्यापन योग्य नकदी प्रवाह वाले संपत्ति के मालिक और सह-आवेदक',
      ],
    },
    documents: {
      en: [
        'Registered title deed / conveyance deed and previous chain documents',
        'Approved building plan, tax paid receipts, and occupancy certificate if applicable',
        'Income proof (financials/ITR or salary records) and banking records',
      ],
      hi: [
        'पंजीकृत शीर्षक विलेख / हस्तांतरण विलेख और पिछले संबंधित दस्तावेज़',
        'अनुमोदित भवन योजना, कर भुगतान रसीदें और अधिभोग प्रमाण पत्र यदि लागू हो',
        'आय प्रमाण (वित्तीय/आईटीआर या वेतन रिकॉर्ड) और बैंकिंग रिकॉर्ड',
      ],
    },
    status: 'published',
    sortOrder: 5,
    reviewedAt: new Date(),
  },
  {
    slug: 'other-services',
    category: 'other-services',
    title: {
      en: 'Other Services',
      hi: 'अन्य वित्तीय सेवाएं',
    },
    shortDescription: {
      en: 'General documentation consultation, balance transfer inquiries, and financial file preparation.',
      hi: 'सामान्य दस्तावेज़ीकरण परामर्श, बैलेंस ट्रांसफर पूछताछ और वित्तीय फ़ाइल तैयारी।',
    },
    description: {
      en: 'General preliminary review and advisory assistance for existing loan balance transfer possibilities or custom financing inquiries. Decisions and final terms rest entirely with the lenders.',
      hi: 'मौजूदा ऋण शेष हस्तांतरण (बैलेंस ट्रांसफर) संभावनाओं या कस्टम वित्तपोषण पूछताछ के लिए सामान्य प्रारंभिक समीक्षा और परामर्श सहायता।',
    },
    eligibility: {
      en: [
        'Case-by-case evaluation based on applicant profile and lender-specific parameters',
      ],
      hi: [
        'आवेदक प्रोफ़ाइल और ऋणदाता-विशिष्ट मापदंडों के आधार पर व्यक्तिगत मूल्यांकन',
      ],
    },
    documents: {
      en: [
        'Basic KYC and income records relevant to the specific service request',
        'Existing loan repayment track records (for transfer requests)',
      ],
      hi: [
        'विशिष्ट सेवा अनुरोध से संबंधित बुनियादी केवाईसी और आय रिकॉर्ड',
        'मौजूदा ऋण पुनर्भुगतान ट्रैक रिकॉर्ड (स्थानांतरण अनुरोधों के लिए)',
      ],
    },
    status: 'published',
    sortOrder: 6,
    reviewedAt: new Date(),
  },
];

export const SAMPLE_GUIDELINES = [
  {
    slug: 'general-documentation-checklist',
    title: {
      en: 'General Documentation Preparation Checklist',
      hi: 'सामान्य दस्तावेज़ तैयारी जाँच-सूची',
    },
    content: {
      en: 'Applying for any loan facility requires organized documentation. Keeping standard KYC documents, recent bank statements, and income verification files ready helps reduce back-and-forth delays during initial file review. Note: Specific institutions may require supplementary verifications.',
      hi: 'किसी भी ऋण सुविधा के लिए आवेदन करने हेतु संगठित दस्तावेज़ीकरण की आवश्यकता होती है। मानक केवाईसी दस्तावेज़, हालिया बैंक स्टेटमेंट और आय सत्यापन फ़ाइलें तैयार रखने से प्रारंभिक समीक्षा के दौरान होने वाले अनावश्यक विलंब से बचा जा सकता है।',
    },
    status: 'published',
    sortOrder: 1,
    reviewedAt: new Date(),
  },
  {
    slug: 'understanding-loan-eligibility',
    title: {
      en: 'Understanding Loan Eligibility Considerations',
      hi: 'ऋण पात्रता से जुड़ी मुख्य बातें',
    },
    content: {
      en: 'Eligibility is evaluated by lenders using multiple criteria, including debt-to-income ratio, credit history, continuity of employment or business, and collateral valuation. No intermediary can guarantee loan sanction or override institutional underwriting standards.',
      hi: 'ऋणदाताओं द्वारा पात्रता का मूल्यांकन ऋण-से-आय अनुपात, क्रेडिट इतिहास, रोजगार या व्यवसाय की निरंतरता और संपार्श्विक मूल्यांकन सहित कई मानदंडों के आधार पर किया जाता है। कोई भी मध्यस्थ ऋण स्वीकृति की गारंटी नहीं दे सकता है।',
    },
    status: 'published',
    sortOrder: 2,
    reviewedAt: new Date(),
  },
  {
    slug: 'application-process-overview',
    title: {
      en: 'Loan Application Process Overview',
      hi: 'ऋण आवेदन प्रक्रिया का संक्षिप्त अवलोकन',
    },
    content: {
      en: 'The standard flow consists of: (1) Understanding your credit requirements, (2) Compiling the necessary informational documentation, (3) Submitting an enquiry to discuss options, and (4) Directly processing the formal application with the designated lending institution.',
      hi: 'मानक प्रक्रिया में शामिल हैं: (1) अपनी ऋण आवश्यकताओं को समझना, (2) आवश्यक सूचनात्मक दस्तावेज़ संकलित करना, (3) विकल्पों पर चर्चा करने के लिए पूछताछ सबमिट करना, और (4) नामित ऋण संस्थान के साथ सीधे औपचारिक आवेदन की प्रक्रिया आगे बढ़ाना।',
    },
    status: 'published',
    sortOrder: 3,
    reviewedAt: new Date(),
  },
];
