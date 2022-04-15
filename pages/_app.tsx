import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastProvider } from "react-toast-notifications";
import AppProvider from "context/app-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider autoDismiss>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ToastProvider>
  );
}

export default MyApp;
