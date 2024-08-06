import { Navbar } from "@/components/customs/navbar";
import { PartyPanel } from "@/components/customs/party-panel";


// check for valid user
export default function ProfilePage() {

  return (
    <>
      <Navbar />
      <div className="m-7">
        <PartyPanel />
      </div>
    </>
  );
}
