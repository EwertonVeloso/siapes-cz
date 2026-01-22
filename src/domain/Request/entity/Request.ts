export class RequestEntity {
  public id?: string;
  public title: string;
  public description: string;
  public course: string;
  public students_number: number;
  public protocol: string;
  public status: 'PENDING' | 'ACCEPTED' | 'REFUSED';
  public created_at?: Date;

  constructor(props: RequestEntity) {
    this.title = props.title;
    this.description = props.description;
    this.course = props.course;
    this.students_number = props.students_number;
    this.protocol = props.protocol;
    this.status = props.status ?? 'PENDING';
    this.id = props.id;
    this.created_at = props.created_at;
  }
}