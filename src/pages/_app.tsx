import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, Store } from "@/app/store";
import { ProSidebarProvider } from "react-pro-sidebar";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={Store}>
        <ProSidebarProvider>
          <Component {...pageProps} />
        </ProSidebarProvider>
      </Provider>
    </PersistGate>
  );
}
