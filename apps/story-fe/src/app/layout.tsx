"use client";
import "./globals.css";
import "./reset.css";
import { Inter } from "next/font/google";
import AppContext from "@/store";
import User from "@/components/User";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContext.Provider>
          {children}
          <User />
        </AppContext.Provider>
      </body>
    </html>
  );
}
