import Image from "next/image";
import { useRouter } from "next/router";

const ImagePreviewMobile = ({ image, i }) => {
  const router = useRouter();

  const makeFocus = async () => {
    router.push(`/?image=${i}`, `/${image.slug?.current}`);
  };
  return (
    <div onClick={makeFocus}>
      <Image
        fill
        objectFit="contain"
        src={image.titelbild.url}
        alt={image.titelbild.originalFilename}
        placeholder="blur"
        blurDataURL={`/_next/image?url=${image.titelbild.url}&w=16&q=1`}
      />
    </div>
  );
};

export default ImagePreviewMobile;
