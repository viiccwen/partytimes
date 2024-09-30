import { Auth } from "@/actions/user-actions";
import { Navbar } from "@/components/customs/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function AboutPage() {
  const token: string | undefined = cookies().get("token")?.value;
  const { correct: auth, data: user, error } = await Auth(token);
  
  return (
    <>
      <Navbar isLogin={auth} HasFixed={true} />
      <div className="w-full h-screen flex justify-center items-center">
        <Card className={cn("p-5 w-[390px]", "md:w-[700px]")}>
          <CardContent className="flex flex-col gap-7">
            <h1 className="text-2xl font-bold">關於</h1>
            <p>
              大家好，我是 Vic Wen，同時也是 PartyTimes
              的擁有者，當初構思此網站僅僅是為了幫助使用者更方便地管理自己的社交活動、會議而設計的網站。
            </p>
            <p>
              當中也經歷了一番曲折，但是我還是堅持下來，希望這個網站能夠幫助到更多的人，讓大家能夠更方便地管理自己的活動、會議。
            </p>
            <div>
              若有發現任何問題、建議、或是合作的機會，歡迎
              <Link
                href="/feedback"
                className="text-blue-300 hover:text-blue-500"
              >
                與我聯絡
              </Link>
              ，我會盡快回覆您的訊息。
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
