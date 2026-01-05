export type EmployeeRole = 'admin' | 'manager' | 'preceptor'

export type Employee = {
    id: string
    professional_registration: string
    active: boolean
    role: string
    name: string
    email: string
    password: string
    phone: string
    created_at: Date
    updated_at: Date
}

