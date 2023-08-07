

import OrganizationHeaderButtons from "../headerButtons";

export default function OrganizationAllHeader() {
    return <>
        <div className="flex justify-between">
            <h1 className="text-blue-main text-3xl font-bold mt-5 ">Manage Organizations</h1>
            <OrganizationHeaderButtons />
        </div >
        <h1 className="mt-4 text-2xl text-black">Hi, Sam!</h1>
        <div className="text-white-darker">These are your Organizations</div>
    </>
}