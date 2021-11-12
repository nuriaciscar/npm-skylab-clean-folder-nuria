#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const exists = require("fs");
const chalk = require("chalk");
const { program } = require("commander");
const {rmdir }= require("rimraf");

const inquirer = require("inquirer");

program.option("-f, --folder");

program.parse(process.argv);

const { folder } = program.opts();

exists(folder, (exists) => {
  if (exists) {
    console.log("Found!");

    const question = await inquirer.prompt([
      {
        name: "delete",
        type: "confirm",
        message: "¿Do you want to delete it?",
        default: false,
      },
    ]);

    if (question.delete === true) {
 
    }
  } else {
    new Error("Not found :(");
    return;
  }
});


const deletefolder = (folderToDelete) =>{
  fs.readdir(folderToDelete, (error, files) => {
    if (error || !files) {
          new Error(error);
          console.log("An error has ocurred");
          return;
}

files.forEach((file) =>{
  fs.stat(folderToDelete, file), (statsError, info) =>{
    if(statsError){
      console.log(statsError.message);
      return;
    }
    if (info.isFile()) {
      console.log(`File: ${file}`);
      fs.unlink(path.resolve(`${folderToDelete}/${file}`), error =>{
        error ? console.log("Cannot delete...") : console.log("Deleted successfully");
      })
    }
    if(info.isDirectory()){
      console.log(`Directory: ${file}`);
      fs.rmdir(path.resolve(`${folderToDelete}/${file}`), error =>{
        error ? console.log("Cannot delete...") : console.log("Deleted successfully");
      })
    }
  }



}







   