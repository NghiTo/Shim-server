import { v2 as cloudinary } from "cloudinary";

export const uploadImg = (file, public_id, overwrite, invalidate) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        public_id,
        overwrite,
        invalidate,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) throw reject(error);
        resolve(result);
      }
    );
  });
};
