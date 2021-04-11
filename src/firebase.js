import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const auth = firebase.auth();
const firestore = firebase.firestore();

const createUserDocument = async (user, data) => {
    if (!user) return;

    const userRef = firestore.doc(`users/${user.uid}`);

    const snapshot = await userRef.get();

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
        firebase.database().ref('users/' + user.uid).once("value", snap => {
            console.log(snap.val())
        })
        }
    })

    if (!snapshot.exists) {
        const {email} = user;
        const {displayName} = additionalData;

        try {
            await userRef.set({
                displayName,
                email,
                createdAt: new Date(),
            });
        } catch (error) {
            console.log("Error creating user", error);
        }
    }
};