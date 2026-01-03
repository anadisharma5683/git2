import { useState, useEffect, useRef } from 'react';
import { 
  Query, 
  DocumentData, 
  onSnapshot, 
  QuerySnapshot,
  Unsubscribe
} from 'firebase/firestore';

interface FirestoreQueryResult<T = DocumentData> {
  data: T[] | null;
  loading: boolean;
  error: Error | null;
}

export function useFirestoreQuery<T = DocumentData>(query: Query<T>): FirestoreQueryResult<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Use ref to store the unsubscribe function to prevent unnecessary re-renders
  const unsubscribeRef = useRef<Unsubscribe | null>(null);

  useEffect(() => {
    // Clean up previous subscription if exists
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }

    setLoading(true);
    setError(null);

    try {
      // Set up the real-time listener
      unsubscribeRef.current = onSnapshot(
        query,
        (snapshot: QuerySnapshot<T>) => {
          const documents: T[] = [];
          snapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() } as T);
          });
          setData(documents);
          setLoading(false);
        },
        (err) => {
          console.error('Firestore query error:', err);
          setError(err);
          setLoading(false);
        }
      );
    } catch (err) {
      console.error('Error setting up Firestore query listener:', err);
      setError(err as Error);
      setLoading(false);
    }

    // Clean up the listener when component unmounts
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [query]);

  return { data, loading, error };
}