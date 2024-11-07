const inquirer = require("inquirer");
const crypto = this.crypto || require("crypto").webcrypto;
const fetch = require("node-fetch");
const chalk = require("chalk");
const ora = require("ora");

const sha1sum = async (message) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

async function checkPassword(password) {
  const shaPass = await sha1sum(password);
  const response = await fetch(
    `https://api.pwnedpasswords.com/range/${shaPass.slice(0, 5)}`
  ).then((response) => response.text());
  return response.indexOf(shaPass.slice(5).toUpperCase()) !== -1;
}

async function main() {
  console.log(chalk.blue.bold("\n🔐 Password Leak Checker"));
  console.log(
    chalk.gray("Check if your password has been exposed in data breaches\n")
  );

  while (true) {
    const { password } = await inquirer.prompt([
      {
        type: "password",
        name: "password",
        message:
          "Enter a password to check (or press Enter with empty password to exit):",
        mask: "*",
      },
    ]);

    if (!password) {
      console.log(chalk.yellow("\nGoodbye! Stay secure! 👋"));
      process.exit(0);
    }

    const spinner = ora("Checking password security...").start();

    try {
      const isPwned = await checkPassword(password);
      spinner.stop();

      if (isPwned) {
        console.log(
          chalk.red(
            "❌ WARNING: This password has been exposed in data breaches!"
          )
        );
        console.log(
          chalk.red(
            "   It is recommended to change this password immediately.\n"
          )
        );
      } else {
        console.log(
          chalk.green(
            "✅ Good news! This password hasn't been found in known data breaches.\n"
          )
        );
      }
    } catch (error) {
      spinner.stop();
      console.error(chalk.red("Error checking password:", error.message));
    }
  }
}

main().catch(console.error);
