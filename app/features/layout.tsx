export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="bg-gray-50 min-h-screen">{children}</section>;
}
