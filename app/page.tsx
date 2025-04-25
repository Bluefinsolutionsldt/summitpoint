import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to the event page instead of registration
  redirect("/event");
}
