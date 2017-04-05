import { auth as fbAuth, User as fbUser } from 'firebase';
import { auth } from '../server/firebase.config';
import router from '../router';
import Vuex from 'vuex';

interface IUser {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    providerId: string;
    uid: string;
}

type AuthenticationState = "unchecked" | "checking" | "anonymous" | "authenticated" | "logging-out";

interface IAuthState {
    authenticationStatus: AuthenticationState;
    currentUser: IUser | null;
}

class AuthModule<RootState> implements Vuex.Module<IAuthState, RootState> {
    static readonly getRedirectStatus = "getRedirectStatus";
    static readonly setAuthStatus = "setAuthStatus";
    static readonly login = "login";
    static readonly logout = "logout";

    state: IAuthState;

    getters: Vuex.GetterTree<IAuthState, RootState> = {
        isAuthenticated(state:IAuthState):boolean {
            return state.authenticationStatus === "authenticated";
        },

        isAnonymous(state:IAuthState): boolean {
            return state.authenticationStatus === "anonymous";
        }
    }

    actions: Vuex.ActionTree<IAuthState, RootState> = {
        [AuthModule.logout]: ({commit, getters}):void => {
            if(getters.isAuthenticated) {
                commit(AuthModule.setAuthStatus, "logging-out");
                auth.signOut()
                .then(()=>{
                    commit(AuthModule.logout);
                    commit(AuthModule.setAuthStatus, "anonymous");
                })
                .catch(e=>{
                    commit(AuthModule.setAuthStatus, "authenticated");
                });
            } else {
                console.error(`Only authenticated users can logout`);
            }
        },

        [AuthModule.login]: ({commit, getters}, provider:string):void => {
            if(getters.isAnonymous) {
                if(provider) {
                    switch(provider) {
                        case "google":
                        auth.signInWithRedirect(this._authProviders[provider]);
                        break;
                    }
                } else {
                    console.error(`"${provider}" is an invalid login provider`);
                }
            } else {
                console.error(`Only anonymous users can login`);
            }
        },

        [AuthModule.getRedirectStatus]: ({commit, state, dispatch}):Promise<any> => {
            return new Promise<any>((resolve, reject)=> {
                if(state.authenticationStatus == "unchecked") {
                    commit(AuthModule.setAuthStatus, "checking");
                    auth.getRedirectResult()
                    .then((user:fbAuth.UserCredential)=> {
                        console.log("user", user ? "user.displayName" : "null");
                        commit(AuthModule.login, user);
                        if(user) {
                            commit(AuthModule.setAuthStatus, "authenticated");
                        } else {
                            commit(AuthModule.setAuthStatus, "anonymous");
                        }
                        resolve();
                    })
                    .catch((e)=>{
                        commit(AuthModule.setAuthStatus, "unchecked");
                        reject(e);
                    });
                } else {
                    reject(`Action ${AuthModule.getRedirectStatus} has already been called.`);
                }
            });
        }
    }

    mutations: Vuex.MutationTree<IAuthState> = {
        [AuthModule.logout]: (state:IAuthState) => {
            state.currentUser = null;
        },

        [AuthModule.login]: (state:IAuthState, user:fbUser|null)=> {
            state.currentUser = user;
        },

        [AuthModule.setAuthStatus]: (state:IAuthState, status:AuthenticationState)=> {
            state.authenticationStatus = status;
        }
    }

    private _authProviders = {
        google: new fbAuth.GoogleAuthProvider(),
        facebook: new fbAuth.FacebookAuthProvider(),
        twitter: new fbAuth.TwitterAuthProvider()
    }

    constructor(defaultState: IAuthState|null = null) {
        this.state = defaultState || {authenticationStatus:"unchecked", currentUser: null};
    }
}

export {AuthModule, IAuthState, IUser}
