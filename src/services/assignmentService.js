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

const assignmentCollection = collection(db, "assignments");

export async function getAssignments(uid) {

    const q = query(
        assignmentCollection,
        where("uid", "==", uid)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

}

export async function addAssignment(data) {

    await addDoc(
        assignmentCollection,
        data
    );

}

export async function deleteAssignment(id) {

    await deleteDoc(
        doc(db, "assignments", id)
    );

}