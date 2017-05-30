import { auth as fbAuth } from "firebase";
import { auth } from "../server/firebase.config";
import Vuex from "vuex";

export interface IUser {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    providerId: string;
    uid: string;
}

export interface IAuthState {
    authState: string;
    user: IUser | null;
    initialized: boolean;
}

export class AuthModule<RootState> implements Vuex.Module<IAuthState, RootState> {
    namespaced:boolean = true;

    private firebaseLogin(provider: fbAuth.AuthProvider): Promise<any> {
        return auth.signInWithRedirect(provider);
    }

    private LoginGoogle(): Promise<any> {
        const provider:fbAuth.GoogleAuthProvider = new fbAuth.GoogleAuthProvider();
        return this.firebaseLogin(provider);
    }

    getters:Vuex.GetterTree<IAuthState, RootState> = {
        isAuthenticated: (state:IAuthState):boolean => {
            return state.authState === "authenticated" && state.initialized;
        },

        isPending: (state:IAuthState):boolean => {
            return state.authState === "pending" || !state.initialized;
        },

        isUnauthenticated: (state:IAuthState):boolean => {
            return state.authState === "unauthenticated" && state.initialized;
        }
    };

    actions: Vuex.ActionTree<IAuthState, RootState> = {
        initAuthStatus: async ({commit, state}):Promise<any> => {
            if(!state.initialized) {
                commit("setAuthStatus", "pending");
                try {
                    const authResult:fbAuth.UserCredential = await auth.getRedirectResult();
                    if(authResult && authResult.user) {
                        commit("setUser", authResult.user);
                        commit("setAuthStatus", "authenticated");
                    } else {
                        commit("setAuthStatus", "unauthenticated");
                    }
                    commit("setInitialized");
                } catch(exception) {
                    console.error("Login Error");
                    commit("setAuthStatus", "unauthenticated");
                }
            } else {
                console.warn("Authentication system already initialized");
            }
        },

        login: ({getters, commit}, provider: string):Promise<any> => {
            if(getters.isAuthenticated) {
                throw new Error("User is already authenticated");
            } else {
                commit("setAuthStatus", "pending");
                switch(provider) {
                    case "google": return this.LoginGoogle();
                    default: throw new Error(`${provider} is not a valid identity provider`);
                }
            }
        },

        logout: async ({getters, commit}):Promise<any> => {
            if(getters.isAuthenticated) {
                commit("setAuthStatus", "pending");
                try {
                    await auth.signOut();
                } catch(error) {
                    console.error("Error logging out, forcing logout");
                }
                commit("setAuthStatus", "unauthenticated");
                commit("setUser", null);
            }
        }
    };

    mutations: Vuex.MutationTree<IAuthState> = {
        setAuthStatus: (state:IAuthState, authStatus: string) => {
            console.log(`authStatus = ${authStatus}`);
            state.authState = authStatus;
        },

        setUser: (state:IAuthState, user: IUser | null) => {
            state.user = user;
        },

        setInitialized: (state:IAuthState) => {
            console.log("setInitialized called");
            state.initialized = true;
        }
    };
}

// interface IUser {
//     displayName: string | null;
//     email: string | null;
//     photoURL: string | null;
//     providerId: string;
//     uid: string;
// }

// type AuthenticationState = "uninitialized" | "initializing" | "anonymous" | "authenticated" | "logging-out";

// interface IAuthState {
//     authenticationStatus: AuthenticationState;
//     currentUser: IUser | null;
// }

// const defaultAuthState:IAuthState = {authenticationStatus:"uninitialized", currentUser: null};


// class AuthModule<RootState> implements Vuex.Module<IAuthState, RootState> {
//     static readonly initialize = "initialize";
//     static readonly setAuthStatus = "setAuthStatus";
//     static readonly login = "login";
//     static readonly logout = "logout";
//     private resolveInitPromise: (r:IAuthState)=>void;
//     private rejectInitPromise: (e?:any)=>void;
//     private initializedPromise: Promise<IAuthState>;

//     private createInitializedPromise(): void {
//         this.initializedPromise = new Promise<IAuthState>((resolve, reject)=> {
//             this.resolveInitPromise = resolve;
//             this.rejectInitPromise = reject;
//         });
//     }

//     state: IAuthState;

//     getters: Vuex.GetterTree<IAuthState, RootState> = {
//         isAuthenticated(state:IAuthState):boolean {
//             return state.authenticationStatus === "authenticated";
//         },

//         isAnonymous(state:IAuthState): boolean {
//             return state.authenticationStatus === "anonymous";
//         },

//         isInitialized(state:IAuthState): boolean {
//             return state.authenticationStatus !== "uninitialized" && state.authenticationStatus !== "initializing";
//         },

//         "initializedPromise": (state:IAuthState):Promise<IAuthState> => {
//             return this.initializedPromise;
//         }
//     };

//     actions: Vuex.ActionTree<IAuthState, RootState> = {
//         [AuthModule.initialize]: ({state, commit}): Promise<string> => {
//             return new Promise<string>((resolve, reject)=> {
//                 if(state.authenticationStatus === "uninitialized") {
//                     commit(AuthModule.setAuthStatus, "initializing");
//                     auth.getRedirectResult()
//                     .then((userCredential:fbAuth.UserCredential)=> {
//                         console.log("here", userCredential.user);
//                         commit(AuthModule.login, userCredential.user);
//                         console.log("here1", userCredential.user);
//                         if(userCredential.user) {
//                             console.log("here2", userCredential.user);
//                             commit(AuthModule.setAuthStatus, "authenticated");
//                         } else {
//                             console.log("here3", userCredential.user);
//                             commit(AuthModule.setAuthStatus, "anonymous");
//                         }
//                     console.log("here4", userCredential.user);
//                         this.resolveInitPromise(state);
//                     console.log("here5", userCredential.user);
//                         resolve(state.authenticationStatus);
//                     })
//                     .catch((e)=> {
//                         commit(AuthModule.setAuthStatus, "uninitialized");
//                         this.rejectInitPromise();
//                         this.createInitializedPromise();
//                         reject(e);
//                     });
//                 } else {
//                     resolve(state.authenticationStatus);
//                 }
//             });
//         },

//         [AuthModule.logout]: ({commit, getters}):void => {
//             if(getters.isAuthenticated) {
//                 commit(AuthModule.setAuthStatus, "logging-out");
//                 auth.signOut()
//                 .then(()=>{
//                     commit(AuthModule.logout);
//                     commit(AuthModule.setAuthStatus, "anonymous");
//                 })
//                 .catch(e=>{
//                     commit(AuthModule.setAuthStatus, "authenticated");
//                 });
//             } else {
//                 console.error(`Only authenticated users can logout`);
//             }
//         },

//         [AuthModule.login]: ({getters}, provider:string):Promise<any> => {
//             return new Promise<any>((resolve, reject)=> {
//                 if(getters.isAnonymous) {
//                     if(provider) {
//                         switch(provider) {
//                             case "google":
//                             case "facebook":
//                             case "twitter":
//                             // case "github":
//                             return auth.signInWithRedirect(this._authProviders[provider]);
//                         }
//                     } else {
//                         reject(`"${provider}" is an invalid login provider`);
//                     }
//                 } else {
//                     reject(`Only anonymous users can login`);
//                 }
//             });
//         },
//     };

//     mutations: Vuex.MutationTree<IAuthState> = {
//         [AuthModule.logout]: (state:IAuthState) => {
//             state.currentUser = null;
//         },

//         [AuthModule.login]: (state:IAuthState, user:fbUser|null)=> {
//             console.log("logging in", user);
//             state.currentUser = user;
//         },

//         [AuthModule.setAuthStatus]: (state:IAuthState, status:AuthenticationState)=> {
//             state.authenticationStatus = status;
//         }
//     };

//     private _authProviders = {
//         google: new fbAuth.GoogleAuthProvider(),
//         facebook: new fbAuth.FacebookAuthProvider(),
//         twitter: new fbAuth.TwitterAuthProvider()
//     };

//     constructor(defaultState: IAuthState|null = null) {
//         this.state = defaultState || defaultAuthState;
//         this.createInitializedPromise();
//     }
// }

// export {AuthModule, IAuthState, IUser, defaultAuthState}
