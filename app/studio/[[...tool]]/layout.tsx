// app/studio/[[...tool]]/layout.tsx
import React from "react";

// StudioLayout for the content management interface.
// This layout deliberately omits the website Navbar and Footer.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
