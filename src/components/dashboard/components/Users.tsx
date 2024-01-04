import React, {useEffect, useState} from 'react'
import { getUsers } from '../../../api/userCrud'

const Users = () => {
  const [users, setUsers] = useState<any>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      const users = await getUsers()
      console.log(users, "ss");
      
      setUsers(users)
      setLoading(false)
    }
    fetchUsers()
  }, [])

  return (
    <div className="users flex flex-col w-full min-h-screen h-fit p-4 mt-2">
      <div className="w-full flex justify-between">
    <div className="users flex flex-col w-fit rounded-md shadow p-1">
      <div className="users__day text-sm font-bold">Total Users</div>
      <div className="users__users text-sm font-medium text-blue-700 flex justify-center items-center text-center">1000</div>
    </div>
    <div className="users__list flex rounded-md space-x-3">
      <button className="shadow px-6">
        Export
      </button>
      <button className="shadow px-6 ">
        Print
      </button>
    </div>
    </div>
    <div className="users__table flex flex-col w-full rounded-md py-2 mt-2">
      <table className="w-full rounded-md">
        <thead className="w-full bg-slate-200 rounded-md">
          <tr className="w-full shadow-sm rounded-md">
            <th className="w-[10%] text-sm font-bold text-start py-3 px-2">No</th>
            <th className="w-[10%] text-sm font-bold text-start py-3 px-2">Image</th>
            <th className="w-[20%] text-sm font-bold text-start py-3 px-2">Name</th>
            <th className="w-[20%] text-sm font-bold text-start py-3 px-2">Email</th>
            <th className="w-[20%] text-sm font-bold text-start py-3 px-2">Role</th>
            <th className="w-[20%] text-sm font-bold text-start py-3 px-2">Status</th>
            <th className="w-[10%] text-sm font-bold text-start py-3 px-2">Action</th>
          </tr>
        </thead>
        <tbody className="w-full mt-3">
          {loading && (
            <tr className="w-full mt-3 shadow-sm">
              <td className="w-[10%] text-sm font-medium py-2 px-2">Loading...</td>
            </tr>
          )}
        {!loading && users?.users?.length === 0 && (
          <tr className="w-full mt-3 shadow-sm">
            <td className="w-[10%] text-sm font-medium py-2 px-2">No Users</td>
          </tr>
        )}
        {users?.users?.map((user:any, index:any) => (
          <tr className="w-full mt-3 shadow-sm" key={index}>
            <td className="w-[10%] text-sm font-medium py-2 px-2">
              {index + 1}
            </td>
            <td className="w-[10%] text-sm font-medium py-2 px-2">
              <div className="w-[50px] h-[50px] rounded-full bg-gray-400">
                <img src={
                  user?.profile_picture
                    ? user?.profile_picture
                    : "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
                  } alt="user" className="w-full h-full rounded-full object-cover" />
              </div>
            </td>
            <td className="w-[20%] text-sm font-medium py-2 px-2">
              {user?.first_name} {user?.last_name}
            </td>
            <td className="w-[20%] text-sm font-medium py-2 px-2">
              {user?.email}
            </td>
            <td className="w-[20%] text-sm font-medium py-2 px-2">
              {user?.role}
            </td>
            <td className="w-[20%] text-sm font-medium py-2 px-2">
              {user?.status}
            </td>
            <td className="w-[10%] text-sm font-medium py-2 px-2">
              <div className="flex flex-row justify-between items-center">
                <button className="shadow px-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.707 3.293a1 1 0 00-1.414 0L3 9.586V17h6v-2a1 1 0 011-1h2a1 1 0 011 1v2h6v-7.414l-6.293-6.293zM12 10a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="shadow px-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.707 3.293a1 1 0 00-1.414 0L3 9.586V17h6v-2a1 1 0 011-1h2a1 1 0 011 1v2h6v-7.414l-6.293-6.293zM12 10a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="shadow px-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 3.293a1 1 0 011.414 0L10 7.586l3.293-3.293a1 1 0 111.414 1.414L11.414 9l3.293 3.293a1 1 0 01-1.414 1.414L10 10.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 9 5.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                </div>
            </td>
          </tr>
        ))}
         </tbody>
      </table>
      </div>
    </div>

  )
}

export default Users