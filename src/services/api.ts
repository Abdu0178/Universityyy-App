
const API_URL = "http://10.0.2.2:3000/api";

async function request<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`API қатесі: ${response.status}`);
  }

  return response.json();
}

export interface Course {
  id: number;
  title: string;
  teacher: string;
  credits: number;
  code?: string;
  icon?: string;
  description?: string;
  lessons?: string[];
}

export const getCourses = () =>
  request<Course[]>("/courses");

export const getSchedule = () =>
  request<any[]>("/schedule");

export const getGrades = () =>
  request<any[]>("/grades");

export const getNews = () =>
  request<any[]>("/news");

export const getProfile = () =>
  request<any>("/profile");
