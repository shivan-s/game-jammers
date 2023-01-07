import { type Tag } from "@prisma/client";

const DisplayTag = (tag: Tag) => {
  return (
    <div className="flex gap-2">
      <div
        key={tag.id}
        className="inline-block rounded-full bg-green-300 px-4 py-2.5 text-sm text-green-700"
      >
        <p className="text-bold text-base">{tag.name}</p>
      </div>
    </div>
  );
};

export default DisplayTag;
