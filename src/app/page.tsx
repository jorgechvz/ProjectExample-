import { fetchUsers } from '@/lib/data'
import Image from 'next/image'

export default async function Home() {
  const getUser = await fetchUsers()
  return (
    <div>
      <h1>Home</h1>
      <ul>
        {getUser.map((user) => (
          <li key={user.id}>
            {user.name} 
          </li>
        ))}
      </ul>
    </div>
  )
}
