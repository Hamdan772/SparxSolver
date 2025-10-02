import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/auth/auth-provider';
import { GoalsProvider } from '@/context/goals-context';
import AchievementUnlocked from '@/components/common/achievement-unlocked';
import { ProgressProvider } from '@/context/progress-context';
import { Manrope, Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata: Metadata = {
  title: 'Social Spark',
  description: 'Build your social confidence.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${manrope.variable}`}>
      <body>
        <div className="fixed top-0 left-0 w-full h-full neural-bg -z-10" />
        <AuthProvider>
          <GoalsProvider>
            <ProgressProvider>
              {children}
              <AchievementUnlocked />
            </ProgressProvider>
          </GoalsProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
