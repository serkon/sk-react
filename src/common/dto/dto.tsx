export interface LinkItem {
  to: string;
  title?: string;
  external?: boolean;
}

export interface Group {
  id: string;
  name: string;
  games: number[];
}

export interface Provider {
  id: number;
  name: string;
  logo: string;
}

export interface Game {
  id: number;
  name: string;
  provider: number;
  cover: string;
  coverLarge: string;
  date: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  name?: string;
  email?: string;
  avatar?: string;
  provider?: number;
}

/**
 * Http Request & Response DTOS
 */

export interface HttpRequest<T> {
  data: T;
  paging?: { current: number; limit: number };
  sort?: { field: string; order: string }[];
}

export interface HttpResponse<T> {
  data: T;
  paging?: { current: number; limit: number; total: number };
  message?: string;
}
