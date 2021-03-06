'use strict';


class Plugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.hooks = { 'after:deploy:compileEvents': this.setResponseMappingTemplateInOptions.bind(this) };
  }


  setResponseMappingTemplateInOptions() {

    const resources = this.serverless.service.provider.compiledCloudFormationTemplate.Resources;
    this.serverless.service.custom = this.serverless.service.custom || {}
    const corsOptionSetting = {
      template: undefined,
      ...this.serverless.service.custom.cors
    };
    if (corsOptionSetting.template) {
      this.serverless.cli.log(`[serverless-plugin-cors-credential] set ResponseTemplate :: ${corsOptionSetting.template}`);
      Object.keys(resources)
        .filter(key => resources[key].Type === 'AWS::ApiGateway::Method')
        .filter(key => resources[key].Properties.HttpMethod === 'OPTIONS')
        .forEach(key => {
          resources[key].Properties.Integration.IntegrationResponses.forEach(ir => {
            ir.ResponseTemplates['application/json'] = corsOptionSetting.template;
          })
        })
    }

  }
}

module.exports = Plugin;