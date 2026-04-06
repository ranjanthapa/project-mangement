import app from "./app.js";
import dbConnection from "./config/db.js";

const startServer = async () => {
  try {
    await dbConnection();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
