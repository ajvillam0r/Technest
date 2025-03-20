import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { handlePaymentSuccess } from "@/lib/payment";
import { useAuth } from "@/lib/auth-context";

export default function PaymentSuccessPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    async function processPayment() {
      try {
        if (!user) {
          setError("User not authenticated");
          setIsLoading(false);
          return;
        }

        // Get the session ID from the URL
        const searchParams = new URLSearchParams(location.search);
        const sessionId = searchParams.get("session_id");
        const templateId = searchParams.get("template_id");

        if (!sessionId || !templateId) {
          setError("Missing payment information");
          setIsLoading(false);
          return;
        }

        // Record the successful payment
        await handlePaymentSuccess(sessionId, user.id, templateId);

        setIsLoading(false);
      } catch (err) {
        console.error("Payment processing error:", err);
        setError("Failed to process payment. Please contact support.");
        setIsLoading(false);
      }
    }

    processPayment();
  }, [location, user]);

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Processing Payment...</h1>
          <p className="text-muted-foreground">
            Please wait while we confirm your payment.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-10">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Payment Error</CardTitle>
            <CardDescription className="text-center">{error}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" onClick={() => navigate("/dashboard")}>
              Return to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Check className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-center">Payment Successful</CardTitle>
          <CardDescription className="text-center">
            Thank you for your purchase
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Your template purchase has been completed successfully. You can now
            use this template to create your portfolio.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => navigate("/dashboard/create-portfolio")}
          >
            Create Portfolio
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
