# Serverless Plugin Cors Credential

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

### Example1

User Origin-Header

``` yaml
custom:
  cors:
    template:|
      set($context.responseOverride.header['Access-Control-Allow-Origin'] = $input.params().get('header').get('origin'))
```

### Example2

Validate Origin

``` yaml
custom:
  cors:
    template:|
      # allowed Origin List
      set($urlRegex='(https?://[\w:%#\$&\?\(\)~\.=\+\-]+\.xxxxx.com)|(https?://localhost:[0-9]+)')
      # caller's Origin
      set($callerOrigin=$input.params().get('header').get('origin'))
      # Origin in allowed Origin List ??
      set($isMatched = $callerOrigin.matches($urlRegex))
      if( $isMatched )
          set($context.responseOverride.header['Access-Control-Allow-Origin']=$callerOrigin)
      else
          set($context.responseOverride.header['Access-Control-Allow-Origin']='noAllowOrigin')
      end
```



