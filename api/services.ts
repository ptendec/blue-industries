import { TransformedData } from "../utils/data";
import {
  DailyResponse,
  ExportDataRequest,
  MonthlyResponse,
  UpdateDateRequest,
  WeeklyResponse,
} from "./types";

const API_BASE_URL =
  "https://w4i1vz3nzk.execute-api.us-east-1.amazonaws.com/dev/dashboard";

export const fetchDaily = async (
  fromDate: string,
  toDate: string
): Promise<DailyResponse[]> => {
  const response = await fetch(
    `${API_BASE_URL}/daily?fromDate=${fromDate}&toDate=${toDate}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchWeekly = async (
  fromDate: string,
  toDate: string
): Promise<WeeklyResponse[]> => {
  const response = await fetch(
    `${API_BASE_URL}/weekly?fromDate=${fromDate}&toDate=${toDate}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchMonthly = async (
  fromDate: string,
  toDate: string
): Promise<MonthlyResponse[]> => {
  const response = await fetch(
    `${API_BASE_URL}/monthly?fromDate=${fromDate}&toDate=${toDate}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const updateDate = async (data: UpdateDateRequest[]): Promise<void> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
};

export async function exportData(
  exportData: ExportDataRequest
): Promise<Response> {
  const response = await fetch(
    "https://w4i1vz3nzk.execute-api.us-east-1.amazonaws.com/dev/dashboard/export",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exportData),
    }
  );
  return response;
}
