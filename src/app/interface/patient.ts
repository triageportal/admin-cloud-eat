export interface Patient {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    visitType?: string;
    race?: string;
    result?: number;
}

/* triage?: JSON; */