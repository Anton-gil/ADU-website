import type { Metadata } from 'next';
import { Orbitron, Rajdhani } from 'next/font/google';
import './globals.css';

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '700', '900']
});

const rajdhani = Rajdhani({ 
  subsets: ['latin'],
  variable: '--font-rajdhani',
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'ADU Designs | Scrollytelling Portfolio',
  description: 'Premium freelance web design studio portfolio. We craft digital experiences that demand attention.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable}`}>
      <head>
        {/* Preload the first few frames so they start downloading before JS runs */}
        <link rel="preload" as="image" href="/frames/ezgif-frame-001.jpg" fetchPriority="high" />
        <link rel="preload" as="image" href="/frames/ezgif-frame-002.jpg" />
        <link rel="preload" as="image" href="/frames/ezgif-frame-003.jpg" />
      </head>
      <body className="font-rajdhani bg-adu-black text-white selection:bg-adu-gold selection:text-adu-black uppercase tracking-widest">
        {children}
      </body>
    </html>
  );
}
