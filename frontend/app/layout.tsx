import type { Metadata } from "next";

import Providers from "./providers";


export const metadata: Metadata = {
  title: "My Weather App",
  description: "Created by Aubry Lungu @lunguaubry@gmail.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Providers>{children}</Providers>
      </body>
    </html>
  );
}
