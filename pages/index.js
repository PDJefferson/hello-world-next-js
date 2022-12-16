import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import React from "react";
import { Paper, TextField, Typography } from "@mui/material";
//library used to get the socket connection from the client
import { io } from "socket.io-client";

const inter = Inter({ subsets: ["latin"] });
//store the socket props
let socket;
export default function Home() {
  //starts the socket connection
  React.useEffect(() => {
    const initializeSocket = async () => {
      socketInitializer();
    };
    initializeSocket();
    return () => {};
  }, []);

  //initializes the socket connection
  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();
    socket.on("connect", () => {
      console.log("connected with id ", socket.id);
    });
    //listens on any update from the server on this event
    socket.on("sentMessage", ({ message }) => {
      setMessageToShow(message);
    });
  };

  const [messageToShow, setMessageToShow] = React.useState("");
  const onUserChangeMessage = (e) => {
    setMessageToShow(e.target.value);
    console.log("check");
    //emitting a message to this event which will then trigger sentMessage event
    //that will update every screen who are currently connected to the web app
    socket?.emit("passMessage", { message: e.target.value });
  };
  return (
    <>
      <Head>
        <title>Example of next js app with socket io</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          {messageToShow ? (
            <p>{`${messageToShow} (message gets updated in real time to all sockets connected)`}</p>
          ) : (
            <p>
              Get started by editing&nbsp;
              <code className={styles.code}>pages/index.js</code>
            </p>
          )}
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            flexWrap: "wrap",
            background: "#141414",
            borderRadius: 4,
          }}
          marginTop={10}
        >
          <Typography
            variant="h6"
            sx={{ flex: "1 1 260px" }}
            color="white"
            align="center"
            marginBottom={2}
          >
            TRY ME OUT
          </Typography>
          <TextField
            variant="filled"
            style={{ flex: "1 1 260px", background: "white" }}
            value={messageToShow}
            label="message"
            onChange={(e) => onUserChangeMessage(e)}
          />
        </Paper>
        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
