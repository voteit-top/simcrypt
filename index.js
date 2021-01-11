#!/usr/bin/env node
const program = require('commander')
const inquirer = require('inquirer')
const scrypt = require('./simplecrypt.js')
program
    .command('enc')
    .alias('e')
    .description('encrypt string with specified password')
    .action(option => {		
		var strIn, pass;
		option.parent.args.shift();	
		strIn = option.parent.args.shift();	
        const promptList = [{
		  type: 'password',
		  message: 'please enter password:',
		  name: 'pass',
		  default: "",
		  mask: true,
		  hidden:true
		}];
		inquirer.prompt(promptList).then(answers => {
				pass = answers.pass;
				let encStr = scrypt.encryptStr(strIn, pass);
				if(encStr)
				{
					console.log("[OK]")
				}
				else
				{
					console.log("[ERR]")
				}
				console.log(encStr);
		})
		
    })
program
    .command('dec')
    .alias('d')
    .description('decrypt string with specified password')
    .action(option => {
		var strToDecrypt, pass;
		option.parent.args.shift();	
		strToDecrypt = option.parent.args.shift();	
        const promptList = [{
		  type: 'password',
		  message: 'please enter password:',
		  name: 'pass',
		  default: "",
		  mask: true,
		  hidden:true
		}];
		inquirer.prompt(promptList).then(answers => {
				pass = answers.pass;
				let decStr = scrypt.decryptStr(strToDecrypt, pass);
				
				if(decStr)
				{
					console.log("[OK]")
				}
				else
				{
					console.log("[ERR]")
				}
				console.log(decStr);				
		})
    })

program
    .command('encfile')
    .alias('ef')
    .description('encrypt file with specified password')
    .action(option => {
		var fileToEncrypt, pass, fileToOutput;
		option.parent.args.shift();	
		fileToEncrypt = option.parent.args.shift();
		fileToOutput = option.parent.args.shift();
		if(!fileToOutput ||fileToOutput.length == 0)
		{
			fileToOutput = fileToEncrypt + '.enc';
		}
		 const confirmList = [{
		  type: 'confirm',
		  message: 'overwrite ' + fileToOutput +'?',
		  name: 'owFile',
		  default:true,			  
		}];
		inquirer.prompt(confirmList).then(answers => {
			if(!answers.owFile)
				return;
			const promptList = [{
			  type: 'password',
			  message: 'please enter password:',
			  name: 'pass',
			  default: "",
			  mask: true,
			  hidden:true
			}];
			inquirer.prompt(promptList).then(answers => {
					pass = answers.pass;
					
					let encStr = scrypt.encryptFile(fileToEncrypt, pass, fileToOutput);
					if(encStr)
					{
						console.log("[OK]")
					}
					else
					{
						console.log("[ERR]")
					}
					console.log(encStr);
			})
		})
    })
program
    .command('decfile')
    .alias('df')
    .description('decrypt file with specified password')
    .action(option => {
		var fileToDecrypt, pass, fileToOutput;
		option.parent.args.shift();	
		fileToDecrypt = option.parent.args.shift();
		fileToOutput = option.parent.args.shift();
		if(!fileToOutput || fileToOutput.length == 0)
		{
			fileToOutput = fileToDecrypt + '.dec';
		}
		const confirmList = [{
		  type: 'confirm',
		  message: 'overwrite ' + fileToOutput + '?',
		  name: 'owFile',
		  default:true,			  
		}];
		inquirer.prompt(confirmList).then(answers => {
			if(!answers.owFile)
				return;
			const promptList = [{
			  type: 'password',
			  message: 'please enter password:',
			  name: 'pass',
			  default: "",
			  mask: true,
			  hidden:true
			}];
			inquirer.prompt(promptList).then(answers => {
					pass = answers.pass;
					let decStr = scrypt.decryptFile(fileToDecrypt, pass, fileToOutput);
					if(decStr)
					{
						console.log("[OK]")
					}
					else
					{
						console.log("[ERR]")
					}				
					console.log(decStr);
			})
		})

    })	
    
program.parse(process.argv)
