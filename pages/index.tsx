import type { NextPage } from "next";
import Head from "next/head";
import { useState, FormEvent } from "react";

const Home: NextPage = () => {
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      contact,
      message,
    };

    const res = await fetch("/api/mail/", {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .catch(console.log);

    console.log(res);
  };

  return (
    <div>
      <Head>
        <title>André Passoni</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello world, from next!</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="contact"
          onChange={({ target: { value } }) => setContact(value)}
          value={contact}
        />
        <input
          placeholder="message"
          onChange={({ target: { value } }) => setMessage(value)}
          value={message}
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default Home;
