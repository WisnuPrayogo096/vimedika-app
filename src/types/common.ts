export interface ActionResult<T = any> {
  success: boolean;
  message: string;
  data?: T;
  fieldErrors?: Record<string, string>;
}

export interface ApiResponse<T = any> {
  status: string;
  message: string;
  data?: T;
}

export interface FormActionState {
  success: boolean;
  message: string;
}
