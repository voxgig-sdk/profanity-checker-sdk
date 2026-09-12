import { CheckProfanityEntity } from './entity/CheckProfanityEntity';
export type * from './ProfanityCheckerTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { ProfanityCheckerEntityBase } from './ProfanityCheckerEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
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
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
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
