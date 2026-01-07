import { PrismaClient, Prisma } from '@prisma/client';
import type { CreateEmployeeDTO } from '../../../schemas/EmployeeSchema.ts';

export class RegisterEmployeeUseCase {
    async execute(data: CreateEmployeeDTO) {
        const prisma = new PrismaClient();

        try {
            const created = await prisma.employee.create({
                data: {
                    professional_registration: data.professional_registration,
                    active: data.active ?? true,
                    // default role when not provided
                    role: 'PRECEPTOR',
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    phone: data.phone ?? '',
                },
            });

            // do not expose password in the response
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...safe } = created as any;

            return safe;
        } catch (err: unknown) {
            // handle unique constraint errors (email or professional_registration)
            if (
                err instanceof Prisma.PrismaClientKnownRequestError &&
                (err as any).code === 'P2002'
            ) {
                throw new Error('Employee with same email or professional_registration already exists');
            }

            throw err;
        } finally {
            await prisma.$disconnect();
        }
    }
}