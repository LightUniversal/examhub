import { useEffect, useRef, useState } from "react";
import "animate.css";
import { toast } from "react-toastify";
import { Form, Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "./Loader.js";

import React from "react";
import {
  FaBookReader,
  FaCommentAlt,
  FaEdit,
  FaFacebook,
  FaImage,
  FaMinus,
  FaPlus,
  FaRegBuilding,
  FaRunning,
  FaShareAlt,
  FaSignInAlt,
  FaThumbsUp,
  FaTrashAlt,
  FaTwitter,
  FaUser,
  FaUserAlt,
  FaUserPlus,
  FaWhatsapp,
} from "react-icons/fa";
import {
  useAddPostMutation,
  useGetAllPostQuery,
  useLikeAPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useCreateViewMutation,
} from "../slices/postApiSlice.js";
import {
  useGetUsersQuery,
  useAddRemoveFriendMutation,
} from "../slices/userApiSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice.js";

const Body = () => {
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [picturePath, setPicturePath] = useState("");
  const [notification, setNotification] = useState(true);

  const location = useLocation();
  const currentUrl = location.pathname;
  // console.log(currentUrl + "images/blogo.png");
  const showComments = useRef();

  const dispatch = useDispatch();

  const { data, isLoading, error, refetch } = useGetAllPostQuery();
  const { users, isLoading: loadingUsers, error: err } = useGetUsersQuery();
  const [addPost, { isLoading: loading, error: isError }] =
    useAddPostMutation();
  const [likePost, { isLoading: loadingLikes }] = useLikeAPostMutation();
  const [addRemoveFriend, { isLoading: loadingfriends }] =
    useAddRemoveFriendMutation();
  const [deletePost, { isLoading: loadingDeletePost }] =
    useDeletePostMutation();

  const [updatePost, { isLoading: isLoadingUpdatedPost }] =
    useUpdatePostMutation();
  const [createView, { isLoading: loadingViews }] = useCreateViewMutation();

  const navigate = useNavigate();
  const { userinfo } = useSelector((state) => state.auth);
  // if(  == null) {
  //   navigate("/")
  // }

  const addPostHandler = async (e) => {
    e.preventDefault();

    try {
      await addPost({
        description,
        picturePath,
        userId: userinfo._id,
      }).unwrap();
      refetch();
      setDescription("");

      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          new Notification(description + " from " + userinfo.name, {
            icon: "/images/blogo.png",
          });
        }
      });
      let notification;
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          notification =  new Notification(userinfo.name + " reacted to a post", {
            icon: "/images/blogo.png",
            
          });
        } else {
          notification.close();
        }
      });
    } catch (err) {
      toast.error(err?.data.message || err.message);
    }
  };

  const likePostHandler = async (id) => {
    const userId = userinfo._id;
    try {
      console.log(id, userId);
      await likePost({ id, userId });
      refetch();
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          new Notification(userinfo.name + " reacted to a post", {
            icon: "/images/blogo.png",
          });
        }
      });
      let notification;
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          notification = new Notification(userinfo.name + " reacted to a post", {
            icon: "/images/blogo.png",
          });
        } else {
          notification.close();
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const addRemoveFriendHandler = async (friendId) => {
    try {
      const res = await addRemoveFriend({
        userId: userinfo._id,
        friendId,
      });
      dispatch(setCredentials(res.data));
      refetch();
      if (userinfo.friends.includes(friendId)) {
        toast.success("Removed from friend List");
      } else {
        toast.success("Added to friend List");
      }
    } catch (error) {}
  };

  const deleteHandler = async (id) => {
    try {
      await deletePost(id);
      refetch();
      toast.success("Post deleted");
    } catch (error) {}
  };

  const updatePostHandler = async (description, id) => {
    setDescription(description);
    try {
      await updatePost({
        id,
        description,
        userId: userinfo._id,
      });
      toast.success("Post updated successfully");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
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
        e.target.view.value = "";
        Notification.requestPermission().then((perm) => {
          if (perm === "granted") {
            new Notification("New Comment " + comment, {
              icon: "/images/blogo.png",
            });
          }
        });
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "hidden") {
            setNotification(new Notification("New Comment " + comment), {
              icon: "/images/blogo.png",
            });
          } else {
            const notification = new Notification();
            notification.close();
          }
        });
      } else {
        toast.error("Please write your view");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteViewHandler = async (id, viewId) => {
    try {
      await deleteViewHandler(id, viewId);
      refetch();
      toast.success("View deleted successfully");
    } catch (error) {
      console.log("error");
    }
  };

  const toggleAccordion = (e) => {
    console.log(
      e.target.parentElement.parentElement.firstElementChild.nextElementSibling
        .nextElementSibling
    );
  };

  return (
    <>
      {userinfo ? (
        <div className="wrapper">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <h2>{error.message}</h2>
          ) : (
            <div className="mainbody mx-1.5">
              <div className="userpost py-4 shadow-sm px-3 rounded-md bg-white">
                <div className="userposts bg-white flex justify-between shadow-lg rounded-lg items-center w-full  py-4 px-3 ">
                  <div className="user mx-2">
                    {/* <img
                      src={userinfo.profile}
                      alt="user profile "
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                      className=" shadow-lg"
                    /> */}
                    <FaUser className=" text-slate-800 border relative -top-1 border-slate-500 text-4xl p-1 rounded-full" />
                  </div>
                  <div className="postinput w-4/5 mx-auto">
                    <Form
                      id="post"
                      className=""
                      onSubmit={(e) => addPostHandler(e)}
                    >
                      <textarea
                        type="text"
                        placeholder="what's on your mind? 
                        use # to include links"
                        className=" h-24 font-medium w-full p-4  text-white bg-slate-900 rounded shadow-lg postInput"
                        name="post"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ border: "none" }}
                      ></textarea>
                    </Form>
                  </div>
                </div>
                <div className="attachments py-2 flex justify-between relative -top-1  mt-2  ">
                  <div className="image">
                    {/* <input
                    type="file"
                    name="image"
                    id="image"
                    value={picturePath}
                    className=" bg-white absolute"
                    style={{ visibility: "hidden" }}
                    ref={fileElement}
                  /> */}
                    {/* <Link
                      to="/"
                      className=" flex items-center bg-slate-800 font-bold text-xs py-2 px-3 text-green-400 rounded shadow-sm"
                    >
                      <FaImage className=" align-middle mx-1 text-green-400" />
                      Image
                    </Link> */}
                  </div>
                  <div className="submitPost">
                    <button
                      type="submit"
                      className="submitbtn bg-slate-800 text-xs font-bold py-3 px-4 text-green-400 rounded shadow-sm"
                      onClick={(e) => addPostHandler(e)}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
              {/* Post */}
              {data.map((post) => (
                <div
                  className="posts bg-slate-100  shadow-lg px-4 py-5 my-4 rounded-md "
                  key={post._id}
                >
                  <div className="uppersection border bg-slate-200 border-slate-100 flex justify-between items-center shadow-sm shadow-slate-100 py-4 px-3 rounded-lg">
                    <div className="userdetails  flex items-center cursor-pointer">
                      {/* <img
                        src={`${currentUrl}${post.profile}`}
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      /> */}
                      <Link to={`/profile/${post.userId}`}>
                        <FaUser className=" text-slate-800 border border-slate-500 text-3xl p-1 rounded-full" />
                      </Link>
                      <Link to="#" className="details mx-2 relative">
                        <span className=" border px-3 py-2 rounded-sm text-xs inline-block mb-1 text-black font-bold shadow-md">
                          {post.name}{" "}
                          <small className=" mx-2 font-bold bg-white px-3 rounded-sm py-1">
                            {post.level} Level
                          </small>
                        </span>

                        <span className=" bg-gray-950 flex items-center px-3 py-2 text-xs rounded-sm text-white shadow-md">
                          <FaBookReader className=" text-green-100 mr-1" />{" "}
                          {post.department}
                        </span>
                      </Link>
                    </div>
                    <div className="addremovefriend ">
                      <Link
                        to={`https://www.facebook.com/${post.facebook}`}
                        className="userexists text-green-600 flex items-center"
                      >
                        <FaFacebook className=" relative text-black -right-2" />
                        <FaUserPlus className="addremovefriend text-4xl cursor-pointer bg-white text-green-500 p-2 rounded-full shadow-sm border" />
                      </Link>
                    </div>
                  </div>
                  <div className="textposted relative animate__animated animate__bounceIn  text-black  shadow-md  py-3 text-sm bg-white mt-3 rounded-lg px-2 font-medium">
                    <span className="inline-block bg-slate-200 w-full py-5 px-3 rounded text-slate-900 font-bold shadow-md ">
                      {post.description.slice(0, post.description.indexOf("#"))}

                      {post.description.includes("#") && (
                        <Link
                          to={post.description.slice(
                            Number(post.description.indexOf("#")) + 1,
                            post.description.length
                          )}
                          className="block mt-2 text-blue-700"
                        >
                          {post.description.slice(
                            post.description.indexOf("#"),
                            post.description.length
                          )}
                        </Link>
                      )}
                    </span>
                    <br />
                    <br />
                    <br />
                    <span className="date cursor-pointer absolute bottom-1 bg-slate-900 flex shadow-sm rounded items-center p-2 px-3 mt-2 text-white text-xs font-medium">
                      {post.createdAt}
                    </span>
                    {userinfo._id === post.userId && (
                      <div>
                        <span
                          onClick={() => deleteHandler(post._id)}
                          className="delete cursor-pointer absolute bottom-1 bg-slate-300 flex shadow-lg rounded-md right-1 items-center p-2 text-red-700 text-xs font-bold"
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
                  <div className="actions bg-slate-100 py-3 px-3 rounded-sm flex w-full mt-4 justify-between">
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
                    className="commentarea bg-white mt-1 p-1 rounded-lg relative"
                    onSubmit={(e) => createViewsHandler(e, post._id)}
                  >
                    <h6 className="flex items-center  text-black  text-xs -mb-0.5 mx-2  pt-5 border-b border-slate-200 p-1 font-bold">
                      Views <FaCommentAlt className="mx-2" />
                    </h6>
                    {/* {post.comments.length > 0 && (
                      <span className="absolute top-4 cursor-pointer text-xs bg-green-950 rounded-full p-1 right-4">
                        {isCollapsed ? (
                          <FaPlus
                            className="toggle plus text-white"
                            id={post._id}
                            onClick={(e) => toggleAccordion(e)}
                          />
                        ) : (
                          <FaMinus
                            className="toggle minus text-white"
                            id={post._id}
                            onClick={(e) => toggleAccordion(e)}
                          />
                        )}
                      </span>
                    )} */}
                    <div className="py-1 rounded-m">
                      {post.comments.map((comment, index) => (
                        <div
                          className="comment  relative  text-slate-300 text-xs px-2 py-0.5 rounded-lg"
                          key={index}
                          ref={showComments}
                          id={post._id}
                        >
                          <div className={post._id}>
                            <div className=" bg-slate-200 mb-1 border border-slate-300  shadow-inner px-2 rounded-md">
                              <p className=" flex items-center px-2 py-3  ">
                                {/* <img
                                  src={comment.user.profile}
                                  alt="user profile"
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                  }}
                                  className=" shadow-lg mx-1 border border-slate-950"
                                /> */}
                                <Link
                                  to={`/profile/${comment.user.id}`}
                                  className=""
                                >
                                  <FaUser className=" text-black border border-slate-500 text-3xl p-1 rounded-full" />
                                </Link>{" "}
                                <div className=" text-black font-bold  ml-1  py-3 px-1 ">
                                  {comment.comment.slice(
                                    0,
                                    comment.comment.indexOf("#")
                                  )}
                                  {comment.comment.includes("#") && (
                                    <Link
                                      to={comment.comment.slice(
                                        Number(comment.comment.indexOf("#")) +
                                          1,
                                        comment.comment.length
                                      )}
                                      className="block mt-2 text-blue-700"
                                    >
                                      {comment.comment.slice(
                                        comment.comment.indexOf("#"),
                                        comment.comment.length
                                      )}
                                    </Link>
                                  )}
                                </div>
                              </p>
                              <span className="relative text-xs rounded-sm text-black font-bold  -top-1 bg-slate-100 py-1 px-2">
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
                        className="flex py-3 px-2 w-full rounded text-black text-sm font-medium bg-slate-100 border border-slate-200"
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
          )}
        </div>
      ) : (
        <div className="redirect mt-4  flex items-center justify-between w-2/3 mx-auto">
          <Link
            to={"/login"}
            className=" bg-black p-3 rounded flex items-center text-white"
          >
            Login <FaSignInAlt className=" mx-2" />
          </Link>
          <Link
            to={"/register"}
            className=" bg-black p-3 rounded  flex items-center text-white"
          >
            Register <FaUserAlt className=" mx-2" />
          </Link>
        </div>
      )}
    </>
  );
};

export default Body;
