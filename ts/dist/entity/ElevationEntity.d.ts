import { FreeElevationEntityBase } from '../FreeElevationEntityBase';
import type { FreeElevationSDK } from '../FreeElevationSDK';
import type { Control } from '../types';
import type { Elevation, ElevationLoadMatch, ElevationListMatch } from '../FreeElevationTypes';
declare class ElevationEntity extends FreeElevationEntityBase<Elevation> {
    constructor(client: FreeElevationSDK, entopts: any);
    make(this: ElevationEntity): ElevationEntity;
    load(this: any, reqmatch?: ElevationLoadMatch, ctrl?: Control): Promise<ElevationEntity>;
    list(this: any, reqmatch?: ElevationListMatch, ctrl?: Control): Promise<ElevationEntity[]>;
}
export { ElevationEntity };
