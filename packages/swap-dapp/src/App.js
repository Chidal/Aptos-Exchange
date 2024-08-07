import React from "react";
import { useEthers } from "@usedapp/core";
import styles from "./styles";
import { usePools } from "./hooks";
import { uniswapLogo } from "./assets";
import { Exchange, Loader, WalletButton } from "./components";
import { useZetachain } from "./ZetachainContext";

const App = () => {
  const { account } = useEthers();
  const [poolsLoading, pools] = usePools();
  const zeta = useZetachain();

  // Example function using Zetachain
  const handleZetachainOperation = async () => {
    try {
      const result = await zeta.someOperation();
      console.log(result);
    } catch (error) {
      console.error("Zetachain operation failed:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <header className={styles.header}>
          <img
            src={uniswapLogo}
            alt="uniswap-logo"
            className="w-16 h-16 object-contain"
          />
          <WalletButton />
        </header>

        <div className={styles.exchangeContainer}>
          <h1 className={styles.headTitle}>Uniswap 2.0</h1>
          <p className={styles.subTitle}>Exchange tokens in seconds</p>

          <div className={styles.exchangeBoxWrapper}>
            <div className={styles.exchangeBox}>
              <div className="pink_gradient" />
              <div className={styles.exchange}>
                {account ? (
                  poolsLoading ? (
                    <Loader title="Loading pools, please wait!" />
                  ) : (
                    <Exchange pools={pools} />
                  )
                ) : (
                  <Loader title="Please connect your wallet" />
                )}
              </div>
              <div className="blue_gradient" />
            </div>
          </div>
        </div>

        <button onClick={handleZetachainOperation}>Run Zetachain Operation</button>
      </div>
    </div>
  );
};

export default App;
