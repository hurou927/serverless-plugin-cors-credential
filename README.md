# Serverless Plugin Cors Credentials

This is the Serverless Framework plugin for cors setting in OPTIONS method.


## Install 

Install plugin
```
$ yarn add serverless-plugin-cors-credential --dev
```

Add the plugin to your serverless.yml file

```
plugins:
    - serverless-plugin-cors-credential
```


## Setup

```
cusotm:
    cors:
        template:|
            set($context.responseOverride.header['Access-Control-Allow-Origin'] = $input.params().get('header').get('origin'))
```


