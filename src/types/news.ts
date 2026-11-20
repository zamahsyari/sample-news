export type SectionSlug = 'World' | 'Cities' | 'Climate' | 'Science' | 'Culture';

export interface GallerySlide {
  id: string;
  plateNumber: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  location: string;
  photographer: string;
  aspect?: '16:9' | '4:3';
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
  plannerVotes: number;
  residentVotes: number;
}

export interface PollData {
  id: string;
  kicker: string;
  question: string;
  contextNote: string;
  closesLabel: string;
  hasSegmentFilter?: boolean;
  options: PollOption[];
}

export interface ComparisonProject {
  id: string;
  project: string;
  city: string;
  retentionM3: number;
  civicDaysPerYear: number;
  costMillionsUsd: number;
  yearCompleted: number;
}

export interface MarginNote {
  id: string;
  index: string;
  term: string;
  definition: string;
  sourceRef: string;
}

export interface FootnoteItem {
  id: number;
  citation: string;
  source: string;
}

export interface CommentItem {
  id: string;
  author: string;
  role: string;
  location: string;
  timestamp: string;
  createdAtMs: number;
  body: string;
  upvotes: number;
  upvotedByMe?: boolean;
  replies?: {
    id: string;
    author: string;
    role: string;
    timestamp: string;
    body: string;
  }[];
}

export interface ArticleSection {
  id: string;
  numeral: string;
  heading: string;
  paragraphs: string[];
  footnoteMarkers?: number[];
  pullQuote?: {
    quote: string;
    attribution: string;
  };
  embedGalleryAfter?: boolean;
  embedPrimaryPollAfter?: boolean;
  embedTableAfter?: boolean;
  embedSecondaryPollAfter?: boolean;
}

export interface ArticleData {
  id: string;
  section: SectionSlug;
  kicker: string;
  title: string;
  deck: string;
  publishedAt: string;
  readTimeMinutes: number;
  author: {
    name: string;
    initials: string;
    role: string;
    desk: string;
    bio: string;
  };
  hero: {
    src: string;
    alt: string;
    caption: string;
    credit: string;
  };
  leadParagraph: string;
  sections: ArticleSection[];
  gallery: GallerySlide[];
  primaryPoll: PollData;
  secondaryPoll: PollData;
  comparisonProjects?: ComparisonProject[];
  marginNotes: MarginNote[];
  keyMetrics: {
    label: string;
    value: string;
    unit: string;
  }[];
  footnotes: FootnoteItem[];
  initialComments: CommentItem[];
  relatedIds: string[];
}
