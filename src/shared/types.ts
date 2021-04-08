export interface SlapiDao {
    queryDrugs: {
        (queryTerm: string): Promise<any[]>
    };

    createDrug: {
        (ndc: string,
        rxcui: string,
        nameBrand: string,
        nameLabel: string,
        dosageAmount: number,
        dosageUnits: string,
        deliveryMethod: string): Promise<any> 
    };

    readDrug: {
        (id: number): Promise<any>
    };
}

/**
 * These types tell the response builder what values go where.
 * All main.ts functions should return an implementation of these.
 */
interface BasePayload {
    readonly payloadType: string;
};

export interface ErrorPayload extends BasePayload {
    readonly payloadType: 'ErrorPayload';
    summary: string;
    details: string;
    resources: string[];
};

export interface WarningPayload extends BasePayload {
    readonly payloadType: 'WarningPayload';
    metadata: any;
    [propName: string]: any;
};

export interface ResourcePayload extends BasePayload {
    readonly payloadType: 'ResourcePayload';
    metadata: any;
    [propName: string]: any;
};

export interface ResourceResponseBody {
    metadata: {
        payloadType: 'Resource' | 'ResourceList';
        totalLength: number;
    };
    payload: any | any[];
}

export interface WarningResponseBody {
    metadata: {
        payloadType: 'Warning';
        totalLength?: number;
    },
    payload: any;
}

export interface ErrorResponseBody {
    metadata: {
        payloadType: 'Warning';
        totalLength?: number;
    },
    payload: {
        summary: string;
        details: string;
        resources: string[];
    };
}
