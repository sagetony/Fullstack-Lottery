import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Header from "../components/Header"
import LotteryEntrance from "../components/LotteryEntrance"
// import Header from "../components/Header"
export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Lottery Application</title>
                <meta
                    name="description"
                    content="A Decentralized Lottery Application"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <LotteryEntrance />
        </div>
    )
}
