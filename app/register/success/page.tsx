"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Confetti } from "@/components/ui/confetti";

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const firstName = searchParams.get("name") || "Participant";
  const router = useRouter();
  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    // Redirect after 6 seconds to allow confetti animation to show
    const timer = setTimeout(() => {
      router.push("/event");
    }, 6000);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4">
      <Confetti />

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

        <Card className="border-0 shadow-xl bg-white overflow-hidden transform transition-all animate-fade-in-up">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6 px-8 flex items-center gap-4">
            <div className="p-2 bg-white bg-opacity-20 rounded-full">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold">Registration Complete!</h1>
          </div>

          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Thank You, {firstName}!
              </h2>
              <p className="text-gray-600">
                Your registration for Innovation Week Tanzania 2025 & the Future
                Ready Summit has been confirmed.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm">
                  <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                  <span className="font-medium text-blue-800">
                    Redirecting to event page in {countdown} seconds...
                  </span>
                </div>
              </div>

              <p className="text-center text-gray-700">
                You will be automatically redirected to browse all sessions and
                activities.
              </p>
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

// Create a loading fallback
function SuccessPageFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4">
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin mr-2" />
        <p className="text-lg font-medium text-blue-800">Loading...</p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<SuccessPageFallback />}>
      <SuccessPageContent />
    </Suspense>
  );
}
