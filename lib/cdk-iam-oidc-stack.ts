import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';

export class CdkIamOidcStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    
    const provider = new iam.OpenIdConnectProvider(this, 'MyProvider', {
      url: 'https://openid/connect'
    });
    
    cdk.Aspects.of(this).add(new RoleNameChecker());
    
    /*
    provider.node.children.forEach (child => {
          const cfnResource = child.node.children as cdk.CfnResource;
          if (cfnResource.cfnResourceType === "AWS::IAM::Role") {
            console.log("!");


          }
        });
    */
    
    /*
    const cfnRole = provider.node.children.find(child =>
      (child as cdk.CfnResource).cfnResourceType === 'AWS::IAM::Role') as iam.CfnRole;
    
    cfnRole.addPropertyOverride('AllocationId', 'eip')
    */
    
    /*
    const anotherWay = provider.node.children.find(c => (c as cdk.CfnResource).cfnResourceType === 'AWS::IAM::Role') as iam.CfnRole;
    console.log("123" + anotherWay)
    */
    
  }
}

class RoleNameChecker implements cdk.IAspect {
    public visit(node: cdk.IConstruct): void {
        console.log('visiting...');
        
        
        if (node instanceof cdk.CfnResource && node.cfnResourceType === 'AWS::IAM::Role') {
            
              console.log('hit a role!');
              //rolename = roleNameCreator();
              node.addPropertyOverride('RoleName', '666')
            
        }
        
        
        /*
        if (node instanceof iam.CfnRole) {
            console.log('hit a role!');
        }
        */
    }
    
    
};