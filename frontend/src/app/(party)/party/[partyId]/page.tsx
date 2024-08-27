import { GetParty } from "@/actions/party-actions";
import { Navbar } from "@/components/customs/navbar";
import { InspectPartyPanel } from "@/components/customs/party/inspect/inspect-party-panel";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

export default async function PartyPage({
    params
} : { params: { partyId: string } }) {

    const party = await GetParty(params.partyId);

    if(!party.correct || party.data?.party === undefined) {
        redirect("/error");
    }
    
    return (
        <>
            <Toaster richColors />
            <Navbar />
            <div className="m-7">
                <InspectPartyPanel party={party.data?.party} />
            </div>
        </>
    );
}