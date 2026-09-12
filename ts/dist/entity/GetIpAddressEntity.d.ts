import { IpAddressLookupEntityBase } from '../IpAddressLookupEntityBase';
import type { IpAddressLookupSDK } from '../IpAddressLookupSDK';
import type { Control } from '../types';
import type { GetIpAddress, GetIpAddressLoadMatch } from '../IpAddressLookupTypes';
declare class GetIpAddressEntity extends IpAddressLookupEntityBase<GetIpAddress> {
    constructor(client: IpAddressLookupSDK, entopts: any);
    make(this: GetIpAddressEntity): GetIpAddressEntity;
    load(this: any, reqmatch?: GetIpAddressLoadMatch, ctrl?: Control): Promise<GetIpAddressEntity>;
}
export { GetIpAddressEntity };
