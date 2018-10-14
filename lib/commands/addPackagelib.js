const fs = require('fs');
const shell = require('shelljs');
const cmd = require('node-cmd');
const inquirer = require('inquirer');
const chalk = require('chalk');
const logUpdate = require('log-update');
const elegantSpinner = require('elegant-spinner');
const showBanner = require('../external/banner');

let frame = elegantSpinner();

let addPackagefn = () => {
  
  showBanner();

  setTimeout(() => {

  console.log('\n'); 
  let questions = [
    {
      type: 'list',
      name: 'packages',
      message: 'Which package do you want to install?',
      choices: ['vee-validate', 'axios']
    }
  ]

  let data = fs.readFileSync('./mevn.json', 'utf8');
    let appname = JSON.parse(data);
    shell.cd(appname.project_name);
    shell.cd('client');

    inquirer.prompt(questions)
      .then(answers => {

        let fetchSpinner = setInterval(() => {
          logUpdate(`Installing ${answers.packages} ` + chalk.cyan.bold.dim(frame()));
        }, 50);

        setTimeout(() => {
          if (answers.packages === 'vee-validate') {
            cmd.get('npm install vee-validate --save-dev', (err) => {
              clearInterval(fetchSpinner);
              logUpdate.clear();
              if(err){
                console.log(chalk.red.bold('Something went wrong. Couldn\'t install the required packages!'));
                exit(1);
              }
              
              console.log(chalk.green.bold('Package added successfully'));
            })
          } else if(answers.packages === 'axios'){
            cmd.get('npm install axios --save', (err) => {
              clearInterval(fetchSpinner);
              logUpdate.clear();
              if(err){
                console.log(chalk.red.bold('Something went wrong. Couldn\'t install the required packages!'));
                exit(1);
              }
              
              console.log(chalk.green.bold('Package added successfully'));
            })
          }
        }, 100)
      })
    }, 1000);
}

module.exports = addPackagefn;