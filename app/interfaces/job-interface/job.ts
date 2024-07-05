export interface Job {
    location?: string;
    id_pro:string
    job_title:string
    company_name:string 
    job_description:string
    job_requirement:string
    salary: number
    job_deadline? :string
    isSaved? :  boolean
    job_Type?:string
}
