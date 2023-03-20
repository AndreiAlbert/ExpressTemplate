#!/usr/bin/env node
const fs = require('fs');
const yargs = require('yargs');
const shell = require('shelljs');
const { exit } = require('process');
let path = '.';
let port = 5000;

/**
 * If the folder src does not exist in the root directory it will be created
 * @param {*} path path to the root directory of the project. Creates a src directory in the path if it doesn't exist.
 * @return {*} void
 */
function createSrc(path) {
    if(!fs.existsSync(`${path}`)) {
        console.log(`[ERROR]: ${path} does not exist`);
        exit(1);
    }
    if (!fs.existsSync(`${path}/src`)) {
        fs.mkdir(`${path}/src`, (error) => {
            if (error) {
                console.log(error);
                return;
            }
        })
    }
    return;
}

/**
 * index.js file is created with a template in it
 * @param {*} path path to the main file
 * @param {*} port port on which the server will run
 */
function createIndexFile(path, port) {
    const program = `const express = require('express');\nconst app = express();\nconst port = ${port};\n\napp.listen(port, () => {\n\tconsole.log('server working');\n});`;
    fs.writeFile(`${path}/src/index.js`, program, (error) => {
        if (error) {
            console.log(error);
            return;
        }
    })
}

/**
 *Initializez git repository and adds a .gitignore file for node_modules
 * @param {*} path path to root directory of project
 */
function gitInit(path) {
    try {
        shell.exec('git init');
    }catch(error){
        console.log(`Error with git init\nError message:${error.message}`);
    }
    fs.writeFile(`${path}/.gitignore`, 'node_modules' , (error) => {
        if (error) {
            console.log(error.message);
            return;
        }
    })
}

function npmInit() {
    try {
        shell.exec('npm init -y')
    }catch(error){
        console.log(`Error with npm iniit\nError message:${error.message}`);
    }
}

function installExpress() {
    try {
        shell.exec('sudo npm i express');
    }catch(error){
        console.log(`Error while installing express\nError message:${error.message}`);
    }
}



/**
 *Adds an npm script for running the server
 * @param {*} path path to the root directort of the project
 */
function addRunScript(path) {
    fs.readFile(`${path}/package.json`,  (err, rawData) => {
        if (err) {
            console.log(err.message);
            return;
        }
        processedJson = JSON.parse(rawData);
        processedJson['scripts']['server'] = 'node src/index.js';
        processedJson = JSON.stringify(processedJson);
        fs.writeFile(`${path}/package.json`,processedJson ,(err) => {
            if (err) {
                console.log(err.message);
                return;
            }
        })
    })
}

function main() {
    const args = yargs.argv;
    if (args.path) {
        path = args.path;
    } 
    if (args.port) {
        port = args.port;
    }
    createSrc(path);
    createIndexFile(path, port);
    try {
        shell.cd(`${path}`);
    }catch(error){
        console.log(error.message);
        return;
    }
    npmInit();
    installExpress();
    addRunScript(path);
    if (args.g) {
        gitInit(path);
    }
}

main()