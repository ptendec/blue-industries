export interface DailyResponse {
  date: string;
  Temp: number;
  Pol: number;
  CNC: number;
  IG: number;
  Lami: number;
  Span: number;
  Cut: number;
  Crating: number;
  Loading: number;
}

export interface WeeklyResponse {
  date: string;
  Temp: number;
  Pol: number;
  CNC: number;
  IG: number;
  Lami: number;
  Span: number;
  Crating: number;
  Loading: number;
  Cut: number;
}

export interface MonthlyResponse {
  date: string;
  Temp: number;
  Pol: number;
  CNC: number;
  IG: number;
  Lami: number;
  Span: number;
  Crating: number;
  Cut: number;
  Loading: number;
}

export interface UpdateDateRequest {
  date: string;
  Temp: number;
  Pol: number;
  CNC: number;
  IG: number;
  Lami: number;
  Span: number;
  Cut: number;
  Crating: number;
  Loading: number;
}
