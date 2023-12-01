import { useDispatch } from "react-redux";
import { deletePost } from "../redux/features/PostSlice";

const Allpost = ({ data, fun }) => {
  const dispatch = useDispatch();

  const allPost = data.map((post) => (
    <div key={post.postid}>
      {/* <h3>postID: {post.postid}</h3> */}

      <>
        <p>Description: {post.title}</p>
        <div style={{ display: "flex", justifyContent: "start" }}>
          <button
            style={{
              width: "70px",
              height: "30px",
              padding: "5px 10px",
              backgroundColor: "white",
              border: "none",
              outline: "none",
              fontWeight: "700",
            }}
            onClick={() => dispatch(deletePost(post.postid))}
          >
            Delete
          </button>
          <button
            style={{
              width: "70px",
              height: "30px",
              padding: "5px 10px",
              backgroundColor: "white",
              border: "none",
              outline: "none",
              marginLeft: "10px",
              fontWeight: "700",
            }}
            onClick={() => fun(post)}
          >
            Edit
          </button>
        </div>
      </>
    </div>
  ));

  return (
    <div>
      <div
        style={{
          width: "50%",
          backgroundColor: "gray",
          color: "white",
          marginTop: "20px",
          padding: "10px 15px",
        }}
      >
        {allPost}
      </div>
    </div>
  );
};

export default Allpost;
