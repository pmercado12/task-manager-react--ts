import app from "./app.js";

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});