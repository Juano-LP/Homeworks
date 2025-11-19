import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";

import { setUser, clearUser } from "./store/slices/authSlice";
import { setPosts } from "./store/slices/postsSlice";
import { setNotifications } from "./store/slices/notificationsSlice";
import { setQueue } from "./store/slices/dmQueueSlice";

import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/register.jsx";
import Posts from "./components/Posts";
import NotificationsPanel from "./components/NotificationsPanel";
import DMQueuePanel from "./components/DMQueuePanel";
import "./App.css";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const { posts } = useSelector((s) => s.posts);
  const { stack: notifications } = useSelector((s) => s.notifications);
  const { queue: dmQueue } = useSelector((s) => s.dmQueue);

  
  const saveSnapshot = async (uid, snapshot) => {
    if (!uid) return;
    try {
      await setDoc(doc(db, "snapshots", uid), snapshot, { merge: true });
    } catch (err) {
      console.error("Error guardando snapshot:", err);
    }
  };


  useEffect(() => {
    const uid = user?.uid;
    if (!uid) return;

    const snapshot = {
      posts,
      notifications,
      dmQueue,
      updatedAt: new Date().toISOString(),
    };

    saveSnapshot(uid, snapshot);
  }, [user, posts, notifications, dmQueue]);


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setUser({ uid: user.uid, email: user.email }));

        const ref = doc(db, "snapshots", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          if (data.posts) dispatch(setPosts(data.posts));
          if (data.notifications) dispatch(setNotifications(data.notifications));
          if (data.dmQueue) dispatch(setQueue(data.dmQueue));
        } else {
          await setDoc(ref, { posts: [], notifications: [], dmQueue: [] });
        }
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsub();
  }, [dispatch]);

  return (
    <>
      <Header />
      <main style={{ padding: 20 }}>
        <Routes>
          <Route
            path="/"
            element={user ? <Posts /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notifications" element={<NotificationsPanel />} />
          <Route path="/dm-queue" element={<DMQueuePanel />} />
        </Routes>
      </main>
    </>
  );
}
