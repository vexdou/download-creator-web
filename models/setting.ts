export interface SocialLinks {
  tiktok?: string;
  instagram?: string;
  telegram?: string;
  whatsapp?: string;
  youtube?: string;
  github?: string;
}

export interface WebsiteSettings {
  profile: {
    name: string;
    description: string;
    photo: string;
  };
  about: string;
  media: {
    backgroundVideo: string;
    music: string;
  };
  socials: SocialLinks;
  notifications: {
    title: string;
    message: string;
    enabled: boolean;
  };
  updatedAt?: Date;
}
