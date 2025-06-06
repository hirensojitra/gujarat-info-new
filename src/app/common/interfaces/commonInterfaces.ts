export interface User {
    id: string,
    username: string;
    email: string;
    roles: string;
    image: any;
    firstname: string;
    lastname: string;
    mobile: string;
    district_id: string,
    taluka_id: string,
    village_id: string,
    token: string,
    emailverified: boolean,
    [key: string]: any
}

export interface District {
    id: string,
    name: string,
    gu_name?: string,
    selected?: boolean,
    is_deleted: boolean
}
export interface PostCategory {
    id: string,
    name: string,
    description?: string,
    selected?: boolean,
    active: boolean
}
export interface Taluka {
    id: string,
    name: string,
    gu_name?: string,
    district_id: string,
    is_deleted: boolean
}
export interface Village {
    id: string,
    name: string,
    gu_name?: string,
    district: string,
    district_name: string,
    district_gu_name: string,
    taluka: string,
    taluka_name: string,
    taluka_gu_name: string,
    hasMember?: boolean
    [key: string]: any,
    is_deleted: boolean
}

export interface selectKey {
    id: string;
    name: string;
}
