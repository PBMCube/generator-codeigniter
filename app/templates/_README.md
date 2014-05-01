# <%= projectSlug %>

	# Install Homebrew
    $ ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"

    # Install Node (probably unnecessary if you're using Yeoman!)
    $ brew install node

    # Install Bower
    $ npm install -g bower

    # Install Composer
    $ brew tap josegonzalez/homebrew-php
    $ brew install josegonzalez/php/composer

    # Install Bourbon
    $ gem install bourbon
    $ bourbon install

    # Install dependencies
    $ npm install
    $ bower install
    $ composer update

    # Build
    $ grunt build
