import { Role } from "@prisma/client";


export type User = {
  id: string;
  email: string;
  password: string;
  role: Role;
};


export interface Testimonial {
  img: string;
  quote: string;
  name: string;
  role: string;
}

