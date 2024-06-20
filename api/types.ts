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
  from: string;
  to: string;
}

export interface MonthlyResponse {
  month: string;
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
  Loading: number;
}

export interface ExportDataRequest {
  data: string[][];
}
