import { ApiResponse } from "./common";

export interface ProfileData {
  user_id: string;
  profile_name: string;
  branch_id: string;
  branch_name: string;
  address: string;
  phone: string;
  email: string;
  sia_id: string;
  sia_name: string;
  psa_id: string;
  psa_name: string;
  sipa: string;
  sipa_name: string;
  aping_id: string;
  aping_name: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  tax_percentage: number;
  journal_method: string;
  branch_status: string;
  license_date: string;
  default_member: string;
  member_name: string;
}

export interface ProfileListResponse {
  status: string;
  message: string;
  data: ProfileData[];
}

export interface ProfileResponse {
  data: ApiResponse<string>;
}
