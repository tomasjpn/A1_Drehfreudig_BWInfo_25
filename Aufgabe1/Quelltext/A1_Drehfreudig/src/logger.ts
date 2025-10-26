import chalk from "chalk";

export const logger = {
  separator: (char = "=", length = 100) =>
    console.log("\n" + char.repeat(length)),
  section: (title: string) => {
    logger.separator();
    console.log(chalk.bold.underline.blue(title));
    logger.separator();
  },
};
