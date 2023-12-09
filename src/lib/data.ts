import db from "./db";

export async function fetchUsers() {
  const users = await db.user.findMany();
  return users;
}

export async function fetchUserByEmail(email: string) {
  const user = await db.user.findUnique({
    where: { email },
    include: { accounts: true },
  });
  return user;
}
