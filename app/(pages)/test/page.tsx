import DownloadPdf from "@/components/exports/TextPdf";

export default async function Page() {
  return (
    <div className="h-screen w-screen">
      <DownloadPdf />
    </div>
  );
}
