import { UploadApiErrorResponse, UploadApiResponse, v2 } from "cloudinary";
import * as toStream from "buffer-to-stream";
import { AppError } from "../errors/app-error";


v2.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
}); 

export class CloudinaryProvider {
  
  async uploadPhoto(
    file: Express.Multer.File,
    folder: string
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    const maxImageSize = 5 * 1024 * 1024; // Image  === 5MB

    if (file.fieldname === "image") {
      if (file.size > maxImageSize) {
        throw new AppError("The image is too large");
      }
    }

    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          folder,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result!);
        }
      );
      toStream.default(file.buffer).pipe(upload);
    });

  }

}
