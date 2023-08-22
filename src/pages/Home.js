import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import Sidebar from "../components/Sidebar";
import Video from "../components/Video";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { CategoryItems } from "../static/data";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVideos = async () => {
      const q = query(collection(db, "videos"));
      const unsubscribe = onSnapshot(q, (snapShot) => {
        setVideos(
          snapShot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
      return unsubscribe;
    };

    const unsubscribeFromAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });

    const unsubscribeVideos = fetchVideos();

    return () => {
      unsubscribeFromAuth();
      unsubscribeVideos();
    };
  }, [dispatch]);

  return (
    <>
      <Sidebar />
      <div className="w-[calc(100%-240px)]  h-[calc(100%-53px)] pt-16 bg-yt-black ml-60">
        <div className="flex flex-row px-3 overflow-x-scroll relative scrollbar-hide">
          {CategoryItems.map((item, i) => (
            <h2
              className="text-yt-white font-normal text-sm py-2 px-4 break-keep whitespace-nowrap bg-yt-light mr-3 cursor-pointer rounded-lg hover:bg-yt-light-1"
              key={i}
            >
              {item}
            </h2>
          ))}
        </div>

        <div className="pt-12 px-5 grid grid-cols-yt gap-x-3 gap-y-8">
          {videos.map((video) => (
            <Link to={`/video/${video.id}`} key={video.id}>
              <Video {...video} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home; 
