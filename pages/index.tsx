import type { NextPage } from "next";
import Head from "next/head";
import Calculator from "../components/Calculator";
// import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className="container loading">
      <Head>
        <title>Currency Converter</title>
        <meta name="description" content="Currency Converter v2" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="inner-container">
        <Calculator />
      </div>
    </div>
  );
};

export default Home;
