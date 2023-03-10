import { supabase } from "./supabase"

export const fetchPeoples = async () => {
  const { data: Personas, error } = await supabase
    .from('personas')
    .select('*')
  return [error, Personas]
}

export const insertPeople = async ({ birthDate, canton, cedula, lastName, names, provincia }) => {
  const now = new Date();
  const dateOfBirth = new Date(birthDate);
  const diffTime = now.getTime() - dateOfBirth.getTime();
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  const age = Math.floor(diffYears);

  const { data, error } = await supabase
    .from('personas')
    .insert([
      {
        age: age,
        birthDate: birthDate,
        canton: canton,
        cedula: cedula,
        lastName: lastName,
        names: names,
        provincia: provincia
      }
    ])
  return [error, data]
} 
