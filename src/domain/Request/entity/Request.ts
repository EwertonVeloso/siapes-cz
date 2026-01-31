export type RequestEntity = {
  id: string;
  title: string;
  description: string;
  course: string;
  students_number: number;
  protocol: string;
  status: 'PENDING' | 'ACCEPTED' | 'REFUSED';
  created_at: Date;
  updated_at: Date;
}