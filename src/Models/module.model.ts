import mongoose,{ Schema } from "mongoose";
import { IModule } from "../Types/Modules/Module";


const moduleSchema =new Schema<IModule>({
    module:{type:String,required:true},
    modulelanguagekey:{type:String,required:true},
    sort:{type:Number,required:true,default:0},
    parent:{type:String,required:true},
    
   
});

export const Module=mongoose.model<IModule>("Module",moduleSchema);