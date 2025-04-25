"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Confetti } from "@/components/ui/confetti";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function SuccessPage() {
  return (
    <Suspense fallback={<SuccessPageSkeleton />}>
      <SuccessPageContent />
    </Suspense>
  );
}

function SuccessPageContent() {
  // Get name from query parameters
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Participant";

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
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                IWTZ Confirmation Message
              </h2>

              <div className="text-gray-700 space-y-4">
                <p>Dear {name},</p>

                <p>
                  Thank you for registering for Innovation Week Tanzania 2025 &
                  the Future Ready Summit! We're excited to have you join us.
                </p>

                <p>
                  We encourage you to visit the event registration page to
                  browse other sessions and activities that may be of interest
                  to you by clicking the LINK below.
                </p>

                <p>Looking forward to seeing you at JNICC.</p>
              </div>

              <div className="mt-6 text-center">
                <Link href="/event">
                  <Button className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md">
                    <span>Browse Events</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
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

// Skeleton component to show while the content is loading
function SuccessPageSkeleton() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <div className="h-[120px] bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="border-0 shadow-xl bg-white overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6 px-8">
            <div className="h-8 bg-white bg-opacity-20 rounded w-48 animate-pulse" />
          </div>
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse" />
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-6">
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4 animate-pulse" />
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
              </div>
              <div className="mt-6 flex justify-center">
                <div className="h-10 bg-gray-200 rounded w-40 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
