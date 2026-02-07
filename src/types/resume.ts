export type Gender = '男' | '女' | '記載なし' | string;
export type EmploymentType = '正社員' | '契約社員' | '派遣社員' | '業務委託' | 'アルバイト・パート' | string;

export interface PersonalInfo {
  name: string;
  kana: string;
  birthday: string;
  age: string;
  gender: Gender;
  postalCode: string;
  address: string;
  addressKana: string;
  phone: string;
  mobile: string;
  email: string;
  photo?: string; // Data URL
  altPostalCode?: string;
  altAddress?: string;
  altAddressKana?: string;
  altPhone?: string;
}

export interface EducationEntry {
  id: string;
  year: string;
  month: string;
  content: string;
}

export interface ExperienceEntry {
  id: string;
  year: string;
  month: string;
  content: string;
}

export interface LicenseEntry {
  id: string;
  year: string;
  month: string;
  content: string;
}

export interface ResumeData {
  submissionDate: string;
  personalInfo: PersonalInfo;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  licenses: LicenseEntry[];
  motivation: string;
  selfPromotion: string;
  commuteTime: string;
  dependents: string;
  spouse: string;
  spouseSupport: string;
  requests: string;
}

// Shokumu Keirekisho (CV) Types
export interface CVProject {
  id: string;
  period: string;
  name: string;
  content: string;
  role: string;
  teamSize?: string; // 規模・人数
  environment?: string; // 使用ツール・言語・環境
  performance?: string; // 実績・成果
}

export interface CVWorkHistoryEntry {
  id: string;
  periodStart: string; 
  periodEnd: string;
  company: string;
  businessContent?: string; // 事業内容
  capital?: string; // 資本金
  revenue?: string; // 売上高
  employees?: string; // 従業員数
  position: string; // 役職
  employmentType: EmploymentType; // 雇用形態
  projects: CVProject[];
}

export interface CVLicenseEntry {
  id: string;
  date: string;
  name: string;
}

export interface CVData {
  submissionDate: string;
  summary: string; // 職務要約
  workHistory: CVWorkHistoryEntry[];
  skills: string; // 活かせる経験・知識・技術
  licenses: CVLicenseEntry[]; // 資格・免許
  selfPromotion: string; // 自己PR
}