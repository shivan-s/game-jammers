import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

type ImageFile<T> = T & {
  previous: string;
};

const CustomDropZone = () => {
  const [files, setFiles] = useState<ImageFile<any>[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/x-png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    onDrop: (acceptedfiles) => {
      setFiles(
        acceptedfiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
  });

  const thumbs = files.map((file, idx) => (
    <div key={idx} className="h-48 rounded-t-xl">
      <img
        src={file.preview}
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </div>
  ));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <>
      <div
        className="flex items-center justify-center rounded-xl border-2 border-dashed border-stone-500 p-4 hover:bg-stone-600"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p>Drop image here</p>
      </div>
      {thumbs}
    </>
  );
};

export default CustomDropZone;
