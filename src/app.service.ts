import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('APIKEY') private APIKEY: string,
    @Inject('TAREA_ASINC') private TAREA_ASINC: string,
    @Inject(config.KEY) private configServ: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const apiKey = this.configServ.apiKey;
    const dbName = this.configServ.database.name;
    const dbPort = this.configServ.database.port;
    return `La llave de la aplicacion es: ${apiKey} y el nombre de la base de datos ${dbName}, Puerto: ${dbPort}`;
  }

  getUseFactory() {
    console.log(this.TAREA_ASINC);
    return 'Realizando una tarea asincrona de ejemplo';
  }
}
