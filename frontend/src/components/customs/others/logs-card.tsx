import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="w-full flex justify-center items-center mt-[50px]">
      <Card className="p-4 w-[390px] md:w-[700px]">
        <CardHeader>
          <CardTitle>
            <h1 className="font-bold text-2xl">更新紀錄</h1>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-7 overflow-y-auto max-h-[400px]">
          {log_list.map((log, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex font-bold">
                <p className=" text-blue-600 mr-2">*</p> {log.date} -{" "}
                {log.title}
              </div>
              <p className="ml-4">{log.content}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
