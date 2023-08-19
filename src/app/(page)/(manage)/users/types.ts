import { UserForm } from "../profile/editModal";

export interface User extends UserForm {
  id: string | null;
}


export const getUserFromSource = (data: User): User => (
  {
    id: data.id ?? null,
    email: data.email ?? "jack@test.com",
    f_name: data.f_name ?? "jack",
    l_name: data.l_name ?? "smith",
    number: data.number ?? "123-4567",
    gender: data.gender ?? "male",
    country: data.country ?? "US",
    language: data.language ?? "english",
    timezone: data.timezone ?? "EST",
  })