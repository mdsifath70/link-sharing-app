import bcrypt from "bcrypt";

export default async function getHashed(value: string) {
  const hashed = await bcrypt.hash(value, 11);
  return hashed;
}
