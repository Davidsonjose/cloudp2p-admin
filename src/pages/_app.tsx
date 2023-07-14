import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/app/store";
import { ProSidebarProvider } from "react-pro-sidebar";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ProSidebarProvider>
          <Component {...pageProps} />
        </ProSidebarProvider>
      </PersistGate>
    </Provider>
  );
}
