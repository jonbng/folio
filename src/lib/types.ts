export interface ImageType {
  id: string;
  mainUrl: string;
  modalUrl: string;
  fullResUrl: string;
  thumbnailUrl: string;
  alt: string;
  width: number;
  height: number;
  blurDataUrl?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
  link?: string;
}

export interface WorkProject {
  id: number;
  title: string;
  tag: string;
  tagColor: string;
  description: string;
  shortDescription: string;
  image: string;
  year: string;
  detailedDescription: string;
  technologies: string[];
  team: TeamMember[];
  cover?: string;
  link?: string;
}
