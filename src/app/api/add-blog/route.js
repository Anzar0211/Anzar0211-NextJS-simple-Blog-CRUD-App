import connectDB from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddBlog=Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required()
})


export async function POST(req){
    try {
        await connectDB()
        const extractBlogData=await req.json();
        const {error}=AddBlog.validate(extractBlogData);
        if(error){
            return NextResponse.json({
                success:false,
                message:error.details[0].message
            })
        }
        const createBlog=await Blog.create(extractBlogData);
        if(createBlog){
            return NextResponse.json({
                success:true,
                message:"Blog created successfully"
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