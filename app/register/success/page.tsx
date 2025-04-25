"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, Suspense } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/AuthContext";
import { authAPI, setAuthToken } from "@/lib/api";

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const firstName = searchParams.get("name") || "Participant";
  const email = searchParams.get("email") || "";
  const fullName = searchParams.get("fullName") || firstName;
  const router = useRouter();

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const { toast } = useToast();
  const { login } = useAuth();

  // When leaving the page, clear any loading state
  useEffect(() => {
    return () => {
      setIsLoggingIn(false);
    };
  }, []);

  const handleOpenEvent = async () => {
    console.log("Open Event button clicked");

    if (!email) {
      console.log("No email found, showing error toast");
      toast({
        title: "Error",
        description:
          "Email is required for login. Please go back and register again.",
        variant: "destructive",
      });
      return;
    }

    console.log(`Proceeding with login, email: ${email}, name: ${fullName}`);
    setIsLoggingIn(true);
    setStatusMessage("Authenticating...");

    try {
      // Try the direct API authentication first
      console.log("Getting token directly from API");
      try {
        const token = await authAPI.createToken(fullName, email);
        console.log("Token obtained directly:", token ? "Success" : "Failed");

        if (token) {
          // Set the token
          setAuthToken(token);
          setStatusMessage("Authentication successful! Redirecting...");

          // Store user info in localStorage manually as backup
          if (typeof window !== "undefined") {
            localStorage.setItem(
              "summit_point_auth",
              JSON.stringify({
                user: { name: fullName, email },
                timestamp: Date.now(),
              })
            );
          }

          // Wait a moment before redirecting
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Navigate directly to the event page
          console.log("Navigating to event page");
          router.push("/event");
          return;
        }
      } catch (directApiError) {
        console.error("Direct API token creation failed:", directApiError);
        setStatusMessage(
          "Direct authentication failed, trying alternative method..."
        );
      }

      // If direct API call fails, try using the context login function
      console.log("Calling context login function as fallback");
      await login(fullName, email, "/event");
      console.log("Login function completed successfully");

      // The login function should handle the redirect
    } catch (error) {
      console.error("All login attempts failed:", error);
      setStatusMessage("");
      toast({
        title: "Login Failed",
        description:
          "Could not automatically log you in. Please try again or contact support.",
        variant: "destructive",
      });
      setIsLoggingIn(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F6F6F5] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto">
        {/* Header image */}
        <div className="mb-8 text-center">
          <Image
            src="/header.png"
            alt="Innovation Week Tanzania"
            width={600}
            height={200}
            className="w-full h-auto object-contain max-h-[120px]"
            priority
          />
        </div>

        <Card className="border border-gray-100 shadow-lg bg-white overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6" />
            <h1 className="text-xl font-bold">Registration Successful</h1>
          </div>

          <CardContent className="p-6 md:p-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-6">
              <h2 className="text-lg font-bold text-blue-800 mb-4">
                IWTZ Confirmation Message:
              </h2>

              <div className="space-y-4 text-gray-700">
                <p className="font-medium">Dear {firstName},</p>

                <p>
                  Thank you for registering for Innovation Week Tanzania 2025 &
                  the Future Ready Summit! We're excited to have you join us.
                </p>

                <p>
                  We encourage you to visit the event registration page to
                  browse other sessions and activities that may be of interest
                  to you by clicking below:
                </p>

                <div className="flex flex-col items-center gap-2 mt-2">
                  <Link href="/event" className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Visit Event Page
                    </Button>
                  </Link>

                  

                <p>Looking forward to seeing you at JNICC.</p>
              </div>
            </div>
            </div>

            <div className="flex justify-center pt-2">
              <Button
                asChild
                variant="outline"
                className="text-gray-600 hover:text-gray-800 border-gray-300 hover:bg-gray-50 font-normal"
              >
                <Link href="/register/iwtz">Return to Registration</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sponsors footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4 text-center font-medium uppercase tracking-wider">
            Our Sponsors
          </p>
          <div className="flex justify-center">
            <Image
              src="/sponsers.png"
              alt="Event Sponsors"
              width={600}
              height={100}
              className="w-full max-w-xl h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

// Loading fallback for suspense
function SuccessPageLoading() {
  return (
    <div className="min-h-screen bg-[#F6F6F5] flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
        <p className="text-gray-600">Loading registration confirmation...</p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<SuccessPageLoading />}>
      <SuccessPageContent />
    </Suspense>
  );
}
