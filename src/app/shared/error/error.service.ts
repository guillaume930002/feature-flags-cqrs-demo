import { Injectable } from "@nestjs/common";
import { ERROR_MAPS } from './error.map';

@Injectable()
export class ErrorService {
  public response(code: string | number, data?: any) {
    if (!ERROR_MAPS[code]) {
      return ERROR_MAPS[1];
    }
    return {
      error_code: code,
      error_msg: ERROR_MAPS[code].message,
      data
    };
  }
}
