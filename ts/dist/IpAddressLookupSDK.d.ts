import { GetIpAddressEntity } from './entity/GetIpAddressEntity';
export type * from './IpAddressLookupTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { IpAddressLookupEntityBase } from './IpAddressLookupEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class IpAddressLookupSDK {
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
    GetIpAddress(entopts?: Record<string, any>): GetIpAddressEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): IpAddressLookupSDK;
    tester(testopts?: any, sdkopts?: any): IpAddressLookupSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof IpAddressLookupSDK;
export { stdutil, config, BaseFeature, IpAddressLookupEntityBase, IpAddressLookupSDK, SDK, };
