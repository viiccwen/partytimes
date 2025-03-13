import Link from "next/link";
import Image from "next/image";
import { Afacad } from "@next/font/google";

import { DescriptionBlock } from "@/components/customs/home/description-block";
import { Footer } from "@/components/customs/home/footer";
import { Navbar } from "@/components/customs/navbar";
import { ClubLists } from "@/lib/coop-clublists";
import { DescriptionBlockLists } from "@/lib/description-blocklists";

import { cn } from "@/lib/utils";
import { VerifyAuth } from "@/lib/verify";

const font_style = Afacad({
  subsets: ["cyrillic-ext"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export default async function Home() {
  const { isAuth, user } = await VerifyAuth(true);

  return (
    <>
      <Navbar isLogin={isAuth} HasFixed={true} isLoading={false} />
      <div className="flex flex-col">
        <div className="w-full min-h-screen">
          <div className="flex flex-col items-center mt-[200px]">
            <div
              className={cn(
                font_style.className,
                "text-4xl md:text-[56px] md:leading-[64px] font-extrabold title-text text-gradient",
                "animate-fade-up animate-once",
              )}
            >
              PartyTimes 都不揪？
            </div>
            <div
              className={cn(
                "text-2xl font-semibold",
                " text-gray-700 dark:text-gray-200",
                "animate-fade-up animate-once animate-delay-500",
              )}
            >
              學生的揪團神器
            </div>
            <div
              className={cn(
                "text-base md:text-lg text-gray-600 dark:text-gray-400 mt-5",
                "animate-fade-up animate-once animate-delay-1000",
              )}
            >
              讓你輕鬆揪團、決定會議時間
            </div>
            <div className="flex gap-5">
              <Link href="/party/dGSlFXRy">
                <button
                  className={cn(
                    "bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 shadow-lg rounded-full mt-10 transition-all duration-300",
                    "hover:bg-blue-700 hover:to-blue-700",
                    "animate-fade-up animate-once animate-delay-[1500ms]",
                  )}
                >
                  派對頁面 🎉
                </button>
              </Link>
              <Link href="/login">
                <button
                  className={cn(
                    "bg-gray-900 text-white dark:bg-slate-700 px-6 py-3 shadow-md rounded-full mt-10 transition-all duration-300",
                    "hover:bg-gray-800 dark:hover:bg-slate-800",
                    "animate-fade-up animate-once animate-delay-[1500ms]",
                  )}
                >
                  開始使用 🤩
                </button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center mt-[100px] gap-5">
            <div
              className={cn(
                "text-black dark:text-gray-200 font-bold text-lg mt-5",
                "animate-fade animate-once animate-delay-[2000ms]",
              )}
            >
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
                      className={cn(
                        "transition-all duration-300 hover:shadow-lg",
                        "animate-fade animate-once animate-delay-[2500ms]",
                      )}
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
