export interface Database {
  public: {
    Tables: {
      scraps: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          url: string;
          title: string;
          summary: string;
          image_url: string;
          thumbnail_url: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          url: string;
          title: string;
          summary: string;
          image_url: string;
          thumbnail_url: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          url?: string;
          title?: string;
          summary?: string;
          image_url?: string;
          thumbnail_url?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          created_at: string;
          username: string;
          email: string;
        };
        Insert: {
          id: string;
          created_at?: string;
          username: string;
          email: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          username?: string;
          email?: string;
        };
      };
    };
  };
}