import chalk from "chalk";
import inquirer from "inquirer";
let account_balance = 2000;
const account_number = 12345;
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t<<< ========================================================= >>> `));
console.log(chalk.yellowBright.bold("\n\t\t\t        Welcome to BilalCode - Bank ATM\n"));
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t<<< ========================================================= >>> `));
async function performTransaction() {
    let transType = await inquirer.prompt([
        {
            name: "Transaction_type",
            type: "list",
            choices: ["Balance Inquiry", "Cash Withdraw"],
            message: chalk.yellow.italic("Select any one option: "),
        },
    ]);
    if (transType.Transaction_type === "Balance Inquiry") {
        console.log(chalk.green(`Here is Your Account Balance: $${account_balance}`));
        let otherTrans = await inquirer.prompt([
            {
                name: "Transaction",
                type: "list",
                choices: ["Yes", "No"],
                message: chalk.yellow.italic("Do you want to perform another transaction?"),
            },
        ]);
        if (otherTrans.Transaction === "Yes") {
            await performTransaction();
        }
    }
    else {
        let withdOptions = await inquirer.prompt([
            {
                name: "Withdraw_option",
                type: "list",
                choices: ["1000", "2000", "3000", "4000", "5000", "Other Amount"],
                message: chalk.yellow.italic("Select any one option: "),
                validate: (Withdraw_option) => {
                    if (isNaN(Withdraw_option)) {
                        return chalk.red.bold(`Please enter valid number:`);
                    }
                    else {
                        return true;
                    }
                },
            },
        ]);
        let withdrawAmount;
        if (withdOptions.Withdraw_option === "Other Amount") {
            let otherAmount = await inquirer.prompt([
                {
                    name: "amount",
                    type: "input",
                    message: chalk.red("Please enter your amount: "),
                    validate: (input) => {
                        if (!input || isNaN(Number(input)) || Number(input) <= 0) {
                            return "Please enter a valid number greater than 0.";
                        }
                        return true;
                    },
                },
            ]);
            withdrawAmount = parseInt(otherAmount.amount);
        }
        else {
            withdrawAmount = parseInt(withdOptions.Withdraw_option);
        }
        if (account_balance >= withdrawAmount && withdrawAmount > 0) {
            account_balance -= withdrawAmount;
            console.log(chalk.green("Please take your cash."));
            console.log(chalk.green(`Your remaining account balance: $${account_balance}`));
        }
        else {
            console.log(chalk.red("Sorry, Insufficient Balance"));
        }
        let otherTrans = await inquirer.prompt([
            {
                name: "Transaction",
                type: "list",
                choices: ["Yes", "No"],
                message: chalk.gray.italic("Do you want to perform another transaction?"),
            },
        ]);
        if (otherTrans.Transaction === "Yes") {
            await performTransaction();
        }
    }
}
let user_input = await inquirer.prompt([
    {
        name: "user_id",
        type: "input",
        message: chalk.yellow.bold("Please enter your user ID to confirm: "),
    },
    {
        name: "password",
        type: "password",
        message: chalk.yellow.bold("Please enter your PIN code to confirm: "),
    },
]);
// No specific check for user ID and password
let accType = await inquirer.prompt([
    {
        name: "account_Type",
        type: "list",
        choices: ["Saving", "Current"],
        message: chalk.yellowBright.bold("Select account type: "),
    },
]);
if (accType.account_Type === "Current" || accType.account_Type === "Saving") {
    await performTransaction();
}
console.log(chalk.blue("Thank You for using BilalCode Bank"));
