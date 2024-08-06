interface StatusLabelProps {
  status: boolean;
}

const status_array = [
  {
    status: "未計畫",
    color: "bg-red-500",
  },
  {
    status: "已計畫",
    color: "bg-green-500",
  },
];

export const StatusLabel = ({ status }: StatusLabelProps) => {
  const current_status = status_array[status ? 1 : 0];

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full ${current_status.color}`}></div>
      <p>{current_status.status}</p>
    </div>
  );
};
