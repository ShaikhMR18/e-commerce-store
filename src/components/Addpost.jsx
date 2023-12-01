import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPost, editPost } from "../redux/features/PostSlice";
import { useSelector } from "react-redux";
import { getData } from "../redux/features/UserSlice";

import Allpost from "./Allpost";

const Addpost = () => {
  const post = useSelector((state) => state.post);
  // const user = useSelector((state) => state.user.users);
  // console.log(user)
  console.log(post);
  const dispatch = useDispatch();
  const [postData, setPostData] = useState("");
  const [editData, setEditData] = useState(null);


  const datahandle = (d) => {
    console.log("data from child", d);
    setEditData(d);
  };

  useEffect(()=>{
    dispatch(getData())
  },[dispatch])
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost(postData));
    setPostData("");
  };
  const handleInutChange = (e) => {
    e.preventDefault();
    setPostData(e.target.value);
  };

  const editpost = (e) => {
    e.preventDefault();
    const data = { postid: editData?.postid, title: postData };
    dispatch(editPost(data));
    setPostData("");
  };

  // const Users = ()=>{
  //   return(
  //     <>
  //     {
  //       user?.map((obj)=>{
  //        return(
  //         <p>{obj?.title}</p>
  //        )  
  //       })
  //     }
  //     </>
  //   )
  // }
  return (
    <div style={{ margin: "0 auto", width: "50%" }}>
      <form>
        <label>whats ur feeling today</label>

        <input
          type="text"
          name="post"
          value={postData}
          placeholder={editData?.title}
          id=""
          onChange={handleInutChange}
        />

        {editData ? (
          <button onClick={editpost}>Update</button>
        ) : (
          <button onClick={handleSubmit}>Add</button>
        )}
      </form>
      <div>
        <Allpost data={post} fun={datahandle} />
      </div>
      {/* <div>
        {Users()}
      </div> */}
    </div>
  );
};

export default Addpost;
