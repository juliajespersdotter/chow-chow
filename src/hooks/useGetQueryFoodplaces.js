import useStreamCollection from "./useStreamCollection";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const useQueryFoodplaces = (queryLimits) => {

    const collectionRef = collection(db, "foodplaces");

    const queryKey = ["foodplaces", queryLimits];

    let queryRef

    if (queryLimits.typeWhere === 'All') {
        queryRef = query(collectionRef, orderBy("name", "asc"))
    } else {
        queryRef = query(collectionRef, where("type", "==", queryLimits.typeWhere), orderBy("name", "asc"))
    }
}