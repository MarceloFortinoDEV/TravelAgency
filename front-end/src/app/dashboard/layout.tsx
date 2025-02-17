import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appSidebar";

export const metadata: Metadata = {
  title: "Travel Agency",
  description: "Good Travel Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={'antialiased'}
      >
        <SidebarProvider >
          <AppSidebar />
          <div className='w-screen h-screen'>
            {children}
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
