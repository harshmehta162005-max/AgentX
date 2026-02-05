import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Outfit } from "next/font/google";
import { ConvexClientProvider } from "./ConvexClientProvider";
import Provider from "./provider";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Toaster } from "sonner";
export const metadata: Metadata = {
  title: "AI Agent Builder",
  description: "Build and deploy AI agents with ease.",
};

const outfit = Outfit({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={outfit.className}
        >
          <ConvexClientProvider>
            <Provider>
              {children}
              <Toaster/>
            </Provider>
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
