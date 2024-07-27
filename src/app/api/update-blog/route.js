import connectDB from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";


const UpdateBlog=Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required()
})

export async function PUT(req){
    try {
        await connectDB();
        const {searchParams}=new URL(req?.url);
        const blogId=searchParams.get("id");
        if(!blogId){
            return NextResponse.json({
                success:false,
                message:"Invalid Blog Id"
            })
        }
        const{title,description}=await req.json();
        const{error}=UpdateBlog.validate({
            title,
            description
        })
        if(error){
            return NextResponse.json({
                success:false,
                message:error.details[0].message
            })
        }

        const updateBlog=await Blog.findOneAndUpdate({
            _id:blogId
        },{
            title,
            description
        },{
            new:true
        })
        if(updateBlog){
            return NextResponse.json({
                success:true,
                message:"Blog updated successfully"
            })
        }else{
            return NextResponse.json({
                success:false,
                message:"Something went wrong"
            })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success:false,
            message:"Something went wrong"
        })
    }
}