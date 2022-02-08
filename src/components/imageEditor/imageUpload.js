import AvatarEditor from "react-avatar-editor";

function ImageUpload() {
  return (
    <AvatarEditor
      image="https://bukulele.site/images/mylogo.png"
      width={250}
      height={250}
      border={50}
      borderRadius={250}
      color={[255, 255, 255, 0.6]} // RGBA
      scale={1.2}
      rotate={0}
    />
  );
}

export default ImageUpload;
