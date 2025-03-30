import { redirect } from "next/navigation";

// This page only renders when the app is built statically (output: 'export')
// we have to redirect here based on browser lang
export default function RootPage() {
  redirect("/en");
}
