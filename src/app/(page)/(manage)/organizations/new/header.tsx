"use client";

import useGetProfile from "@/api/user/useGetProfile";
import OrganizationHeaderButtons from "../headerButtons";

export default function OrganizationAllHeader() {
  const { data } = useGetProfile();
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-blue-main text-3xl font-bold mt-5 ">
          Setup Organization
        </h1>
      </div>
      <h1 className="mt-4 text-2xl text-black">{`Hi, ${data?.f_name} !`}</h1>
      <div className="text-white-darker">
        Add the necessary details about the organization to get started.
      </div>
    </>
  );
}
