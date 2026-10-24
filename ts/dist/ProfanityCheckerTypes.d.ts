export interface CheckProfanity {
    flaggedWords?: any[];
    isProfanity?: boolean;
    message: string;
    score?: number;
}
export interface CheckProfanityCreateData {
    message: string;
}
