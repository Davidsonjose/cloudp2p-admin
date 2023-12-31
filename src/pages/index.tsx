import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });
import SignIn from "./auth/login";
export default function Home() {
  return (
    <>
      <Head>
        <title>CLOUD P2P DASHBOARD</title>
        <meta name="description" content="Welcome to cloud p2p dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SignIn />
    </>
  );
}
