export enum Category {
  ALL = '全部',
  GENERAL = '综合',
  LANDSCAPE = '风景',
  PORTRAIT = '人像',
  TECHNOLOGY = '科技',
  FOOD = '美食',
  VINTAGE = '复古',
  VECTOR = '矢量/插画',
  TEXTURE = '纹理'
}

export interface ResourceSite {
  id: string;
  name: string;
  url: string;
  description: string;
  categories: Category[];
  tags: string[];
  popular: boolean;
}

export interface AISearchResult {
  keywords: string[];
  recommendedCategories: Category[];
  reasoning: string;
}