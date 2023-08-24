// Code inspired by https://dev.to/dmtrkovalenko/the-neatest-way-to-handle-alert-Modals-in-react-1aoe
// If you prefer to use Context API, refer to that link
"use client";

import useOrganizationsByUserQuery from "@/api/organization/useOrganizationsByUserQuery";
import useCurrentUser from "@/api/user/useCurrentUser";
import useGetProfile from "@/api/user/useGetProfile";
import { Organization } from "@/types/organization";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
type State = {
  org_id: number;
};
type Action = {
  setOrg: (value: number) => void;
};
const useOrganizationStore = create<State & Action>()(
  persist(
    (set) => ({
      org_id: 0,
      setOrg: (value: number) => set((state) => ({ org_id: value })),
    }),
    {
      name: 'food-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useOrganizationStore;
export const useCurrentOrganizationIndex = () =>
  useOrganizationStore((state) => state.org_id);

export const useSetCurrentOrganizationIndex = () =>
  useOrganizationStore((state) => state.setOrg);
export const useCurrentOrganization = () => {
  const { id } = useCurrentUser();
  const { data: organizations, isLoading } = useOrganizationsByUserQuery(
    id ?? null,
  );
  const index = useCurrentOrganizationIndex();
  return { data: organizations ? organizations[index] : null, isLoading };
};
export const useCurrentOrganizationId = () => {
  const { data: organization, isLoading } = useCurrentOrganization();
  return { id: organization?.id, isLoading };
};

export const useSetCurrentOrgID = () => {
  const { id } = useCurrentUser();
  const { data: organizations, isLoading } = useOrganizationsByUserQuery(
    id ?? null,
  );

  const setIndex = useSetCurrentOrganizationIndex();
  const setOrg = (id: string) => {
    setIndex(organizations.findIndex((e: Organization) => e.id === id))
  }
  return { set: setOrg };
}