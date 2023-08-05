export default function ManageUsersHeader() {
    return <div className="flex justify-between">
        <h1 className="text-blue-main text-3xl font-bold mt-5 ">Manage Users</h1>
        <div className="flex gap-4">
            <button className="rounded-md text-[18px] bg-blue-primary py-2.5 px-7 text-white  font-bold" >Invite User</button>
            <button className="rounded-md text-[18px] bg-white py-2.5 px-7 text-blue-primary  font-bold border-2 border-blue-primary" >See Roles</button>
        </div>
    </div>
}