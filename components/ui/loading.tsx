import React from "react";

interface LoadingProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

export function Loading({ size = "medium", color = "blue-500" }: LoadingProps) {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-${color} ${sizeClasses[size]}`}
      ></div>
    </div>
  );
}

export function FullPageLoading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-80 z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-700">Loading...</p>
      </div>
    </div>
  );
}
