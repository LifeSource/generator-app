# generator-app

My custom yeoman generator for JavaScript web development with NodeJS and popular SPA frameworks such as Aurelia and Angular. This is a personal generator, that I've come to grips with, its for me personally to use.

### Installation

##### Clone the repository in the terminal
```
    1. git clone https://github.com/lifesource/generator-app.git"
```
##### Link it up to NPM
```
    2. npm link
```
##### Running the generator
```
    3. yo app [name] [--option] 

    options: --aurelia, --angular (default)
```

#### NOTE:

If the ```--aurelia``` option is specified you need to do a ```jspm install aurelia-bootstrapper``` after the generator is completed to install the config files and the bootstrapper for Aurelia.
