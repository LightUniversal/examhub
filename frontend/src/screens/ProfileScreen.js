import React, { useState, useRef } from "react";
import {
  FaCommentAlt,
  FaFacebook,
  FaPenAlt,
  FaThumbsUp,
  FaTrashAlt,
  FaTwitter,
  FaUserAlt,
  FaUser,
  FaWhatsapp,
  FaShareAlt,
  FaUserPlus,
} from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useGetPostByIdQuery,
  useCreateViewMutation,
  useDeletePostMutation,
  useLikeAPostMutation,


} from "../slices/postApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams,Form } from "react-router-dom";

const ProfileScreen = () => {
  const [comment, setComment] = useState("");
  const [name, setName] = useState();
  
  const { id } = useParams();

  const showComments = useRef();


  const { userinfo } = useSelector((state) => state.auth);

  const { data: data, isLoading, error, refetch } = useGetPostByIdQuery(id);
  const [createView, { isLoading: loadingViews }] = useCreateViewMutation();
  const [likePost, { isLoading: loadingLikes }] = useLikeAPostMutation();
  const [deletePost, { isLoading: loadingDeletePost }] =
    useDeletePostMutation();

  console.log(data);
  let likes, comments, impressions;
  if (data) {
    impressions = data.map((item) => {
      return [item.likes, item.comments];
    });
    likes = impressions[0][0];
    comments = impressions[0][1];
  }
  if(impressions) console.log(impressions[0])
    
  const deleteHandler = async (id) => {
    try {
      await deletePost(id);
      refetch();
      toast.success("Post deleted");
    } catch (error) {}
  };

  const createViewsHandler = async (e, id) => {
    e.preventDefault();

    try {
      if (comment !== "") {
        await createView({
          id: id,
          comment: comment,
        }).unwrap();
        refetch();
        toast.success("View Submitted");
        e.target.view.value = "";
      } else {
        toast.error("Please write your view");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const likePostHandler = async (id) => {
    const userId = userinfo._id;
    try {
      console.log(id, userId);
      await likePost({ id, userId });
      refetch();
      toast.success("You reacted to this post");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      {!isLoading && (
        <div className="posts text-slate-300 w-2/5 mx-auto">
          <div className="top">
            <div className="user">
              <div className="flex items-center bg-slate-900 px-2 py-3 mx-2 rounded">
                <FaUserAlt className=" text-3xl border mr-2 border-slate-300 rounded-full p-1" />
                <span className="username text-slate-300">{data[0].name}</span>
              </div>
              <div className="userdetails flex items-center justify-between mx-2 border-b border-slate-700 py-3">
                <span className="flex items-center bg-slate-900 text-xs px-2 py-2 rounded">
                  Number of Posts <FaPenAlt className=" mx-2 text-green-600" />
                </span>
                <span className="postno text-green-600 text-xs font-bold bg-slate-800 py-2 px-2 rounded">
                  {data.length} Posts
                </span>
              </div>
            </div>
          </div>
          <div className="socials mx-2 py-3">
            <h4 className=" text-slate-300 bg-slate-900 text-xs px-2 py-2 rounded">
              Social Profiles
            </h4>
            <Link
              to={data[0].twitter}
              className="twitter flex items-center text-green-600 border-b border-slate-700 py-2 mx-1 my-1"
            >
              <FaTwitter className=" text-2xl border border-slate-800 mr-2 rounded-full p-1" />
              <span className="text-xs font-bold">{data[0].twitter}</span>
            </Link>
            <div className="facebook flex items-center">
              {/* <FaFacebook />
              <span>{data[0].facebook}</span> */}
            </div>
          </div>
          <div className="impressions">
            <div className="likes flex my-2 justify-between items-center border-b border-slate-700 mx-2 py-2">
              <span className="bg-slate-900 text-xs px-2 py-2 rounded">
                Number of likes
              </span>
              <span className="flex items-center font-bold text-green-600 text-xs bg-slate-800 py-2 px-2 rounded ">
                <FaThumbsUp className="mx-1" />
                {Number(likes.length) * Number(data.length)} likes
              </span>
            </div>
            <div className="postsdetails flex my-2 justify-between items-center border-b border-slate-700 mx-2 py-2">
              <span className="bg-slate-900 text-xs px-2 py-2 rounded">
                user comments on posts
              </span>
              <span className="flex items-center  font-bold text-green-600 text-xs bg-slate-800 py-2 px-2 rounded">
                <FaCommentAlt className="mx-1" />
                {Number(comments.length) * Number(data.length)} comments
              </span>
            </div>
          </div>
          <div className="posts">
            {data.map((post) => (
              <div
                className="posts bg-black px-4 py-5 my-4 rounded-2xl "
                key={post._id}
              >
                <div className="uppersection flex justify-between items-center shadow-sm shadow-slate-900 py-3 px-3 rounded-lg">
                  <div className="userdetails  flex items-center cursor-pointer">
                    <Link to={`/profile/${post.userId}`}>
                      <FaUser className=" text-white border border-slate-500 text-3xl p-1 rounded-full" />
                    </Link>
                    <Link
                      to={`https://twitter.com/${post.twitter}`}
                      className="details mx-2 relative"
                    >
                      <span className=" bg-slate-950 px-2 py-1 rounded-sm text-xs inline-block mb-1 text-white shadow-md">
                        {post.name}
                      </span>

                      <span className=" bg-gray-950 flex items-center px-2 py-1 text-xs rounded-sm text-slate-400 shadow-md">
                        <FaTwitter className=" text-green-100 mr-1" />{" "}
                        {post.twitter}
                      </span>
                    </Link>
                  </div>
                  <div className="addremovefriend ">
                    <Link
                      to={`https://www.facebook.com/${userinfo.facebook}`}
                      className="userexists text-green-600 flex items-center"
                    >
                      <FaFacebook className=" relative -right-2" />
                      <FaUserPlus className="addremovefriend text-4xl cursor-pointer bg-slate-800 text-green-500 p-2 rounded-full shadow-sm" />
                    </Link>
                  </div>
                </div>
                <div className="textposted relative animate__animated animate__bounceIn  text-black  shadow-md  py-3 text-sm bg-gray-900 mt-3 rounded-lg px-2 font-medium">
                  <span className="inline-block bg-slate-900 w-full py-3 px-2 rounded text-slate-300 font-medium shadow-md ">
                    {post.description}
                  </span>
                  <br />
                  <br />
                  <br />
                  <span className="date cursor-pointer absolute bottom-1 bg-gray-800 flex shadow-sm rounded items-center p-2 text-white text-xs font-medium">
                    {post.createdAt}
                  </span>
                  {userinfo._id === post.userId && (
                    <div>
                      <span
                        onClick={() => deleteHandler(post._id)}
                        className="delete cursor-pointer absolute bottom-1 bg-gray-800 flex shadow-lg rounded-md right-1 items-center p-2 text-red-700 text-xs font-bold"
                      >
                        <FaTrashAlt />
                      </span>
                    </div>
                  )}
                </div>
                <div className="imagePosted -my-1">
                  {/* <img
                  src="/images/Lu.jpg"
                  className="shadow-md bg-green-50 rounded-2xl"
                  alt="photo posted"
                  style={{ width: "100%", height: "100%" }}
                /> */}
                </div>
                <div className="actions bg-slate-900 py-3 px-3 rounded-md flex w-full mt-2 justify-between">
                  <Form className="flex">
                    {post.likes.includes(userinfo._id) ? (
                      <span
                        className=" bg-slate-800 cursor-pointer flex shadow-md rounded-md items-center p-2 text-green-700 text-xs font-bold"
                        onClick={() => {
                          likePostHandler(post._id);
                        }}
                      >
                        <FaThumbsUp className=" mx-1 " /> {post.likes.length}
                      </span>
                    ) : (
                      <span
                        className=" bg-slate-800 cursor-pointer flex shadow-md rounded-md items-center p-2 text-white text-xs font-bold"
                        onClick={() => {
                          likePostHandler(post._id);
                        }}
                      >
                        <FaThumbsUp className=" mx-1 " /> {post.likes.length}
                      </span>
                    )}
                    {post.comments.length > 0 ? (
                      <span className=" mx-2 bg-slate-800 flex shadow-md rounded-md items-center p-2 text-green-700 text-xs font-bold">
                        <FaCommentAlt className=" mx-1" />
                        {post.comments.length}
                      </span>
                    ) : (
                      <span className=" mx-2 bg-slate-800 flex shadow-md rounded-md items-center p-2 text-white text-xs font-bold">
                        <FaCommentAlt className=" mx-1" />
                        {post.comments.length}
                      </span>
                    )}
                  </Form>
                  <div className="share bg-slate-800 flex shadow-md rounded-md items-center text-white text-xs font-bold relative -right-2">
                    <Link
                      className="flex items-center p-2"
                      to={`whatsapp://send?text=${post.description}`}
                      data-action="share/whatsapp/share"
                    >
                      <FaShareAlt className=" mx-1" /> share{" "}
                      <FaWhatsapp className="mx-1 font-bold text-green-500" />
                    </Link>
                  </div>
                </div>
                {/* comment box */}
                <Form
                  className="commentarea bg-slate-900 mt-1 p-1 rounded-lg relative"
                  onSubmit={(e) => createViewsHandler(e, post._id)}
                >
                  <h6 className="flex items-center  text-slate-300  text-xs -mb-0.5 mx-2  pt-5 border-b border-slate-800 p-1">
                    Views <FaCommentAlt className="mx-2" />
                  </h6>

                  <div className="py-1 rounded-m">
                    {post.comments.map((comment, index) => (
                      <div
                        className="comment  relative  text-slate-300 text-xs px-2 py-0.5 rounded-lg"
                        key={index}
                        ref={showComments}
                        id={post._id}
                      >
                        <div className={post._id}>
                          <div className=" bg-slate-800 mb-1 border border-slate-800  shadow-inner px-2 rounded-md">
                            <p className=" flex items-center px-2 py-3  ">
                              <Link
                                to={`/profile/${comment.user.id}`}
                                className=""
                              >
                                <FaUser className=" text-white border border-slate-500 text-3xl p-1 rounded-full" />
                              </Link>{" "}
                              <div className="  ml-1  py-3 px-1 ">
                                {comment.comment}
                              </div>
                            </p>
                            <span className="relative text-xs rounded-sm  -top-1 bg-slate-900 py-1 px-2">
                              From {comment.user.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="textarea -mt-1 px-2 py-1 w-full h-26">
                    <textarea
                      name="view"
                      id="view"
                      placeholder="comment on the post"
                      className="flex py-3 px-2 w-full rounded text-slate-400 text-sm font-medium bg-slate-950 border border-slate-900"
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button
                      type="submit"
                      className="flex rounded items-center text-white text-xs mt-1 mb-1 bg-slate-800 py-2 px-2 font-medium shadow-md"
                    >
                      comment
                      <FaCommentAlt className="text-white mx-1 align-base" />
                    </button>
                  </div>
                </Form>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
