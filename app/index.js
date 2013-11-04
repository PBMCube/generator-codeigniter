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
        message: 'Author\'s name?',
        default: 'YES'
    }, {
        name: 'authorEmail',
        message: 'Author\'s email?',
        default: 'admin@yesstudio.co.uk'
    }, {
        name: 'projectSlug',
        message: 'Project slug?',
        validate: function (input) {
          return input !== '' ? true : 'Must not be blank!';
        }
    }];

    this.prompt(prompts, function (props) {
        this.authorName = (props.authorName !== '') ? props.authorName : 'YES';
        this.authorEmail = (props.authorEmail !== '') ? props.authorEmail : 'admin@yesstudio.co.uk';

        this.projectSlug = (props.projectSlug !== '') ? props.projectSlug : '_projectslug_';

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
    this.copy('_robots.txt', 'robots.txt');
    this.copy('_Gruntfile.js', 'Gruntfile.js');

    this.template('codeigniter/index.php', 'index.php');

    this.copy('codeigniter/license.txt', 'license.txt');
};

/*
CodeigniterGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
*/