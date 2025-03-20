import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard, Check } from "lucide-react";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Get template data from location state
  const template = location.state?.template || {
    id: 3,
    name: "Professional Portfolio",
    price: 19.99,
    description: "A professional template suitable for all tech professionals.",
  };

  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      toast({
        title: "Payment Successful",
        description: `You have successfully purchased the ${template.name} template.`,
      });

      // In a real app, you would record the purchase in the database
      // and grant access to the premium template
    }, 2000);
  };

  const handleContinue = () => {
    // Redirect to dashboard or template page
    navigate("/dashboard/create-portfolio");
  };

  return (
    <div className="container py-10">
      <div className="max-w-md mx-auto">
        {isSuccess ? (
          <Card>
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
              <div className="border rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Template:</span>
                  <span>{template.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Amount:</span>
                  <span>${template.price.toFixed(2)}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                You now have access to this premium template. You can use it to
                create your portfolio.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleContinue}>
                Continue to Templates
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Checkout</CardTitle>
              <CardDescription>
                Complete your purchase to access premium templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 mb-4">
                <h3 className="font-medium mb-2">{template.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {template.description}
                </p>
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span className="font-medium">
                    ${template.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <Separator />

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    placeholder="John Doe"
                    required
                    value={formData.cardName}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      required
                      value={formData.cardNumber}
                      onChange={handleChange}
                    />
                    <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      required
                      value={formData.expiryDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      required
                      value={formData.cvv}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading
                    ? "Processing..."
                    : `Pay $${template.price.toFixed(2)}`}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center">
                Your payment information is secure. We do not store your credit
                card details.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
