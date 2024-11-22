/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";

export interface BlogCardProps {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-400 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <div className="flex justify-center flex-col">
            <Avatar size={7} name={authorName} />
          </div>

          <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold">{title}</div>
        <div className="text-md font-thin">
          {content.slice(0, 100) + "..."}
        </div>
        <div className="text-slate-400 text-sm">
          {`${Math.ceil(content.length / 100)} minutes`}
        </div>
      </div>
    </Link>
  );
};

export function Avatar({ name, size = 5 }: { name: string; size?: number }) {
  const dimension = `${size * 8}px`; // Converts size to a pixel-based dimension
  return (
    <div
      className="relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
      style={{ width: dimension, height: dimension }}
    >
      <span
        className="text-sm font-extralight text-gray-600 dark:text-gray-300"
        style={{ fontSize: `${size}px` }}
      >
        {name[0]}
      </span>
    </div>
  );
}

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}
