import path from 'path'
import fs from 'fs'
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';

const uploadFolder = path.join(process.cwd(),"uploads");
if(!fs.existsSync(uploadFolder)){
    fs.mkdir(uploadFolder)
}
const storage = multer.diskStorage({
    destination:(req,file,cb) => cb(null,"uploads/"),
    filename: (req,file,cb) => cb(null, uuidv4()+ "-" + file.originalname)
})

export const upload = multer({storage});
