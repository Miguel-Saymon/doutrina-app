export type BloggerTextField = {
  $t: string;
};

export type BloggerCategory = {
  scheme?: string;
  term: string;
};

export type BloggerLink = {
  rel: string;
  type?: string;
  href: string;
  title?: string;
};

export type BloggerEntry = {
  id: BloggerTextField;
  published: BloggerTextField;
  updated: BloggerTextField;

  title: BloggerTextField;
  content: BloggerTextField;

  category?: BloggerCategory[];
  link?: BloggerLink[];
};

export type BloggerFeedResponse = {
  version: string;
  encoding: string;

  feed: {
    id: BloggerTextField;
    updated: BloggerTextField;

    entry?: BloggerEntry[];

    openSearch$totalResults?: BloggerTextField;
    openSearch$startIndex?: BloggerTextField;
    openSearch$itemsPerPage?: BloggerTextField;
  };
};