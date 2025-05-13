import DetallesPaciente from "../../../../components/DetallesPaciente";

export default async function DetallesPage({
  params,
}: {
  params: { record: string };
}) {
  const { record } = params;

  return (
    <>
      <DetallesPaciente params={{ record }} />
    </>
  );
}
