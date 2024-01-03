import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EncryptService {
  public genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }

  public getPassword(password, salt) {
    const hash = crypto.createHmac('sha256', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return value;
  }

  public generatePassword(password) {
    const salt = this.genRandomString(32);
    const passwordData = this.getPassword(password, salt);
    return {
      salt,
      hashedPassword: passwordData
    };
  }
}
