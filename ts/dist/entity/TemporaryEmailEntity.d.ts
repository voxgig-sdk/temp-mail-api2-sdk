import { TempMailApi2EntityBase } from '../TempMailApi2EntityBase';
import type { TempMailApi2SDK } from '../TempMailApi2SDK';
import type { Control } from '../types';
import type { TemporaryEmail, TemporaryEmailLoadMatch, TemporaryEmailCreateData, TemporaryEmailRemoveMatch } from '../TempMailApi2Types';
declare class TemporaryEmailEntity extends TempMailApi2EntityBase<TemporaryEmail> {
    constructor(client: TempMailApi2SDK, entopts: any);
    make(this: TemporaryEmailEntity): TemporaryEmailEntity;
    load(this: any, reqmatch?: TemporaryEmailLoadMatch, ctrl?: Control): Promise<TemporaryEmailEntity>;
    create(this: any, reqdata?: TemporaryEmailCreateData, ctrl?: Control): Promise<TemporaryEmailEntity>;
    remove(this: any, reqmatch?: TemporaryEmailRemoveMatch, ctrl?: Control): Promise<TemporaryEmailEntity>;
}
export { TemporaryEmailEntity };
