import Avatar from "@/components/Avatar";

export default function UsersTable() {
    return <>
        <table className=" border-collapse border border-light-border w-full">
            <thead>
                <tr className="text-light-color text-md bg-light-bg">
                    <th className=" border border-light-border  py-3">Image</th>
                    <th className=" border border-light-border  py-3">Name</th>
                    <th className=" border border-light-border  py-3">Email</th>
                    <th className=" border border-light-border  py-3">Organiaztion</th>
                    <th className=" border border-light-border  py-3">Role</th>
                </tr>
            </thead>
            <tbody className="text-center">
                <tr className="py-3">
                    <td className="border border-lighter-border py-3"><div className="flex justify-center"><Avatar size="sm"></Avatar></div></td>
                    <td className="border border-lighter-border py-3">ABC</td>
                    <td className="border border-lighter-border py-3">abc@abc.om</td>
                    <td className="border border-lighter-border py-3">ABC</td>
                    <td className="border border-lighter-border py-3">Admin</td>
                </tr>
            </tbody>
        </table>
    </>
}