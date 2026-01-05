export type ClubInfo = {
  id: string;
  code: string;
  name: string;
  fullname: string;
  short_name: string;
  company: string;
  category: string;
  hometown: string;
  area?: string | null;
  period: number;
  website: string | null;
  settlement?: string | null;
  relatedCompanies?: string[] | null;
  annotation?: string[] | null;
};
