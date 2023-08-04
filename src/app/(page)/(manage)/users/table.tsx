import Avatar from "@/components/Avatar";

export default function UsersTable() {
    return <>
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Organiaztion</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><Avatar size="sm"></Avatar></td>
                    <td>ABC</td>
                    <td>abc@abc.om</td>
                    <td>ABC</td>
                    <td>Admin</td>
                </tr>
            </tbody>
        </table>
    </>
}