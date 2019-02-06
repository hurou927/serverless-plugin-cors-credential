
const corsPlugin = require('../src/index.js');
const cfn = require('./cfn-template.json');

describe('test0', async () => {
  test('success',async() => {
    const template = 'OptionsMappingTeamplate'
    const serverlessMock = {
      service: {
        provider: { compiledCloudFormationTemplate: JSON.parse(JSON.stringify(cfn)) },
        custom: {
          cors: {
            template,
          }
        }
      },
      cli: {
        log: () => { }
      },
      // custom: {}
    };

    const plugin = new corsPlugin(serverlessMock, {});
    plugin.setResponseMappingTemplateInOptions();

    const resource = serverlessMock.service.provider.compiledCloudFormationTemplate.Resources

    expect(
      resource.ApiGatewayMethodAaOptions.Properties.Integration
        .IntegrationResponses[0].ResponseTemplates['application/json']
    ).toBe(template);
    expect(
      resource.ApiGatewayMethodAaBbCcOptions.Properties.Integration
        .IntegrationResponses[0].ResponseTemplates['application/json']
    ).toBe(template);
  });


  test('no custom, should not output error', () => {
    
    const serverlessMock = {
      service: {
        provider: { compiledCloudFormationTemplate: JSON.parse(JSON.stringify(cfn))},
      },
      cli: {
        log: () => { }
      },
      // custom: {}
    };
    const plugin = new corsPlugin(serverlessMock, {});
    plugin.setResponseMappingTemplateInOptions();

    const resource = serverlessMock.service.provider.compiledCloudFormationTemplate.Resources

    expect(
      resource.ApiGatewayMethodAaOptions.Properties.Integration
        .IntegrationResponses[0].ResponseTemplates['application/json']
    ).toBe('');
    expect(
      resource.ApiGatewayMethodAaBbCcOptions.Properties.Integration
        .IntegrationResponses[0].ResponseTemplates['application/json']
    ).toBe('');

  });

  test('no custom.cors, should not output error', () => {

    const serverlessMock = {
      service: {
        provider: { compiledCloudFormationTemplate: JSON.parse(JSON.stringify(cfn)) },
      },
      cli: {
        log: () => { }
      },
      custom: {}
    };
    const plugin = new corsPlugin(serverlessMock, {});
    plugin.setResponseMappingTemplateInOptions();

    const resource = serverlessMock.service.provider.compiledCloudFormationTemplate.Resources

    expect(
      resource.ApiGatewayMethodAaOptions.Properties.Integration
        .IntegrationResponses[0].ResponseTemplates['application/json']
    ).toBe('');
    expect(
      resource.ApiGatewayMethodAaBbCcOptions.Properties.Integration
        .IntegrationResponses[0].ResponseTemplates['application/json']
    ).toBe('');

  });

});