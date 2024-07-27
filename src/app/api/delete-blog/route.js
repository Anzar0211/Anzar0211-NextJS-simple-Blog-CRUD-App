import connectDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";


export async function DELETE(req){
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
        const deleteBlog=await Blog.findByIdAndDelete(blogId);
        if(deleteBlog){
            return NextResponse.json({
                success:true,
                message:"Blog deleted successfully"
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