import Head from "next/head"
import { useState } from "react"
import styles from '../styles/home.module.css'

export default function Home() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("Your Result will appear here")
  const [loading, setLoading] = useState("Generate Results")

  async function onSubmit(event) {
    event.preventDefault()
    setLoading("Generating Results...")
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: input }),
    })
    const data = await response.json()
    setResult(data.result)
    setInput("")
    setLoading("Generate Results")
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={styles.main}>
        <img src="/logo.png" className={styles.icon} />
        <h1>Made with 💖 by KONNEXIONS</h1>
        <h6>Powered With OpenAI</h6>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Enter some text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input id="submit" type="submit" value={loading} />
        </form>
        <textarea disabled className={styles.result} cols="40" rows="20" value={result} />
      </main>
    </div>
  )
}