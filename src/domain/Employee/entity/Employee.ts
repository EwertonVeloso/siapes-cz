export type EmployeeRole = 'ADMIN' | 'MANAGER';
//import { EmployeeRole } from '@prisma/client';

export type Employee = {
    id: string
    professional_registration: string
    active: boolean
    role: EmployeeRole,
    name: string
    email: string
    password: string
    phone: string
    created_at: Date
    updated_at: Date
}

