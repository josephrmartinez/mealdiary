import { GeistSans } from "geist/font/sans";

import "./globals.css";
import AuthButton from "@/components/AuthButton";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "meal diary",
  description: "Log your meals, get nutritional guidance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="flex flex-col items-center">
        <div className="flex-1 w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-end p-3 text-sm">
          
          <AuthButton />
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col opacity-0 max-w-5xl px-3">
        
        {children}

      </div>

       
    </div>
        </main>
      </body>
    </html>
  );
}
