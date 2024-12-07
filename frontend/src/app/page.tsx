import Link from "next/link";
import Image from "next/image";

import { DescriptionBlock } from "@/components/customs/home/description-block";
import { Footer } from "@/components/customs/home/footer";
import { Navbar } from "@/components/customs/navbar";

import { cn } from "@/lib/utils";
import { ClubLists } from "@/lib/coop-clublists";
import { DescriptionBlockLists } from "@/lib/description-blocklists";
import { VerifyAuth } from "@/lib/verify";

export default async function Home() {
  const { isAuth, user } = await VerifyAuth(true);

  return (
    <>
      <Navbar isLogin={isAuth} HasFixed={true} isLoading={false} />
      <div className="flex flex-col">
        <div className="w-full min-h-screen">
          <div className="flex flex-col items-center mt-[200px]">
            <div className="text-4xl md:text-[50px] md:leading-[60px] font-bold title-text">
              PartyTimes 都不揪？
            </div>
            <div className="text-3xl font-bold">學生的揪團神器</div>
            <div className="text-lg mt-5">讓你輕鬆揪團、輕鬆決定會議時間</div>
            <div className="flex gap-5">
              <Link href="/party/dGSlFXRy">
                <button
                  className={cn(
                    "bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full mt-10 transition-all duration-300",
                    "hover:bg-slate-700 dark:hover:bg-slate-200 hover:shadow-lg"
                  )}
                >
                  派對頁面 🎉
                </button>
              </Link>
              <Link href="/login">
                <button
                  className={cn(
                    "bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full mt-10 transition-all duration-300",
                    "hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white hover:shadow-lg"
                  )}
                >
                  開始使用 🤩
                </button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center mt-[100px] gap-5">
            <div className="text-black dark:text-slate-100 font-bold text-lg mt-5">
              還有誰在使用...？
            </div>
            <div className="w-full">
              <div className="flex justify-center p-3 gap-5">
                {ClubLists.map((club, index) => (
                  <Link key={`clublists-${index}`} href={club.url}>
                    <Image
                      src={club.image}
                      width={club.width}
                      height={club.height}
                      alt={club.alt}
                      className="transition-all duration-300 hover:shadow-lg"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {DescriptionBlockLists.map((descriptionBlock, index) => (
            <DescriptionBlock
              className={descriptionBlock.className}
              key={`description-block-${index}`}
              title={descriptionBlock.title}
              description={descriptionBlock.description}
              images={descriptionBlock.image}
              reverse={descriptionBlock.reverse}
            />
          ))}
          <Footer />
        </div>
      </div>
    </>
  );
}
