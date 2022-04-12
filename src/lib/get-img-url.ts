export default function getImgUrl(img: any): string {
  const
    fn = img.filename,
    ext = img.imageType
  
  return `https://playentry.org/uploads/${fn.substr(0, 2)}/${fn.substr(2, 2)}/${fn}.${ext}`
}