import {cpf} from './cpf/validator';
import {cnpj} from './cnpj/validator';
import {email} from './email/validator';
import {password} from './password/validator';
import {unique} from './unique/validator';
import {maxBinarySize} from './max-binary-size/validator';
import {fileFormat} from './file-format/validator';
import {confirm} from './confirm/validator';

export const ToolboxValidators: any = {
    cpf,
    cnpj,
    email,
    password,
    unique,
    maxBinarySize,
    fileFormat,
    confirm
};
