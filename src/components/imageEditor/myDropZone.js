import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

function MyDropZone({ setImage }) {
  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles[0]);
  }, []);
  const fileSizeValidator = (file) => {
    if (file.size > 4194304) {
      return { code: "size-too-large", message: `Size is larger than 4Mb` };
    }
    return null;
  };

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    accept: "image/jpeg,image/png",
    maxFiles: 1,
    validator: fileSizeValidator,
  });

  useEffect(() => {
    fileRejections.map(({ errors }) => {
      errors.map((error) => alert(`${error.code}: ${error.message}`));
    });
  }, [fileRejections]);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
      <p>(Only *.jpeg and *.png images will be accepted)</p>
    </div>
  );
}

export default MyDropZone;
