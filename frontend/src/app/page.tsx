import { CheckAuth } from "@/actions/user-actions";
import { DescriptionBlock } from "@/components/customs/home/description-block";
import { Footer } from "@/components/customs/home/footer";
import { Navbar } from "@/components/customs/navbar";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const cookie = cookies();
  const token: string | undefined = cookie.get("token")?.value
    ? cookie.get("token")?.value
    : undefined;
  const isLogin = await CheckAuth(token);
  
  return (
    <>
      <Navbar isLogin={isLogin} HasFixed={true} />
      <div className="flex flex-col">
        <div className="w-full min-h-screen">
          <div className="flex flex-col items-center mt-[200px] md:mt-[300px]">
            <div className="text-white text-4xl md:text-[50px] md:leading-[60px] font-bold">
              PartyTimes 都不揪？
            </div>
            <div className="text-white text-3xl font-bold">學生的揪團神器</div>
            <div className="text-white text-lg mt-5">
              讓你輕鬆揪團、輕鬆決定會議時間
            </div>
            <Link href="/login">
              <button
                className={cn(
                  "bg-white text-black px-6 py-2 rounded-full mt-10 transition-all duration-300",
                  "hover:bg-gray-100 hover:text-black hover:shadow-lg"
                )}
              >
                開始使用
              </button>
            </Link>
          </div>

          <div className="flex flex-col items-center mt-[100px] gap-5">
            <div className="text-slate-100 font-bold text-lg mt-5">
              還有誰在使用...？
            </div>
            {/* <div className="text-white">前期籌備中，歡迎各方社團、社群使用</div> */}
            <div className="w-full bg-white/50 backdrop-blur-lg">
              <div className="flex justify-center p-3">
                <Link href="https://www.instagram.com/ntustcsie/">
                  <Image
                    src="/CSIE_logo.png"
                    width={80}
                    height={80}
                    alt="csie logo"
                    className=" transition-all duration-300 hover:shadow-lg"
                  />
                </Link>
              </div>
            </div>
          </div>

          <DescriptionBlock
            className="mt-[500px]"
            title="學生的揪團神器"
            description="學生專屬的揪團神器，讓你輕鬆揪團、輕鬆決定會議時間"
            images={[
              {
                src: "/homepage/1.png",
                className: "w-[300px] h-[300px] md:w-[400px] md:h-[428px]",
              },
              {
                src: "/homepage/2.png",
                className:
                  " absolute w-[200px] h-[348px] top-[130px] left-[160px] md:w-[200px] md:h-[348px] md:top-[200px] md:left-[260px]",
              },
            ]}
            reverse={false}
          />
          <DescriptionBlock
            className="mt-[200px]"
            title="決定會議超方便"
            description="無須登入，輕鬆決定會議時間"
            images={[
              {
                src: "/homepage/3.png",
                className: "w-[360px] h-[340px] md:w-[500px] md:h-[480px]",
              },
            ]}
            reverse={true}
          />
          <DescriptionBlock
            className="mt-[200px]"
            title="視覺化投票時段"
            description="幫助你選出最佳的會議時間"
            images={[
              {
                src: "/homepage/4.png",
                className: "w-[300px] h-[200px] md:w-[600px] md:h-[400px]",
              },
              {
                src: "/homepage/5.png",
                className:
                  " absolute w-[300px] h-[200px] md:w-[400px] md:h-[300px] top-[100px] left-[40px] md:top-[200px] md:left-[280px]",
              },
            ]}
            reverse={false}
          />
          <Footer />
        </div>
      </div>
    </>
  );
}
