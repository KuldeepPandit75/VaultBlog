import {GridFsStorage} from "multer-gridfs-storage"
import dotenv from "dotenv"
import multer from "multer"
 
dotenv.config();

const username=process.env.MBD_USERNAME;
const password=process.env.MBD_PASSWORD;


const storage= new GridFsStorage({
    url: `mongodb+srv://${username}:${password}@cluster1.rbtvmid.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster1`,
    file: (req,file)=>{
        const match=['image/png','image/jpg','image/jpeg'];

        if(match.indexOf(file.mimeType)===-1){
            return `${Date.now()}-blog-${file.originalname}`;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`,
        }
    }
})
export default multer({storage})