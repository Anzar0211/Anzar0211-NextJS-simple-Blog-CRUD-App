"use client";

import { useEffect, useState } from "react";
import AddNewBlog from "../add-new-blog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";

const initialBlogFormData={
  title:"",
  description:""
}

const BlogOverview = ({blogList}) => {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const[loading,setLoading]=useState(false);
  const[blogFormData,setBlogFormData]=useState(initialBlogFormData)
  const[currentEditedBlogId,setCurrentEditedBlogId]=useState(null)

  const router=useRouter();

  useEffect(()=>{
    router.refresh()
  },[])

  const handleBlogSave = async() => {
    try {
      setLoading(true);
      const apiResponse=currentEditedBlogId!==null
      ?await fetch(`/api/update-blog?id=${currentEditedBlogId}`,{
        method:"PUT",
        body:JSON.stringify(blogFormData)
      }) 
      :await fetch('/api/add-blog',{
        method:"POST",
        body:JSON.stringify(blogFormData)
      })
      const response=await apiResponse.json();
      if(response?.success){
        setLoading(false)
        setBlogFormData(initialBlogFormData)
        setOpenBlogDialog(false)
        setCurrentEditedBlogId(null)
        router.refresh()
      }
    } 
    
    catch (error) {
      console.log(error);
      setLoading(false);
      setBlogFormData(initialBlogFormData)
    }
  }

  const handleDeleteBlog=async(id)=>{
    try {
      const apiResponse=await fetch(`/api/delete-blog/?id=${id}`,{
        method:'DELETE'
      })
      const response=await apiResponse.json();
      if(response?.success){
        router.refresh()
      }
    } catch (error) {
      console.log(error);

    }
  }

  const handleEditBlog=(blog)=>{
    setCurrentEditedBlogId(blog?._id)
    
    setBlogFormData({
      title:blog?.title,
      description:blog?.description
    })
    setOpenBlogDialog(true);
  }


  return (
    <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <AddNewBlog
        openBlogDialog={openBlogDialog}
        setOpenBlogDialog={setOpenBlogDialog}
        loading={loading}
        setLoading={setLoading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleBlogSave={handleBlogSave}
        currentEditedBlogId={currentEditedBlogId}
        setCurrentEditedBlogId={setCurrentEditedBlogId}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {
          blogList && blogList.length>0 ?
          blogList.map((blog,index)=>(
            <Card className="p-5">
              <CardContent key={index}>
                <CardTitle className="mb-5">{blog?.title}</CardTitle>
                <CardDescription>{blog?.description}</CardDescription>
                <div className="mt-5 flex gap-5  items-center">
                  <Button onClick={()=>handleEditBlog(blog)}>Edit</Button>
                  <Button onClick={()=>handleDeleteBlog(blog._id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))
          :<Label className="text-3xl font-bold ">No Blogs found..Please add some!!</Label>
        }
      </div>
    </div>
  );
};
export default BlogOverview;
