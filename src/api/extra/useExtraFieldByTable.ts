import { useCurrentOrganizationId } from "@/store/useOrganizationStore";
import useExtraFieldsQuery from "./useExtraFieldsQuery";
import { Tables } from "@/constants";
import { Extra } from "@/types/extra";
import { useMemo } from "react";
import { OptionValue } from "@/components/SelectBox";

export default function useExtraFieldByTable(table: string) {
    const { id: org_id } = useCurrentOrganizationId();
    const { data: extra_fields, isLoading } = useExtraFieldsQuery(org_id);
    const data = useMemo(() => extra_fields?.filter((extra: Extra) => extra.name != ""
        && extra.place === Tables.map((e: OptionValue): string => e.label).indexOf(table) + 1) ?? null, [extra_fields]);
    return { data, isLoading }
}