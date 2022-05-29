import { UploadedFile } from 'express-fileupload';
import { v4 } from 'uuid';
import path from 'path';

export const saveFile = (file?: UploadedFile): string | undefined => {
  if (!file) return;

  const fileName = v4() + '.jpg';
  const filePath = path.resolve('static', fileName);

  file.mv(filePath);

  return fileName;
};
