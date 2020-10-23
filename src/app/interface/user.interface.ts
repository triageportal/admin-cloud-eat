export interface User {
    first_name: string;
    last_name: string;
    email: string;
    language: string;
    username?: string;// personal slid created by user - can use regular personal slid from main soft
    position?: string;
    access_type?: string; // admin, user
    status?: string;
    clinicName?: string;
    clinic_id?: number;
    id?: number;
}
