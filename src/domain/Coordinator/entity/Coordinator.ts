export type CoordinatorRole = 'COORDINATOR';
//import { Coordinator } from '@prisma/client';

export type Coordinator = {
    id: string;
    registration: string;
    role: CoordinatorRole;
    name: string;
    email: string;
    password: string;
    created_at: Date
    updated_at: Date
}