export type Post = {
  id: string;
  title: string;
  html: string;
  preview: string;

  publishedAt: string;
  updatedAt: string;

  url: string;

  labels: string[];

  authors: string[];
  areas: string[];

  isGraduation: boolean;
};