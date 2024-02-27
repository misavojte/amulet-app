import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set, get } from "firebase/database";
import { getAuth, signInAnonymously } from "firebase/auth";
import type { DbData, LeaderboardEntry, LeaderboardEntryBase, TimestampEntryObject, TimestampEntryUrl } from '$lib';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtOIPKMGBXppk3hDRILvPeOvVmS0ox3II",
  authDomain: "amuletapp-30f43.firebaseapp.com",
  databaseURL: "https://amuletapp-30f43-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "amuletapp-30f43",
  storageBucket: "amuletapp-30f43.appspot.com",
  messagingSenderId: "982241976780",
  appId: "1:982241976780:web:f77fc3003e67eaeff7fd69",
  measurementId: "G-41RKJZ3K39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/*export const writeRoundData = (
  round: number,
  scenario: string,
  repeat: number,
  score: number,
  userId: string,
  timestamp: number,
  timediff: number,
  isAmulet: boolean,
  isWin: boolean,
  boxId: number,
  ) => {
  const roundsRef = ref(db, 'rounds/');
  const newRoundRef = push(roundsRef);
  set(newRoundRef, { 
    round: round,
    scenario: scenario,
    repeat: repeat,
    score: score,
    userId: userId,
    timestamp: timestamp,
    timediff: timediff,
   })
    .then(() => {
      console.log('Round data saved successfully!');
    })
    .catch((error) => {
      console.error('Error saving round data: ', error);
    });
}*/

export const writeRoundData = (data: DbData) => {
  const roundsRef = ref(db, 'rounds/');
  const newRoundRef = push(roundsRef);
  set(newRoundRef, data)
    .then(() => {
      console.log('Round data saved successfully!');
    })
    .catch((error) => {
      console.error('Error saving round data: ', error);
    });
}

/**
 * In FireBase, saved in: db/timestamps/{url}/{userId}/{userName}
 */
export const writeTimestamp = (data: TimestampEntryObject, urlObject: TimestampEntryUrl): Promise<void> => {
  // replace all dots with underscores in urlObject.url
  urlObject.url = urlObject.url.replaceAll('.', '_');
  const timestampRef = ref(db, 'timestamps/' + urlObject.url + '/' + urlObject.userId + '/' + urlObject.userName + '/');
  const newTimestampRef = push(timestampRef);
  return new Promise((resolve, reject) => {
    set(newTimestampRef, data)
      .then(() => {
        console.log('Timestamp saved successfully!');
        resolve();
      })
      .catch((error) => {
        console.error('Error saving timestamp: ', error);
        reject(error);
      });
  });
}



const auth = getAuth();

export const getAuthAnonymousUser = async () : Promise<string> => {
  try {
    await signInAnonymously(auth);
    const user = auth.currentUser;
    if (user) {
      return user.uid;
    } else {
      throw new Error("User is null");
    }
  } catch (error) {
    console.error("Anonymous Sign-In Error: ", error);
    throw error; // Consider handling the error differently depending on your use case
  }
}

// get first 10 entries from leaderboard (LeaderboardEntryBase[])
// TODO: refactor
export const getLeaderboard = async () : Promise<LeaderboardEntryBase[]> => {
  const leaderboardRef = ref(db, 'leaderboard/');
  const leaderboardSnapshot = await get(leaderboardRef);
  const leaderboardData = leaderboardSnapshot.val();
  if (leaderboardData === null) {
    return [];
  }
  const leaderboardEntries: LeaderboardEntry[] = Object.values(leaderboardData);
  leaderboardEntries.sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.score - a.score);
  return leaderboardEntries.slice(0, 10);
}

export const writeLeaderboardEntry = (entry: LeaderboardEntry) => {
  const leaderboardRef = ref(db, 'leaderboard/');
  const newLeaderboardRef = push(leaderboardRef);
  set(newLeaderboardRef, entry)
    .then(() => {
      console.log('Leaderboard entry saved successfully!');
    })
    .catch((error) => {
      console.error('Error saving leaderboard entry: ', error);
    });
}