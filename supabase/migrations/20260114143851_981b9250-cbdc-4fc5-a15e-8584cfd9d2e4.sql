-- Add new roles to the app_role enum for the merged sustainability & agro-tech platform
-- New roles: public_user (citizens/farmers), action_partner (NGOs/CSR), authority (government/local bodies)

ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'public_user';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'action_partner';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'authority';