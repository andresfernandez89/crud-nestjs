import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('APIKEY') private APIKEY: string,
    @Inject('TAREA_ASINC') private TAREA_ASINC: string,
  ) {}
  getHello(): string {
    return `La llave de la aplicacion es: ${this.APIKEY}`;
  }

  getUseFactory() {
    console.log(this.TAREA_ASINC);
    return 'Realizando una tarea asincrona de ejemplo';
  }
}
