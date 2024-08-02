import { Navbar } from "@/components/customs/navbar";
import { SelectPartyTimePanel } from "@/components/customs/party/create/select-partytime-panel";
import { Toaster } from "sonner";

export default function PartyCreatePage() {
  return (
    <>
      <Navbar />
      <Toaster richColors />
      <SelectPartyTimePanel />
    </>
  );
}
