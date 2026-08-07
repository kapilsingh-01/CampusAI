import {
collection,
addDoc,
getDocs,
deleteDoc,
doc,
query,
where
}
from "firebase/firestore";

import { db } from "../firebase/firebase";

const attendanceCollection=collection(db,"attendance");

export async function getAttendance(uid){

const q=query(
attendanceCollection,
where("uid","==",uid)
);

const snapshot=await getDocs(q);

return snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}));

}

export async function addAttendance(data){

await addDoc(attendanceCollection,data);

}

export async function deleteAttendance(id){

await deleteDoc(doc(db,"attendance",id));

}