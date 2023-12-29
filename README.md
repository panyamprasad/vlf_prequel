# People Fund Application

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.7.

## Development server
  - Run `npm install` to get the node modules.
  - Run `ng update` to update the angular.
  - Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload, if you change any of the source files.

### Fix for lodash error during initializing (Run only if build failed ) 
  - npm i -D @types/lodash@ts2.3

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build --prod` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Jenkins Auto Build
    Build Step
        Execute Shell : 
      Step1:  npm install
      Step2: 
        ng config -g cli.warnings.versionMismatch false
        ng build --prod --aot=true
    
      Step3:
        rm -rf  /var/lib/jenkins/qa/cscx
        mkdir /var/lib/jenkins/qa/cscx
        cp -rf  dist/. /var/lib/jenkins/qa/cscx/
        cp -rf src/.htaccess /var/lib/jenkins/qa/cscx/
        
    Deploy Step:
    #!/bin/bash
    
    ssh -i /var/lib/jenkins/creditsnap.pem bitnami@18.204.183.197 sudo rm -rf /tmp/cscx/*
    scp -ri /var/lib/jenkins/creditsnap.pem /var/lib/jenkins/qa/cscx/. bitnami@18.204.183.197:/tmp/cscx
    ssh -i /var/lib/jenkins/creditsnap.pem bitnami@18.204.183.197 sudo rm -rf /opt/bitnami/apps/cscx/htdocs/*
    ssh -i /var/lib/jenkins/creditsnap.pem bitnami@18.204.183.197 sudo cp -rf /tmp/cscx/. /opt/bitnami/apps/cscx/htdocs/
    exit 
 
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## To enforce the coding standards enable tslint for the project
To install the tslint.
`npm install tslint typescript --save-dev`

To fix the issues at project level.
`ng lint --fix` 

## Online Typescript IDE
https://stackblitz.com/edit/typescript-u7a3gd

http://jsonviewer.stack.hu/

## Mat Icons link
https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/#step-2

##=== should be removed

https://github.com/angular/angular/blob/4c2ce4e8ba4c5ac5ce8754d67bc6603eaad4564a/packages/common/http/testing/src/request.ts
