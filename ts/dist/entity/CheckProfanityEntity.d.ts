import { ProfanityCheckerEntityBase } from '../ProfanityCheckerEntityBase';
import type { ProfanityCheckerSDK } from '../ProfanityCheckerSDK';
import type { Control } from '../types';
import type { CheckProfanity, CheckProfanityCreateData } from '../ProfanityCheckerTypes';
declare class CheckProfanityEntity extends ProfanityCheckerEntityBase<CheckProfanity> {
    constructor(client: ProfanityCheckerSDK, entopts: any);
    make(this: CheckProfanityEntity): CheckProfanityEntity;
    create(this: any, reqdata?: CheckProfanityCreateData, ctrl?: Control): Promise<CheckProfanityEntity>;
}
export { CheckProfanityEntity };
