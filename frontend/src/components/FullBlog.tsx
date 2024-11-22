import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog}: {blog: Blog}) => {
    return <div >
        <Appbar></Appbar>
        <div className="flex justify-center">
    <div className="grid grid-cols-12 px-20 w-full pt-200 max-w-screen-2xl pt-12">
        <div className=" col-span-8">
<div className="text-5xl font-extrabold ">
{blog.title}
</div>
<div className="text-slate-500 pt-2">
    Post on 3 Dec
</div>
<div className="pt-4">
                {blog.content}
            </div>

        </div>
        <div className="col-span-4 text-slate-500 text-lg">
        Author
        <div className="flex w-full">
            <div className="pr-4 flex flex-col justify-center">
                <Avatar name= { blog.author.name || "Anonymus" }/>
            </div>
            <div>
            <div className="font-bold">
          {blog.author,name || "Anonymus"}
          </div>
<div className ="text-slate-400 pt-2">
    Hi lets Read Together
</div>
            </div>
 
        </div>
    
        </div>
    
    </div>
    </div>
    </div>
}