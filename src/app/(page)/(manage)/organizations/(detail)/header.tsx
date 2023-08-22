import OrganizationHeaderButtons from "../headerButtons";

export default function OrganizationDetailHeader() {
  return (
    <>
      <div className="flex justify-between">
        <div className="text-white-darker mt-4">
          Dashboard/Manage Organization/Organization Detail
        </div>
        <OrganizationHeaderButtons />
      </div>
      <h1 className="text-blue-main text-3xl font-bold mt-5 ">
        Organization Detail
      </h1>
    </>
  );
}
