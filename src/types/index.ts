export interface Scrap {
  id: string;
  url: string;
  title: string;
  summary: string;
  imageUrl: string;
  thumbnailUrl: string;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  scraps: Scrap[];
}

export interface AuthState {
  user: User | null;
  rememberMe: boolean;
}