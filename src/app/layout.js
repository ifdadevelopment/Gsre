import "./globals.css";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SiteLoader from "./components/SiteLoader";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="page-offset">
        <SiteLoader />
        <TopBar />
        <Header />
        {children}
        <Footer />
         <Toaster position="top-right" />
      </body>
    </html>
  );
}
