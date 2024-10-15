import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('APIKEY') private APIKEY: string) {}
  getHello(): string {
    return `La llave de la aplicacion es: ${this.APIKEY}`;
  }
}
