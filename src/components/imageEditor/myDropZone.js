import { useCallback, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";

function MyDropZone({ setImage }) {
  const { t } = useTranslation();
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    fontSize: "13px",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles[0]);
  }, []);
  const fileSizeValidator = (file) => {
    if (file.size > 4194304) {
      return { code: "size-too-large", message: `Size is larger than 4Mb` };
    }
    return null;
  };

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg,image/png",
    maxFiles: 1,
    validator: fileSizeValidator,
  });

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  useEffect(() => {
    fileRejections.map(({ errors }) => {
      errors.map((error) => alert(`${error.code}: ${error.message}`));
    });
  }, [fileRejections]);

  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      <p>{t("settings.imageEditorArea.dragNDrop")}</p>
    </div>
  );
}

export default MyDropZone;
