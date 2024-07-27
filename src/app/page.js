import Link from "next/link"

const Home = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Browse our Blog collection
        </h1>
        <Link
          href={"/blogs"}
          className="bg-white text-sm text-blue-600 font-semibold py-2 px-6 rounded"
        >
          Explore Blogs
        </Link>
      </div>
    </div>
  );
}
export default Home