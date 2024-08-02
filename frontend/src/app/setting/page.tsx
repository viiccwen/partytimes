import { Navbar } from "@/components/customs/navbar";
import { SettingCard } from "@/components/customs/setting/setting-card";
import { Toaster } from "sonner";

export default function SettingPage() {
  return (
    <>
      <Toaster richColors />
      <Navbar />
      <div className="m-[50px]">
        <SettingCard />
      </div>
    </>
  );
}
