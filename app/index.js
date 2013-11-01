'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var CodeigniterGenerator = module.exports = function CodeigniterGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({
            skipInstall: true
        });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(CodeigniterGenerator, yeoman.generators.Base);

CodeigniterGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [{
        name: 'authorName',
        message: 'Your name? (author\'s name, default: YES)'
    }, {
        name: 'authorEmail',
        message: 'Your email? (author\'s email, default: admin@yesstudio.co.uk)'
    }, {
        name: 'projectSlug',
        message: 'What do you want to call your project? (lowercase slug)'
    }, {
        name: 'projectURL',
        message: 'Your project URL? (e.g.: leave blank to have CodeIgniter guess this)'
    }, {
        name: 'dbHostname',
        message: 'Your database hostname? (e.g.: 127.0.0.1:3306)'
    }, {
        name: 'dbUsername',
        message: 'Your database username? (e.g.: root)'
    }, {
        name: 'dbPassword',
        message: 'Your database password? (e.g.: root)'
    }, {
        name: 'dbDatabase',
        message: 'Your database name? (e.g.: database_name)'
    }, {
        name: 'timeZone',
        message: 'Your time zone? (e.g.: Europe/London)'
    }, {
        name: 'memoryName',
        message: 'These settings you just entered are cached in memory if you have memcache installed.\nEnter the name/key to save these settings: (e.g: config_project)'
    }];

    this.prompt(prompts, function (props) {
        this.authorName = (props.authorName !== '') ? props.authorName : 'YES';
        this.authorEmail = (props.authorEmail !== '') ? props.authorEmail : 'admin@yesstudio.co.uk';

        this.projectSlug = (props.projectSlug !== '') ? props.projectSlug : '_projectslug_';
        this.projectURL = (props.projectURL !== '') ? props.projectURL : '';

        this.dbHostname = (props.dbHostname !== '') ? props.dbHostname : '127.0.0.1:3306';
        this.dbUsername = (props.dbUsername !== '') ? props.dbUsername : 'root';
        this.dbPassword = (props.dbPassword !== '') ? props.dbPassword : 'root';
        this.dbDatabase = (props.dbDatabase !== '') ? props.dbDatabase : 'database_name';

        this.timeZone = (props.timeZone !== '') ? props.timeZone : 'Europe/London';

        this.memoryName = (props.memoryName !== '') ? props.memoryName : 'config_project';

        cb();
    }.bind(this));
};

CodeigniterGenerator.prototype.app = function app() {
    this.directory('codeigniter/application', 'application');
    this.directory('codeigniter/system', 'system');
    this.directory('codeigniter/templates', 'templates');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('_composer.json', 'composer.json');
    this.copy('_htaccess', '.htaccess');
    this.copy('_README.md', 'README.md');

    this.template('codeigniter/index.php', 'index.php');

    this.copy('codeigniter/license.txt', 'license.txt');

    var configText = '[project]' + '\nslug=' + this.projectSlug + '\nurl=' + this.projectURL + '\ntemplates=templates/' + '\n[database]' + '\nhost=' + this.dbHostname + '\ndb=' + this.dbDatabase + '\nuser=' + this.dbUsername + '\npass=' + this.dbPassword;

    this.write('CONFIG.ini', configText);
};

/*
CodeigniterGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
*/