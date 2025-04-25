"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, Suspense } from "react";

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const firstName = searchParams.get("name") || "Participant";
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  

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
                  <Link
                    href="/event"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isNavigating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Redirecting to event page...
                      </>
                    ) : (
                      "Visit Event Page"
                    )}
                  </Link>
                </div>

                <p>Looking forward to seeing you at JNICC.</p>
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
