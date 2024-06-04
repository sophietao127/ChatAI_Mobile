import { config } from "dotenv";
config();
// console.log(process.env.API_KEY);

import OpenAI from "openai";
import readline from "readline";

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});
// const openai = new OpenAI();

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();
userInterface.on("line", async (input) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant designed to output JSON.",
      },
      { role: "user", content: input },
    ],
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
  });
  console.log(completion.choices[0].message.content);
  userInterface.prompt();
});

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: "You are a helpful assistant designed to output JSON.",
//       },
//       { role: "user", content: "Who won the world series in 2016?" },
//     ],
//     model: "gpt-3.5-turbo-0125",
//     response_format: { type: "json_object" },
//   });
//   console.log(completion.choices[0].message.content);
// }

// main();
