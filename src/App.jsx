import Groq from "groq-sdk"
import { useState } from "react"

function App() {
  const [userPrompt, setUserPrompt] = useState("");
  const [botResponse, setBotResponse] = useState("Enter a prompt to get started...");

  console.log("userPrompt:", userPrompt)

  const handleBotResponse = async (prompt) => {
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
    console.log(response)
    setBotResponse(response)
  }

  return (
    <>
      <h1 id="title">ChatBot</h1>
      <div id="input-area">
        <textarea rows={10} cols={50} placeholder="Enter prompt" value={userPrompt} onChange={e => setUserPrompt(e.target.value)} />
        <button onClick={async () => await handleBotResponse(userPrompt)}>Submit</button>
      </div>
      <hr></hr>
      <p id="bot-response"><pre>{botResponse}</pre></p>
    </>
  )
}

export default App
