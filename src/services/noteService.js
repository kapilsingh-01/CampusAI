import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    query,
    where
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const noteCollection = collection(db, "notes");

export async function getNotes(uid){

    const q=query(
        noteCollection,
        where("uid","==",uid)
    );

    const snapshot=await getDocs(q);

    return snapshot.docs.map(doc=>({

        id:doc.id,

        ...doc.data()

    }));

}

export async function addNote(data){

    await addDoc(noteCollection,data);

}

export async function deleteNote(id){

    await deleteDoc(doc(db,"notes",id));

}