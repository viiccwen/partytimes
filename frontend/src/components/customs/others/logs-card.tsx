import { Card, CardContent, CardTitle } from "@/components/ui/card";

type log_list_type = {
  date: string;
  title: string;
  content: string;
};

interface LogsCardProps {
  log_list: log_list_type[];
}

export const LogsCard = ({ log_list }: LogsCardProps) => {
  return (
    <div className="w-full h-screen flex justify-center items-center mb-[50px]">
      <Card className="p-5 w-[390px] md:w-[700px]">
        <CardContent className="flex flex-col gap-7">
          <h1 className=" font-bold text-2xl">更新紀錄</h1>
          {log_list.map((log, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex font-bold">
                <p className=" text-blue-600 mr-2">*</p> {log.date} - {log.title}
              </div>
              <p className="ml-4">{log.content}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
