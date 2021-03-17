import { Error, Resource, Warning } from '../shared/types';

/**
 * 
 * @param payload 
 * @returns 
 */
export function buildResponseObject(payload: Error | Resource | Warning) {

    // TODO - how to actually handle this?
    let payloadType: string;

    switch (payloadType) {
        case 'Error': {
            break;
        }
    }

    return payload;
};
