import { supabase } from "./supabase";

// Portfolio API
export async function createPortfolio(portfolioData: any) {
  const { data, error } = await supabase
    .from("portfolios")
    .insert(portfolioData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserPortfolios(userId: string) {
  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getPortfolio(id: string) {
  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function updatePortfolio(id: string, updates: any) {
  const { data, error } = await supabase
    .from("portfolios")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePortfolio(id: string) {
  const { error } = await supabase.from("portfolios").delete().eq("id", id);

  if (error) throw error;
}

// Templates API
export async function getTemplates() {
  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .order("name");

  if (error) throw error;
  return data;
}

export async function getTemplate(id: string) {
  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

// Admin API
export async function getAllUsers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createTemplate(templateData: any) {
  const { data, error } = await supabase
    .from("templates")
    .insert(templateData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTemplate(id: string, updates: any) {
  const { data, error } = await supabase
    .from("templates")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTemplate(id: string) {
  const { error } = await supabase.from("templates").delete().eq("id", id);

  if (error) throw error;
}

// Analytics API
export async function getAnalytics() {
  const { data: users, error: usersError } = await supabase
    .from("profiles")
    .select("id", { count: "exact" });

  const { data: portfolios, error: portfoliosError } = await supabase
    .from("portfolios")
    .select("id", { count: "exact" });

  const { data: downloads, error: downloadsError } = await supabase
    .from("downloads")
    .select("id", { count: "exact" });

  if (usersError || portfoliosError || downloadsError) {
    throw usersError || portfoliosError || downloadsError;
  }

  return {
    users: users?.length || 0,
    portfolios: portfolios?.length || 0,
    downloads: downloads?.length || 0,
  };
}

export async function recordDownload(portfolioId: string, userId: string) {
  const { data, error } = await supabase
    .from("downloads")
    .insert({
      portfolio_id: portfolioId,
      user_id: userId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
