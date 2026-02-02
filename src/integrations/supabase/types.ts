export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      donations: {
        Row: {
          amount: number
          created_at: string
          domain: Database["public"]["Enums"]["issue_domain"]
          donor_id: string | null
          donor_name: string
          id: string
          is_anonymous: boolean
          location_name: string
          message: string | null
          project_name: string
        }
        Insert: {
          amount: number
          created_at?: string
          domain: Database["public"]["Enums"]["issue_domain"]
          donor_id?: string | null
          donor_name?: string
          id?: string
          is_anonymous?: boolean
          location_name: string
          message?: string | null
          project_name: string
        }
        Update: {
          amount?: number
          created_at?: string
          domain?: Database["public"]["Enums"]["issue_domain"]
          donor_id?: string | null
          donor_name?: string
          id?: string
          is_anonymous?: boolean
          location_name?: string
          message?: string | null
          project_name?: string
        }
        Relationships: []
      }
      issues: {
        Row: {
          actioned_at: string | null
          actioned_by: string | null
          created_at: string
          crop_stress_level: Database["public"]["Enums"]["risk_level"] | null
          description: string
          domain: Database["public"]["Enums"]["issue_domain"]
          drinking_water_risk: Database["public"]["Enums"]["risk_level"] | null
          id: string
          irrigation_impact: Database["public"]["Enums"]["risk_level"] | null
          latitude: number | null
          location_name: string
          longitude: number | null
          photo_url: string | null
          reported_by: string | null
          resolved_at: string | null
          resolved_by: string | null
          seasonal_relevance: string | null
          soil_health_risk: Database["public"]["Enums"]["risk_level"] | null
          status: Database["public"]["Enums"]["issue_status"]
          title: string
          updated_at: string
        }
        Insert: {
          actioned_at?: string | null
          actioned_by?: string | null
          created_at?: string
          crop_stress_level?: Database["public"]["Enums"]["risk_level"] | null
          description: string
          domain: Database["public"]["Enums"]["issue_domain"]
          drinking_water_risk?: Database["public"]["Enums"]["risk_level"] | null
          id?: string
          irrigation_impact?: Database["public"]["Enums"]["risk_level"] | null
          latitude?: number | null
          location_name: string
          longitude?: number | null
          photo_url?: string | null
          reported_by?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          seasonal_relevance?: string | null
          soil_health_risk?: Database["public"]["Enums"]["risk_level"] | null
          status?: Database["public"]["Enums"]["issue_status"]
          title: string
          updated_at?: string
        }
        Update: {
          actioned_at?: string | null
          actioned_by?: string | null
          created_at?: string
          crop_stress_level?: Database["public"]["Enums"]["risk_level"] | null
          description?: string
          domain?: Database["public"]["Enums"]["issue_domain"]
          drinking_water_risk?: Database["public"]["Enums"]["risk_level"] | null
          id?: string
          irrigation_impact?: Database["public"]["Enums"]["risk_level"] | null
          latitude?: number | null
          location_name?: string
          longitude?: number | null
          photo_url?: string | null
          reported_by?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          seasonal_relevance?: string | null
          soil_health_risk?: Database["public"]["Enums"]["risk_level"] | null
          status?: Database["public"]["Enums"]["issue_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      milestones: {
        Row: {
          achieved_by: string | null
          achieved_by_name: string | null
          achieved_by_type: Database["public"]["Enums"]["app_role"] | null
          created_at: string
          description: string
          domain: Database["public"]["Enums"]["issue_domain"]
          icon_type: string
          id: string
          location_name: string
          metric_unit: string | null
          metric_value: number | null
          title: string
        }
        Insert: {
          achieved_by?: string | null
          achieved_by_name?: string | null
          achieved_by_type?: Database["public"]["Enums"]["app_role"] | null
          created_at?: string
          description: string
          domain: Database["public"]["Enums"]["issue_domain"]
          icon_type?: string
          id?: string
          location_name: string
          metric_unit?: string | null
          metric_value?: number | null
          title: string
        }
        Update: {
          achieved_by?: string | null
          achieved_by_name?: string | null
          achieved_by_type?: Database["public"]["Enums"]["app_role"] | null
          created_at?: string
          description?: string
          domain?: Database["public"]["Enums"]["issue_domain"]
          icon_type?: string
          id?: string
          location_name?: string
          metric_unit?: string | null
          metric_value?: number | null
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          id: string
          name: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          id: string
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role:
        | "citizen"
        | "ngo"
        | "government"
        | "research"
        | "public_user"
        | "action_partner"
        | "authority"
      issue_domain: "air" | "water" | "waste"
      issue_status: "reported" | "actioned" | "resolved"
      risk_level: "low" | "medium" | "high"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "citizen",
        "ngo",
        "government",
        "research",
        "public_user",
        "action_partner",
        "authority",
      ],
      issue_domain: ["air", "water", "waste"],
      issue_status: ["reported", "actioned", "resolved"],
      risk_level: ["low", "medium", "high"],
    },
  },
} as const
