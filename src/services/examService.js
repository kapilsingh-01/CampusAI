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

const examCollection=collection(db,"exams");

export async function getExams(uid){

const q=query(
examCollection,
where("uid","==",uid)
);

const snapshot=await getDocs(q);

return snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}));

}

export async function addExam(data){

await addDoc(examCollection,data);

}

export async function deleteExam(id){

await deleteDoc(doc(db,"exams",id));

}