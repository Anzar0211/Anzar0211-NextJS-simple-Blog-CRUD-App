import connectDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await connectDB();
        const getAllBlogs=await Blog.find({});
        if(getAllBlogs){
            return NextResponse.json({
                success:true,
                data:getAllBlogs
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