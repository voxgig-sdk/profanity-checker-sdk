import { CheckProfanityEntity } from './entity/CheckProfanityEntity';
export type * from './ProfanityCheckerTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { ProfanityCheckerEntityBase } from './ProfanityCheckerEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class ProfanityCheckerSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    CheckProfanity(entopts?: Record<string, any>): CheckProfanityEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): ProfanityCheckerSDK;
    tester(testopts?: any, sdkopts?: any): ProfanityCheckerSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof ProfanityCheckerSDK;
export { stdutil, config, BaseFeature, ProfanityCheckerEntityBase, ProfanityCheckerSDK, SDK, };
export type { DirectResult };
