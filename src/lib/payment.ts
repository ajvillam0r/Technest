import { loadStripe } from "@stripe/stripe-js";
import { supabase } from "./supabase";

let stripePromise: Promise<any> | null = null;

export function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
}

export async function createCheckoutSession(
  templateId: string,
  userId: string,
) {
  try {
    // Get template details
    const { data: template, error: templateError } = await supabase
      .from("templates")
      .select("*")
      .eq("id", templateId)
      .single();

    if (templateError) throw templateError;

    // Create a checkout session
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        templateId,
        userId,
        price: template.price,
        name: template.name,
      }),
    });

    const session = await response.json();
    return session;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}

export async function handlePaymentSuccess(
  sessionId: string,
  userId: string,
  templateId: string,
) {
  try {
    // Record the purchase in the database
    const { error } = await supabase.from("purchases").insert({
      user_id: userId,
      template_id: templateId,
      session_id: sessionId,
      status: "completed",
    });

    if (error) throw error;

    return true;
  } catch (error) {
    console.error("Error handling payment success:", error);
    throw error;
  }
}

export async function getUserPurchases(userId: string) {
  try {
    const { data, error } = await supabase
      .from("purchases")
      .select("*, templates(*)")
      .eq("user_id", userId);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error getting user purchases:", error);
    throw error;
  }
}

export async function checkTemplatePurchase(
  userId: string,
  templateId: string,
) {
  try {
    const { data, error } = await supabase
      .from("purchases")
      .select("*")
      .eq("user_id", userId)
      .eq("template_id", templateId)
      .eq("status", "completed");

    if (error) throw error;

    return data && data.length > 0;
  } catch (error) {
    console.error("Error checking template purchase:", error);
    throw error;
  }
}
