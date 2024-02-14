'use client';
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';
import { getServerSession } from 'next-auth/next';
import GlobalDrawer from '@/app/shared/drawer-views/container';
import { CartProvider } from '@/store/quick-cart/cart.context';
import GlobalModal from '@/app/shared/modal-views/container';
import { ThemeProvider } from '@/app/shared/theme-provider';
import { siteConfig } from '@/config/site.config';
import { inter, lexendDeca } from '@/app/fonts';
import cn from '@/utils/class-names';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const NextProgress = dynamic(() => import('@/components/next-progress'), {
  ssr: false,
});
// styles
import '@/app/globals.css';

// export const metadata = {
//   title: siteConfig.title,
//   description: siteConfig.description,
//   viewport: { width: 'device-width', initialScale: 1 },
// };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <html
      lang="en"
      dir="ltr"
      // required this one for next-themes, remove it if you are not using next-theme
      suppressHydrationWarning
    >
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, 'font-inter')}
      >
        <QueryClientProvider client={queryClient} contextSharing={true}>
          <ThemeProvider>
            <CartProvider>
              <NextProgress />
              {children}
              <Toaster />
              <GlobalDrawer />
              <GlobalModal />
            </CartProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
