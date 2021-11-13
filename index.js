#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const copy = require('clipboardy');
const fs = require('fs')
const os = require('os')
const path = require('path')

program.version('1.0.0').description('Simple Password Generator');




program
    .option('-l, --length <number>', 'length of passord', 8)
    .option('-s, --save', 'save password to passwords.txt')
    .option('-nn, --no-numbers', 'remove numbers')
    .option('-ns, --no-symbols', 'remove symbols')
    .parse()








const { length, save, numbers, symbols } = program.opts();

const CREATE_PASSWORD = (length, hasNumbers, hasSymbols) => {

    if(length < 8){
        throw new Error('password length cannot be less than 8.')
    }
    const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '~@#$%^&*()_-+=|\}][{;:/?.>,<*'

    let chars = alpha;

    hasNumbers ? chars += numbers : '';
    hasSymbols ? chars += symbols : '';

    let passord ='';

    for(let i= 0; i < length; i++){
        passord += chars.charAt(Math.floor(Math.random() * chars.length))
    };


    return passord;

};


const SAVE_TO_FILE =   (passord) =>{
    fs.open(path.join(__dirname, './','passwords.txt'), 'a', 666, (e,id)=>{
        fs.write(id,passord + os.EOL, null, 'utf-8',()=>{
            fs.close(id,()=>{
                console.log(chalk.green('Password saved to passwords.txt'))
            })
        })
    });


    

}


const generatedPassword = CREATE_PASSWORD(length, numbers, symbols);
if(save){
    SAVE_TO_FILE(generatedPassword)
}

copy.writeSync(generatedPassword)
console.log(chalk.blue('Generated Password: ') + chalk.bold(generatedPassword));
console.log(chalk.yellow('Password Copied to clipboard.'));