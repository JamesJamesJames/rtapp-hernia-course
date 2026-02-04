import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'rTAPP Course - Critical View of the MPO',
  description: 'Interactive surgical anatomy training for safe MIS inguinal hernia repair',
  keywords: ['rTAPP', 'inguinal hernia', 'surgical training', 'anatomy', 'MPO', 'myopectineal orifice'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-50 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
