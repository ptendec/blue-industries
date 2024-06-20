export interface DailyResponse {
  date: string;
  Temp: number;
  Pol: number;
  CNC: number;
  IG: number;
  Lami: number;
  Span: number;
  Cut: number;
  Creating: number;
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
  Creating: number;
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
  Creating: number;
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
  Creating: number;
  Loading: number;
}

export interface ExportDataRequest {
  data: string[][];
}
