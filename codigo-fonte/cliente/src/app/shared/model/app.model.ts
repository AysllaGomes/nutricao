export class Status {

    static ACTIVED = 1;
    static INACTIVATED = 2;
    static EXCLUDED = 3;

    static ACTIVED_NAME = 'Ativo';
    static INACTIVATED_NAME = 'Inativo';
    static EXCLUDED_NAME = 'Excluído';

    id?: number;
    name?: string;

}

export class Visibility {

    static GENERAL = 1;
    static PARTICULAR = 2;

    id?: number;
    name?: string;
}

export class DocumentType {

    static ATTACHMENT = 1;

    static TERM_LETTER = 2;

    static PROCESS_PUBLIC_VERSION = 3;

    static PROCESS_CONFIDENTIAL_VERSION = 4;

    static EXTENDED_ANALYSIS_DOCUMENT = 5;

    static MANIFESTATION = 7;

    id?: number;

    name?: string;

}

export class Document {

    id?: number;
    name: string;
    logicalName: string;
    createdAt: string | Date;
    deleted?: boolean;

}

export class Person {

    id?: number;
    name?: string;
    email?: string;
    updatedAt?: Date;
    status?: Status;
    address?: Address;
    phoneList?: Phone[];
    emailList?: Email[];

}

export class Individual extends Person {

    registrationNumber?: string;
    generalRegistration?: string;
    office?: string;
    nationality?: string;

}

export class Company extends Person {

    registrationNumber?: string;

}

export class Address {

    id?: number;
    description?: string;

}

export class Email {

    id?: number;
    address?: string;
    visibility?: Visibility;

}

export class Phone {

    id?: number;
    number?: string;
    visibility?: Visibility;

}

export class CredentialType {

    id?: number;
    name?: string;

}

export class Credential {

    id?: number;
    username?: string;
    lastLogin?: Date;
    updatedAt?: Date;
    creator?: Credential;
    credential?: Credential;
    individual?: Individual;
    type?: CredentialType;
    status?: Status;
    permissionList?: Permission[];

}

export class Permission {

    id?: number;
    profile?: Profile;
    organizationUnit?: OrganizationUnit;
    status?: Status;

}

export class OrganizationUnit {

    static NO_EDITABLE = 0;
    static EDITABLE = 1;

    id?: number;
    acronym?: string;
    name?: string;
    editable?: boolean;
    status?: Status;

}

export class Profile {

    id?: number;
    name?: string;
    isEditable?: boolean;
    status?: Status;
    roleList?: Role[];
    permissionList?: Permission[];

}

export class Role {

    id?: number;
    code?: string;
    name?: string;
    group?: RoleGroup;

}

export class RoleGroup {

    id?: number;
    name?: string;
    roleList?: Role[];

}

export class ExternalFile {
    constructor (
        public id: number,
        public name: string,
        public createdAt: any = null
    ) {}
}
