import { Stack, StackProps, Tags } from 'aws-cdk-lib';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export interface MonitoringStackProps extends StackProps {
  environment: string;
}

export class MonitoringStack extends Stack {
  public readonly apiGatewayLogGroup: LogGroup;
  public readonly lambdaLogGroup: LogGroup;

  constructor(scope: Construct, id: string, props: MonitoringStackProps) {
    super(scope, id, props);

    const { environment } = props;

    // Log Groups
    this.apiGatewayLogGroup = new LogGroup(this, 'ApiGatewayLogGroup', {
      logGroupName: `/aws/apigateway/moviehome-scrolltv-${environment}`,
      retention: environment === 'prod' ? RetentionDays.ONE_MONTH : RetentionDays.ONE_WEEK,
    });

    this.lambdaLogGroup = new LogGroup(this, 'LambdaLogGroup', {
      logGroupName: `/aws/lambda/moviehome-scrolltv-${environment}`,
      retention: environment === 'prod' ? RetentionDays.ONE_MONTH : RetentionDays.ONE_WEEK,
    });

    // Tags
    Tags.of(this).add('Component', 'Monitoring');
    Tags.of(this).add('Environment', environment);
  }

}