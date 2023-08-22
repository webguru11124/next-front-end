import OrganiaztionCard from "./card";

export default function OrganizationPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <OrganiaztionCard id={params.id} />
    </div>
  );
}
