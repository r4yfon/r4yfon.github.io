import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import * as React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const ArchiveBanner: React.FC = () => (
  <div className="px-4 py-2 text-center text-sm bg-logo-2/40 text-gray-900 dark:text-white">
    You're viewing an archived version (v2, 2025).{" "}
    <a href="/" className="font-semibold underline underline-offset-2">
      See the latest →
    </a>
  </div>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <ArchiveBanner />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
