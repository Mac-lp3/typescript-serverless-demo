interface getSingleResourceInterface<T> {
    (queryParams: any): Promise<T>;
}

interface getManyResourcesInterface<T> {
    (queryParams: any): Promise<T[]>;
}

interface getResourceCountInterface {
    (queryParams: any): Promise<number>;
}

export interface Dao<T> {
    getDrug: getSingleResourceInterface<T>; 
    getDrugs: getManyResourcesInterface<T>;
    getDrugsCount: getResourceCountInterface;
}