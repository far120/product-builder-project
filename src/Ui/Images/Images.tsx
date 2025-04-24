interface ImagesProps {
    images: string;
    alt: string;
    className?: string;
}
export default function Images({ images, alt, className }: ImagesProps) {
    return (
      <>
        <img src={images||''} alt={alt} className={`object-fill ${className}`} />
      </>
    )
}