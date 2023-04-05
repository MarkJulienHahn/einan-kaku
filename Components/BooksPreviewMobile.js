
import Image from "next/image";

const BooksPreviewMobile = ({ image, i, setFocus }) => {
  const makeFocus = async () => {
    setFocus(i);
  };

  return (
    <div onClick={makeFocus}>
      <Image
        fill
        objectFit="contain"
        src={image.titelbild.url}
        alt={image.titelbild.originalFilename}
      />
    </div>
  );
};

export default BooksPreviewMobile;
