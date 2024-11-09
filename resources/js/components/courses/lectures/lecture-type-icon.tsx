import { FileIcon, Video } from "lucide-react";

type Props = {
  type: string;
};

export const LectureTypeIcon = ({ type }: Props) => {
  const Icon = type === "video" ? Video : FileIcon;
  return <Icon className="size-4 text-black" />;
};
