'use strict';

var _ = require('lodash');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');

var ReactComponentGenerator = yeoman.generators.Base.extend({

	initializing: function() {
		this.pkg = require('../package.json');
	},

	prompting_init: function() {
		var done = this.async();

        this.log(
            `\n ${chalk.bold.underline('Welcome to the React Component generator')}
            \n We'are going to create a React component using Typescript, Showtime
            \n`
        );

		var prompts = [{
			type: 'input',
			name: 'packageName',
			message: 'First, what is the name of this package?',
			default: 'abc'
		}];

		this.prompt(prompts, function (props) {
			_.extend(this, props);
            this.projectName = this.packageName.replace(/^@[^\/]+\//,'').toLowerCase();
			done();
		}.bind(this));

		// this.prompt(prompts, function (props) {
		// 	_.extend(this, props);
		// 	this.packageName = _.kebabCase(_.deburr(this.projectName));
		// 	if (this.packageName.slice(0, 6) !== 'react-') {
		// 		this.packageName = 'react-' + this.packageName;
		// 	}
		// 	this.componentName = _.capitalize(_.camelCase(this.projectName));
		// 	this.currentYear = new Date().getFullYear();
		// 	done();
		// }.bind(this));
	},

	prompting_names: function() {
		var done = this.async();

		var prompts = [{
			type: 'input',
			name: 'fdsjalfda',
			message: 'What will the npm package name be?',
			default: this.packageName
		}];

		this.prompt(prompts, function (props) {
			_.extend(this, props);
			done();
		}.bind(this));
	},

	prompting_project: function() {
		var done = this.async();

		var prompts = [{
			type: 'input',
			name: 'gitRepo',
			message: 'What is your git repo addresss?',
			default: `https://github.com/yourname/${this.projectName}`
		}, {
			type: 'confirm',
			name: 'createDirectory',
			message: 'Would you like to create a new directory?',
			default: true
		}];

		this.prompt(prompts, function (props) {
			_.extend(this, props);
			if (props.createDirectory) {
				this.destinationRoot(this.packageName);
			}
			this.log('\n');
			done();
		}.bind(this));
	},

	writing: {
		project: function() {
			this.copy('tsconfig.json', 'tsconfig.json');
			this.copy('tslint.json', 'tslint.json');
			this.copy('.gitignore', '.gitignore');
            this.directory('src', 'src');
			this.template('package.json', 'package.json');
		},
		component: function() {
			// this.template('src/_Component.js', 'src/' + this.componentName + '.js');
		},
		examples: function() {
			// this.copy('example/example.less', 'example/src/example.less');
			// this.copy('example/gitignore', 'example/src/.gitignore');
			// this.template('example/_example.js', 'example/src/example.js');
			// this.template('example/_index.html', 'example/src/index.html');
		}
	},

	install: function() {
		this.npmInstall();
	},

	end: function() {
		var chdir = this.createDirectory ? '"cd ' + this.packageName + '" then ' : '';
		this.log(
			'\n' + chalk.green.underline('Your new React Component is ready!') +
			'\n' +
			'\nType ' + chdir + '"npm start" to run the development build and server tasks.' +
			'\n'
		);
	}

});

module.exports = ReactComponentGenerator;
