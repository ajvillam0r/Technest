import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Github } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Github className="h-6 w-6" />
            <span className="text-xl font-bold">TechNest</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/templates"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Templates
          </Link>
          <Link
            to="/pricing"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <div className="hidden md:flex gap-2">
            <Link to="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link to="/register">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
