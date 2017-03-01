import * as fbConfig from './firebase.config';
import { auth, User as fbUser } from 'firebase';

export const Google = "google";

export type Provider = "google";

export interface IUser {
  displayName: string|null;
  email: string|null;
  photoURL: string|null;
}

class User implements IUser {
  get displayName() { return this._user.displayName; }
  get email() { return this._user.email; }
  get photoURL() { return this._user.photoURL; }

  constructor(private _user:fbUser) {

  }
}

class AuthService {
  private _user:User | null = null;
  get currentUser(): IUser | null { return this._user; }

  private authProviders = {
    [Google]: new auth.GoogleAuthProvider(),
  }

  // Add scopes, see https://developers.google.com/identity/protocols/googlescopes
  // authProviders[Google].addScope('https://www.googleapis.com/auth/plus.login');

  // add custom parameters, see https://firebase.google.com/docs/reference/js/firebase.auth.GoogleAuthProvider#setCustomParameters
  // authProviders[Google].setCustomParameters({
  //   'login_hint': 'user@example.com',
  // });

  login(provider:Provider):Promise<any> {
    return auth().signInWithRedirect(this.authProviders[provider])
      .then(()=>{
        console.log(`Redirecting to login for ${provider}`);
      })
      .catch((error:Error)=>{
        console.log("Sign-In Error!");
        console.log(error.message);
      });
  }

  logout():Promise<any> {
    return auth().signOut()
      .then(()=>{
        console.log("Successfully Signed Out");
      })
      .catch((error:Error)=>{
        console.log("Sign-Out Error!");
        console.log(error.message);
      });
  }

  private onAuthStateChanged(user:fbUser) {
    this._user = user ? new User(user) : null;
  }

  constructor() {
    auth().onAuthStateChanged(this.onAuthStateChanged);
    auth().getRedirectResult();
    // .then((result:auth.UserCredential)=>{
    //   if(result.credential) {
    //     // process any claim tokens
    //     const tokenProvider = result.credential.provider;
    //   }
    // })
  }
}

export const authService = new AuthService();
