const apiKey = import.meta.env.VITE_CHATGPT_API_KEY;

export async function fetchChatGPTResponse(prompt: string): Promise<any> {
  const response = await fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt,
      max_tokens: 100
    })
  });

  if (!response.ok) {
    throw new Error("Failed to fetch response from ChatGPT");
  }

  return response.json();
}
