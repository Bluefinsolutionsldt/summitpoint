"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Define gallery images with categories
const galleryImages = [
  {
    id: 1,
    src: "/ITAC CONFERENCE_81.jpg",
    alt: "Conference session with attendees",
    caption: "Conference session at JNICC",
    category: "venue",
  },
  {
    id: 2,
    src: "/events/save.png",
    alt: "Event promotional image",
    caption: "Future Ready Summit 2025",
    category: "event",
  },
  {
    id: 3,
    src: "/events/speakers/Shigeki Komatsubara.jpg",
    alt: "Shigeki Komatsubara",
    caption: "Speaker: Shigeki Komatsubara",
    category: "speakers",
  },
  {
    id: 4,
    src: "/events/speakers/Prof. Caroline Nombo.png",
    alt: "Professor Caroline Nombo",
    caption: "Speaker: Prof. Caroline Nombo",
    category: "speakers",
  },
  {
    id: 5,
    src: "/events/speakers/Dr. Amos Nungu.jpg",
    alt: "Dr. Amos Nungu",
    caption: "Speaker: Dr. Amos Nungu",
    category: "speakers",
  },
  {
    id: 6,
    src: "/events/speakers/ZUWENA FARAH-VODACOM FOUNDATION.webp",
    alt: "Zuwena Farah",
    caption: "Zuwena Farah - Vodacom Foundation",
    category: "speakers",
  },
  {
    id: 7,
    src: "/events/speakers/JOSEPH MANIRAKIZA-PROGRAMME MANAGER FUNGUO .jpg",
    alt: "Joseph Manirakiza",
    caption: "Joseph Manirakiza - Programme Manager Funguo",
    category: "speakers",
  },
  {
    id: 8,
    src: "/events/mainpage event.png",
    alt: "Event main page",
    caption: "Event showcase",
    category: "event",
  },
  {
    id: 9,
    src: "/venue.jpg",
    alt: "Event venue",
    caption: "JNICC Conference Hall",
    category: "venue",
  },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Get the current displayed image
  const currentImage =
    selectedImage !== null ? galleryImages[selectedImage] : null;

  // Filter images based on selected category
  const filteredImages =
    filterCategory === "all"
      ? galleryImages
      : galleryImages.filter((image) => image.category === filterCategory);

  // Handle image navigation in lightbox
  const navigateImage = (direction: "next" | "prev") => {
    if (selectedImage === null) return;

    const currentIndex = galleryImages.findIndex(
      (img) => img.id === galleryImages[selectedImage].id
    );
    const filteredIndices = filteredImages.map((img) =>
      galleryImages.findIndex((galleryImg) => galleryImg.id === img.id)
    );

    const currentFilteredIndex = filteredIndices.indexOf(currentIndex);

    if (direction === "next") {
      const nextFilteredIndex =
        (currentFilteredIndex + 1) % filteredIndices.length;
      setSelectedImage(filteredIndices[nextFilteredIndex]);
    } else {
      const prevFilteredIndex =
        (currentFilteredIndex - 1 + filteredIndices.length) %
        filteredIndices.length;
      setSelectedImage(filteredIndices[prevFilteredIndex]);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage === null) return;

    if (e.key === "ArrowRight") {
      navigateImage("next");
    } else if (e.key === "ArrowLeft") {
      navigateImage("prev");
    } else if (e.key === "Escape") {
      setSelectedImage(null);
    }
  };

  return (
    <div className="space-y-8 pb-12" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Event Gallery</h1>

        {/* Filter options */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filterCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setFilterCategory("all")}
          >
            All Photos
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filterCategory === "speakers"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setFilterCategory("speakers")}
          >
            Speakers
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filterCategory === "venue"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setFilterCategory("venue")}
          >
            Venue
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filterCategory === "event"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setFilterCategory("event")}
          >
            Event
          </button>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group"
              onClick={() =>
                setSelectedImage(
                  galleryImages.findIndex((img) => img.id === image.id)
                )
              }
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: "cover" }}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-end">
                <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No images found in this category.</p>
          </div>
        )}

        {/* Preview/information text */}
        <p className="text-gray-500 text-sm mt-6">
          Click on any image to view in full size. Use arrow keys to navigate
          through the gallery.
        </p>
      </div>

      {/* Lightbox for selected image */}
      {selectedImage !== null && currentImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </button>

          <button
            className="absolute left-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors"
            onClick={() => navigateImage("prev")}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            className="absolute right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors"
            onClick={() => navigateImage("next")}
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div className="relative h-[80vh] w-full max-w-4xl">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              style={{ objectFit: "contain" }}
              priority
            />

            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 text-white">
              <p className="text-xl font-medium">{currentImage.caption}</p>
              <p className="text-sm text-gray-300">
                Category: {currentImage.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
