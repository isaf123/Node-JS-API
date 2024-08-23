import { Request } from "express";
import multer from "multer";
import { join } from "path"; // untuk merge file location

export const uploader = (dirName?: string, filePrefix?: string) => {
  const defaultDir = join(__dirname, "../public"); //define directory utama

  const configStore = multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      callback: (error: Error | null, destination: string) => void
    ) => {
      const fileDestination = dirName ? defaultDir + dirName : defaultDir;

      callback(null, fileDestination);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      callback: (error: Error | null, filename: string) => void
    ) => {
      const existName = file.originalname.split(".");
      const extension = existName[existName.length - 1];
      if (filePrefix) {
        const newName = filePrefix + Date.now() + "." + extension;
        callback(null, newName);
      } else {
        callback(null, file.originalname);
      }
    },
  });

  return multer({ storage: configStore });
};
