import { Telegraf } from "telegraf";
import { getDbClient } from "./db";
import { UserController } from "./controllers";

require("dotenv").config();
const { BOT_TOKEN, DB_CONNECTION_STRING } = process.env;

const main = async () => {
  try {
    const mongoClient = await getDbClient(DB_CONNECTION_STRING!);
    const bot = new Telegraf(BOT_TOKEN!);
    console.log("db is running");

    bot.command("/roll", UserController.roll);
    bot.command("/me", UserController.me);
    bot.command("/top", UserController.top);

    bot.launch();
  } catch (err) {
    console.log(err);
  }
};

main();
