import Avatar from "@/components/Avatar";

export default function UsersTable() {
    return <>
        <table className=" border-collapse border border-light-border w-full">
            <thead>
                <tr className="text-light-color text-md bg-light-bg">
                    <th className=" border border-light-border">Image</th>
                    <th className=" border border-light-border">Name</th>
                    <th className=" border border-light-border">Email</th>
                    <th className=" border border-light-border">Organiaztion</th>
                    <th className=" border border-light-border">Role</th>
                </tr>
            </thead>
            <tbody className="text-center">
                <tr className="py-2">
                    <td className="border border-lighter-border "><div className="flex justify-center"><Avatar size="sm"></Avatar></div></td>
                    <td className="border border-lighter-border">ABC</td>
                    <td className="border border-lighter-border">abc@abc.om</td>
                    <td className="border border-lighter-border">ABC</td>
                    <td className="border border-lighter-border">Admin</td>
                </tr>
            </tbody>
        </table>
    </>
}