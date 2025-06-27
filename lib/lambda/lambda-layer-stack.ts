import { Stack, StackProps, CfnOutput, Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LayerVersion, Code, Runtime, Architecture } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import * as crypto from 'crypto';
import * as fs from 'fs';

interface LambdaLayerAppConfig {
  id: string;
  codePath: string;
  compatibleRuntimes: Runtime[];
 // compatibleArchitectures?: Architecture[];
  layerVersionName: string;
  description: string;
  exportOutputName?: string; // para exportar el ARN si se desea
}

export class LambdaLayerStack extends Stack {
  public readonly utilsLayer: LayerVersion;
  public readonly pgLayer: LayerVersion;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Función para generar hash de archivo para versionado automático
    const getFileHash = (filePath: string): string => {
      try {
        const fileBuffer = fs.readFileSync(filePath);
        return crypto.createHash('md5').update(fileBuffer).digest('hex').substring(0, 8);
      } catch (error) {
        console.warn(`No se pudo leer el archivo ${filePath}, usando timestamp`);
        return Date.now().toString(36).substring(0, 8);
      }
    };

    // Configuración de los Layers con versionado automático
    const layersConfig: LambdaLayerAppConfig[] = [
      {
        id: 'UtilsLayer',
        codePath: path.join(__dirname, 'layers/build/utils.zip'),
        compatibleRuntimes: [Runtime.NODEJS_20_X],
        //compatibleArchitectures: [Architecture.X86_64],
        layerVersionName: `utils-layer-${getFileHash(path.join(__dirname, 'layers/build/utils.zip'))}`,
        description: 'Layer para utilidades comunes (responses, logging, validaciones)',
        exportOutputName: 'UtilsLayerArn'
      },
      {
        id: 'PgLayer',
        codePath: path.join(__dirname, 'layers/build/pg.zip'),
        compatibleRuntimes: [Runtime.NODEJS_20_X],
        //compatibleArchitectures: [Architecture.X86_64],
        layerVersionName: `pg-layer-${getFileHash(path.join(__dirname, 'layers/build/pg.zip'))}`,
        description: 'Layer para PostgreSQL, AWS SDK y dbConnector',
        exportOutputName: 'PgLayerArn'
      }
    ];

    for (const config of layersConfig) {
      console.log(`📦 Creando layer: ${config.layerVersionName}`);
      
      const layer = new LayerVersion(this, config.id, {
        code: Code.fromAsset(config.codePath),
        compatibleRuntimes: config.compatibleRuntimes,
        //compatibleArchitectures: config.compatibleArchitectures,
        layerVersionName: config.layerVersionName,
        description: `${config.description} - Version: ${config.layerVersionName.split('-').pop()}`
      });

      // Asignar a propiedad pública si aplica
      if (config.id === 'UtilsLayer') this.utilsLayer = layer;
      if (config.id === 'PgLayer') this.pgLayer = layer;

      // Output (exportable) con versionado
      if (config.exportOutputName) {
        new CfnOutput(this, `${config.id}Output`, {
          value: layer.layerVersionArn,
          description: `ARN del layer ${config.id} - ${config.layerVersionName}`,
          exportName: `${this.stackName}-${config.exportOutputName}`
        });
      }

      // Output adicional solo para el nombre base (para referencias estables)
      new CfnOutput(this, `${config.id}Name`, {
        value: config.layerVersionName,
        description: `Nombre versionado del layer ${config.id}`,
        exportName: `${this.stackName}-${config.id}Name`
      });

      // Tag
    //  Tags.of(layer).add('Component', `Layer:${config.layerVersionName}`);
    }

    // Tag general al stack
  //  Tags.of(this).add('Component', 'LambdaLayers');
  }
}
