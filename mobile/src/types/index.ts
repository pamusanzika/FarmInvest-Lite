export interface Investment {
  id: number | string;
  farmer_name: string;
  crop: string;
  amount: number;
  created_at: string;
  optimistic?: boolean;
}

export interface InvestmentFormData {
  farmer_name: string;
  crop: string;
  amount: string;
}

export interface ApiError {
  error: string;
}
