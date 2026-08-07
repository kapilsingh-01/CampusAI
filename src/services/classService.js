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

const classCollection = collection(db, "classes");

export async function getClasses(uid) {

    const q = query(
        classCollection,
        where("uid", "==", uid)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));

}

export async function addClass(data) {

    await addDoc(classCollection, data);

}

export async function deleteClass(id) {

    await deleteDoc(
        doc(db, "classes", id)
    );

}