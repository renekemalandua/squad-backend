import { app } from "./app";
import { config } from "dotenv";

config();
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
