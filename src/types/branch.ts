import { ApiResponse } from "./common";

export interface Branch {
  user_id: string;
  user_name: string;
  branch_id: string;
  branch_name: string;
  sia_name: string;
  sipa_name: string;
  phone: string;
}

export interface BranchListResponse {
  status: string;
  message: string;
  data: Branch[];
}

export interface BranchListProps {
  branches: Branch[];
}

export interface BranchResponse {
  data: ApiResponse<string>;
}

export interface SetBranchPayload {
  branch_id: string;
}
