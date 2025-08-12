import { Stack, StackProps, Tags } from 'aws-cdk-lib';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { Construct } from 'constructs';

export interface SecurityStackProps extends StackProps {
  domainName: string;
}

export class SecurityStack extends Stack {
  public readonly certificate: Certificate;

  constructor(scope: Construct, id: string, props: SecurityStackProps) {
    super(scope, id, props);

    const { domainName } = props;
    const apiSubdomain = `api.${domainName}`;

    // Crear certificado SSL para el dominio personalizado
    this.certificate = new Certificate(this, 'ApiCertificate', {
      domainName: apiSubdomain,
      subjectAlternativeNames: [`*.${domainName}`], // Para subdominios adicionales
      validation: CertificateValidation.fromDns(),
    });

    // Tags
    Tags.of(this).add('Component', 'Security');
    Tags.of(this).add('Purpose', 'SSL-Certificates');
  }
}