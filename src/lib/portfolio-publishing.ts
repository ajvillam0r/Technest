import { supabase } from "./supabase";
import { sendPortfolioPublishedEmail } from "./email";

export async function publishPortfolio(portfolioId: string, userId: string) {
  try {
    // Get the portfolio data
    const { data: portfolio, error: portfolioError } = await supabase
      .from("portfolios")
      .select("*")
      .eq("id", portfolioId)
      .eq("user_id", userId)
      .single();

    if (portfolioError) throw portfolioError;

    // Generate a unique slug for the portfolio
    const slug = generateSlug(portfolio.title);

    // Update the portfolio with the published status and slug
    const { error: updateError } = await supabase
      .from("portfolios")
      .update({
        is_published: true,
        slug: slug,
        published_at: new Date().toISOString(),
      })
      .eq("id", portfolioId);

    if (updateError) throw updateError;

    // Get user email for notification
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    // Send email notification
    const portfolioUrl = `${import.meta.env.VITE_APP_URL}/p/${slug}`;
    await sendPortfolioPublishedEmail(
      user.user.email,
      portfolio.title,
      portfolioUrl,
    );

    return {
      success: true,
      slug: slug,
      url: portfolioUrl,
    };
  } catch (error) {
    console.error("Error publishing portfolio:", error);
    throw error;
  }
}

export async function unpublishPortfolio(portfolioId: string, userId: string) {
  try {
    const { error } = await supabase
      .from("portfolios")
      .update({
        is_published: false,
      })
      .eq("id", portfolioId)
      .eq("user_id", userId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Error unpublishing portfolio:", error);
    throw error;
  }
}

export async function getPublishedPortfolio(slug: string) {
  try {
    const { data, error } = await supabase
      .from("portfolios")
      .select(
        "*, profiles(full_name, avatar_url), projects(*), templates(name, description)",
      )
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error getting published portfolio:", error);
    throw error;
  }
}

export async function getPublishedPortfolios() {
  try {
    const { data, error } = await supabase
      .from("portfolios")
      .select("*, profiles(full_name, avatar_url)")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error getting published portfolios:", error);
    throw error;
  }
}

// Helper function to generate a URL-friendly slug
function generateSlug(title: string) {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  // Add a random string to ensure uniqueness
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${baseSlug}-${randomString}`;
}
