import grid from "gridfs-stream"
import mongoose from 'mongoose'

const url="http://localhost:2020"

let gfs,gridfsBucket;
const conn=mongoose.connection;
conn.once('open',()=>{
    gridfsBucket= new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'fs'
    });
    gfs=grid(conn.db,mongoose.mongo);
    gfs.collection('fs');
})

export const uploadBlogImage= (req,res)=>{
    if(!req.file){
        return res.status(404).json({msg:"file not found"});
    }

    const newUrl=`${url}/file/${req.file.filename}`

    return res.status(200).json(newUrl);
}

export const getImage=async(req,res)=>{
    try {
        const file= await gfs.files.findOne({filename: req.params.filename});
        const readStream=gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}