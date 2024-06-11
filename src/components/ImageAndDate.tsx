import { getDate, read } from "@/utils/date";

const ImageAndDate: React.FC<ImageAndDate> = ({
  image,
  name,
  publishedAt,
  content,
}) => {
  return (
    <div className="flex justify-start items-center space-x-1 font-medium text-sm">
      <div className="flex justify-center items-center bg-gray-400 border-[1px] h-6 w-6 rounded-full border-transparent">
        {image}
      </div>
      <p>{name}</p>
      <span>·</span>
      <p>{publishedAt}</p>
      <span>·</span>
      <p>{content} min read</p>
    </div>
  );
};

export default ImageAndDate;
