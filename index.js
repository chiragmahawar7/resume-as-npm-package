#!/usr/bin/env node
"use strict";

var inquirer = require("inquirer");
var chalk = require("chalk");

var response = chalk.bold.green;

var resume = require("./resume.json");

var resumePrompts = {
    type: "list",
    name: "resumeOptions",
    message: "What do you want to know about me?",
    choices: [...Object.keys(resume), "Exit"]
};

function main() {
    console.log(' ');
    console.log("Hello, My name is Chirag Mahawar and welcome to my resume !!");
    console.log(' ');
    resumeHandler();
}

function resumeHandler() {
    inquirer.prompt(resumePrompts).then((answer) => {
        if (answer.resumeOptions == "Exit") {
            console.clear();
            return;
        }
        var option = answer.resumeOptions;
        console.log(response("--------------------------------------"));
        resume[`${option}`].forEach(info => {
            console.log(response("|   => " + info));
        });
        console.log(response("--------------------------------------"));
        inquirer
            .prompt({
                type: "list",
                name: "exitBack",
                message: "Go back or Exit?",
                choices: ["Back", "Exit"]
            })
            .then(choice => {
                if (choice.exitBack == "Back") {
                    console.clear();
                    resumeHandler();
                } else {
                    console.clear();
                    return;
                }
            });
    });
}

main();