import type { Metadata } from "next";
import "../../styles/globals.css";
import { ThirdwebProvider } from "./thirdweb";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Links Lotto",
  description: "Lottery dApp Powered By Interlink",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThirdwebProvider>
          {children}
          <Toaster />
        </ThirdwebProvider>
      </body>
    </html>
  );
}
