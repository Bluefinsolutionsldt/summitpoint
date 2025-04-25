"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    // Redirect to the default section (overview)
    if (id) {
      router.push(`/event-detail/${id}/overview`);
    }
  }, [id, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F6F5]">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
        <p className="text-lg text-gray-700">Loading event details...</p>
      </div>
    </div>
  );
}
