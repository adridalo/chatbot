import Groq from "groq-sdk"
import { useState } from "react"

function App() {
  const [userPrompt, setUserPrompt] = useState("");
  const [botResponse, setBotResponse] = useState(localStorage.getItem("botResponse") !== null ? localStorage.getItem("botResponse") : "Enter a prompt to get started...");

  const handleBotResponse = async (prompt) => {
    setUserPrompt("")
    document.getElementById("input-area").blur()
    setBotResponse("Generating response...")
    const apiKey = import.meta.env['VITE_GROQ_API_KEY']
    const groq = new Groq({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    })
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          "content": prompt
        }
      ],
      model: "llama-3.3-70b-versatile"
    })

    const response = chatCompletion.choices[0].message.content
    setBotResponse(response)
    localStorage.setItem("botResponse", response)
  }

  return (
    <>
      <h1 id="title">ChatBot</h1>
      <div id="input-area">
        <textarea id="input-area" rows={10} cols={50} placeholder="Enter prompt" value={userPrompt} onChange={e => setUserPrompt(e.target.value)} />
        <button onClick={async () => await handleBotResponse(userPrompt)}>Submit</button>
      </div>
      <hr></hr>
      <div id="bot-response"><pre>{botResponse}</pre></div>
    </>
  )
}

export default App

