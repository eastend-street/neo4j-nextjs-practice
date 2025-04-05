import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RecipeProvider } from "./context/RecipeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe Manager",
  description: "Manage your favorite recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecipeProvider>
          <main className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
              {children}
            </div>
          </main>
        </RecipeProvider>
      </body>
    </html>
  );
}
