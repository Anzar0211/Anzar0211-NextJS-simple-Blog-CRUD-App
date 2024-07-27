import BlogOverview from "@/components/blog-overview"

async function fetchListOfBlogs(){
    try {
        const apiResponse=await fetch('http://localhost:3000/api/get-blogs',{
        method:"GET",
        cache:"no-store"
        })
        const response=await apiResponse.json();
        return response?.data;
    } catch (error) {
        console.log(error);
        return null
    }
}


const Blogs = async() => {
    const blogList=await fetchListOfBlogs();

    return (
        <BlogOverview blogList={blogList}/>
    )
}
export default Blogs