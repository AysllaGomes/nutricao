export class Status {

    static ACTIVED = 1;
    static INACTIVATED = 2;
    static EXCLUDED = 3;
    static DRAFT = 4;
    static WAITING_FOR_PROTOCOL = 5;
    static DISREGARD = 6;
    static IN_ANALYSIS = 7;
    static IN_EXTENDED_ANALYSIS = 8;
    static ANALYZED_BY_GTAT = 9;
    static PUBLISHED = 10;
    static UNPUBLISHED = 11;
    static ANALYZED = 12;
    static ANALYZED_BY_LITIGANT = 13;
    static APPEAR_BY_LITIGANT = 14;
    static APPEAR_BY_GTAT = 15;
    static DEFERRED = 16;
    static REJECTED = 17;
    static DISSENT = 18;
    static CONTRARY_MANIFESTATION = 19;
    static ALL = 20;

    static ALL_NAME = 'Todos';
    static IN_ANALYSIS_NAME = 'Em análise';
    static IN_EXTENDED_ANALYSIS_NAME = 'Em análise prorrogada';
    static ACTIVED_NAME = 'Ativo';
    static INACTIVATED_NAME = 'Inativo';
    static EXCLUDED_NAME = 'Excluído';
    static DEFERRED_NAME = 'Deferido';
    static REJECTED_NAME = 'Indeferido';
    static DISSENT_NAME = 'Dissenso';
    static PUBLISHED_NAME = 'Publicável';
    static UNPUBLISHED_NAME = 'Não publicável';
    static CONTRARY_MANIFESTATION_NAME = 'Manifestação Contrária';

    id?: number;
    name?: string;
}

export class Visibility {

    static GENERAL = 1;
    static PARTICULAR = 2;
    static GOVERNMENT = 3;

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
