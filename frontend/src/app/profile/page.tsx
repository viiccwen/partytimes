'use client';

import { Navbar } from "@/components/customs/navbar";
import { PartyPanel } from "@/components/customs/party-panel";

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
