import chalk from "chalk";
import figlet from "figlet";
import { teen } from "gradient-string";

export const logger = {
  title: async (text: string) => {
    const titleMessage = await figlet.text(text, {
      horizontalLayout: "fitted",
      verticalLayout: "fitted",
      width: 80,
      whitespaceBreak: true,
    });
    console.log(teen(titleMessage));
  },
  separator: (char = "=", length = 100) =>
    console.log("\n" + char.repeat(length)),
  section: (title: string) => {
    logger.separator();
    console.log(chalk.bold.underline.blue(title));
    logger.separator();
  },
  error: (message: string) => {
    console.error(chalk.bold.red("Error: ") + message);
  },
  success: (message: string) => {
    console.log(chalk.bold.green(message));
  },
};
