'use client';
import { Card } from "@/components/ui/card";

export default function ErrorPage() {
  return (
    <div className="w-full h-screen">
      <div className="h-full flex justify-center items-center">
        <Card className="p-10">
          <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-lg">Page not found...</p>
            <button
              className="w-full text-white bg-purple-600 px-4 py-2 rounded-full transition duration-300 ease-in-out hover:text-purple-300 hover:shadow-lg"
              onClick={() => window.location.replace("/")}
            >
              回主頁
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
