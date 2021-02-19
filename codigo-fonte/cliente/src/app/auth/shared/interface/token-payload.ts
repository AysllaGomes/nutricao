import { Credential } from '../../../shared/model/app.model';
import { ExtrasTokenPayload } from '../../../shared/model/extras-token-payload.model';

export interface TokenPayload {

    username: string;
    iat: number;
    exp: number;

    credential: Credential;

    roles: string[];

    extras: ExtrasTokenPayload;

}
