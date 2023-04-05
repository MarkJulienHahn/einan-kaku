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
        blurDataURL={image.titelbild.blurHash}
      />
    </div>
  );
};

export default ImagePreviewMobile;
