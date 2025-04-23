import { RegistrationForm } from "@/components/RegistrationForm";
import Image from "next/image";

export const metadata = {
  title: "Register for Innovation Week Tanzania 2025",
  description: "Registration form for Innovation Week Tanzania 2025",
};

export default function RegistrationPage() {
  return (
    <main className="h-screen bg-[#F6F6F5]">
      {/* Main content container */}
      <div className="h-screen max-w-screen-2xl mx-auto">
        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
          {/* Left Column with images and text */}
          <div className="bg-[#F6F6F5] h-screen p-6 lg:px-12 lg:py-10 flex flex-col">
            {/* Header image */}
            <div className="mb-10">
              <Image
                src="/header.png"
                alt="Innovation Week Tanzania"
                width={600}
                height={200}
                className="w-full h-auto object-contain max-h-[180px]"
                priority
              />
            </div>

            {/* Middle section with image and text */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
                <div className="w-full md:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="/side.png"
                      alt="Innovation"
                      width={600}
                      height={600}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 space-y-5">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Join the Innovation Movement
                  </h2>
                  <p className="text-gray-600 text-md text-justify">
                    The Future Ready Summit (FRS) 2025 will take place within
                    Tanzania Innovation Week 2025 (IWTz2025), a dynamic platform
                    cohosted by UNDP and Vodacom Tanzania. With its theme,
                    'Innovation for a Resilient and Inclusive Future,' IWTz2025
                    closely aligns with FRS 2025's ambition to shape smart,
                    sustainable, and inclusive urban futures while addressing
                    the evolving landscape of youth employment in the digital
                    era.
                  </p>
                 
                </div>
              </div>
            </div>

            {/* Sponsors footer */}
            <div className="mt-auto pt-8 border-t border-gray-100">
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

          {/* Right Column with form */}
          <div className="bg-[#F6F6F5] h-screen p-4 lg:px-6 lg:py-10 flex items-start justify-center overflow-y-auto">
            <div className="w-full max-w-xl ">
              <RegistrationForm />

              <div className="text-center mt-8 mb-4 text-sm text-gray-500">
                <p>
                  For any questions or support, please contact us at{" "}
                  <a
                    href="mailto:info@summitpoint.co.tz"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    info@summitpoint.co.tz
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
