export async function analyzeEmail(emailText) {
  const response = await fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: emailText,
      type: "email"
    }),
  });

  const data = await response.json();

  return {
    isPhishing: data.prediction === "PHISHING",
    confidence: Math.round(data.confidence * 100),
    message:
      data.prediction === "PHISHING"
        ? "This email is detected as phishing."
        : "This email appears legitimate.",
    indicators: data.indicators
  };
}

export async function analyzeURL(urlText) {
  const response = await fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: urlText,
      type: "url"
    }),
  });

  const data = await response.json();

  return {
    isPhishing: data.prediction === "PHISHING",
    confidence: Math.round(data.confidence * 100),
    message:
      data.prediction === "PHISHING"
        ? "This URL is detected as phishing."
        : "This URL appears safe.",
    indicators: data.indicators
  };
}
