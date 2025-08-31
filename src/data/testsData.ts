// NirAmaya Pathlabs - Test Catalog Data
// TODO: Replace with API integration later

export interface Test {
  code: string;
  name: string;
  sampleType: string;
  tat: string; // Turn Around Time
  mrp: number;
  maxDiscount: number; // Maximum discount percentage
  category: string;
  description?: string;
}

export interface Package {
  code: string;
  name: string;
  description: string;
  inclusions: string[];
  sampleTypes: string[];
  tat: string;
  mrp: number;
  maxDiscount: number;
  category: string;
  bestFor: string[];
  gender?: 'male' | 'female' | 'both';
  ageGroup?: string;
}

export const testsData: Test[] = [
  {
    code: "CBC001",
    name: "Complete Blood Count (CBC)",
    sampleType: "Blood",
    tat: "6 hours",
    mrp: 300,
    maxDiscount: 25,
    category: "Routine",
    description: "Complete blood profile including RBC, WBC, Platelets, Hemoglobin"
  },
  {
    code: "LFT001",
    name: "Liver Function Test (LFT)",
    sampleType: "Blood",
    tat: "12 hours",
    mrp: 600,
    maxDiscount: 30,
    category: "Organ Function",
    description: "Complete liver health assessment"
  },
  {
    code: "KFT001",
    name: "Kidney Function Test (KFT)",
    sampleType: "Blood",
    tat: "12 hours",
    mrp: 550,
    maxDiscount: 25,
    category: "Organ Function"
  },
  {
    code: "LIPID001",
    name: "Lipid Profile",
    sampleType: "Blood",
    tat: "12 hours",
    mrp: 700,
    maxDiscount: 30,
    category: "Heart Health"
  },
  {
    code: "THYROID001",
    name: "Thyroid Profile (T3, T4, TSH)",
    sampleType: "Blood",
    tat: "24 hours",
    mrp: 800,
    maxDiscount: 25,
    category: "Hormonal"
  },
  {
    code: "DIABETES001",
    name: "HbA1c (Diabetes)",
    sampleType: "Blood",
    tat: "12 hours",
    mrp: 450,
    maxDiscount: 20,
    category: "Diabetes"
  },
  {
    code: "VITD001",
    name: "Vitamin D (25-OH)",
    sampleType: "Blood",
    tat: "24 hours",
    mrp: 1200,
    maxDiscount: 35,
    category: "Vitamins"
  },
  {
    code: "VITB12001",
    name: "Vitamin B12",
    sampleType: "Blood",
    tat: "24 hours",
    mrp: 900,
    maxDiscount: 30,
    category: "Vitamins"
  }
];

export const packagesData: Package[] = [
  {
    code: "BASIC001",
    name: "Basic Health Checkup",
    description: "Essential health screening for routine monitoring",
    inclusions: ["Complete Blood Count", "Blood Sugar", "Lipid Profile", "Liver Function Test"],
    sampleTypes: ["Blood"],
    tat: "12 hours",
    mrp: 1500,
    maxDiscount: 30,
    category: "Basic",
    bestFor: ["Routine health monitoring", "Young adults", "Annual checkup"],
    gender: "both",
    ageGroup: "18-40 years"
  },
  {
    code: "COMP001",
    name: "Comprehensive Health Checkup",
    description: "Detailed health assessment covering major organ systems",
    inclusions: ["CBC", "LFT", "KFT", "Lipid Profile", "Thyroid Profile", "Diabetes Panel", "Vitamin D"],
    sampleTypes: ["Blood"],
    tat: "24 hours",
    mrp: 3500,
    maxDiscount: 35,
    category: "Comprehensive",
    bestFor: ["Complete health assessment", "40+ age group", "Family history concerns"],
    gender: "both",
    ageGroup: "40+ years"
  },
  {
    code: "WOMEN001",
    name: "Women's Health Package",
    description: "Specialized health screening for women",
    inclusions: ["CBC", "Thyroid Profile", "Iron Studies", "Vitamin D", "Calcium", "Hormonal Panel"],
    sampleTypes: ["Blood"],
    tat: "24 hours",
    mrp: 2800,
    maxDiscount: 30,
    category: "Women's Health",
    bestFor: ["Women's hormonal health", "Pregnancy planning", "Menopause management"],
    gender: "female",
    ageGroup: "20-60 years"
  },
  {
    code: "CARDIAC001",
    name: "Cardiac Risk Assessment",
    description: "Heart health evaluation and risk assessment",
    inclusions: ["Lipid Profile", "Cardiac Enzymes", "CRP", "Homocysteine", "ECG"],
    sampleTypes: ["Blood"],
    tat: "24 hours",
    mrp: 2200,
    maxDiscount: 25,
    category: "Cardiac",
    bestFor: ["Heart health monitoring", "Diabetes patients", "Family history of heart disease"],
    gender: "both",
    ageGroup: "35+ years"
  },
  {
    code: "CORPORATE001",
    name: "Corporate Executive Package",
    description: "Comprehensive health screening for working professionals",
    inclusions: ["CBC", "LFT", "KFT", "Lipid Profile", "Diabetes Panel", "Stress Markers", "Eye Checkup"],
    sampleTypes: ["Blood", "Urine"],
    tat: "24 hours",
    mrp: 4500,
    maxDiscount: 40,
    category: "Corporate",
    bestFor: ["Working professionals", "Executive health", "Stress management"],
    gender: "both",
    ageGroup: "25-55 years"
  }
];

export const pincodeData = [
  "110001", "110002", "110003", "110005", "110006", "110007", "110008", "110009",
  "110010", "110011", "110012", "110013", "110014", "110015", "110016", "110017",
  "122001", "122002", "122003", "122004", "122005", "122006", "122007", "122008",
  "201001", "201002", "201003", "201004", "201005", "201006", "201007", "201008"
  // Add more pincodes for service areas
];