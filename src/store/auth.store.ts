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
    authStatus: string;
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

    state:IAuthState = {
        authStatus: "undefined",
        user: null,
        initialized: false
    }

    getters:Vuex.GetterTree<IAuthState, RootState> = {
        isAuthenticated(state:IAuthState):boolean {
            return state.authStatus === "authenticated" && state.initialized;
        },

        isPending(state:IAuthState):boolean {
            return state.authStatus === "pending" || !state.initialized;
        },

        isUnauthenticated(state:IAuthState):boolean {
            return state.authStatus === "unauthenticated" && state.initialized;
        }
    };

    actions: Vuex.ActionTree<IAuthState, RootState> = {
        initAuthStatus: async ({commit, state}):Promise<any> => {
            commit("setAuthStatus", "pending");
            try {
                const authResult:fbAuth.UserCredential = await auth.getRedirectResult();
                if(authResult && authResult.user) {
                    const {displayName, email, photoURL, providerId, uid} = authResult.user;
                    commit("setUser", {displayName, email, photoURL, providerId, uid});
                    commit("setAuthStatus", "authenticated");
                } else {
                    commit("setAuthStatus", "unauthenticated");
                }
                commit("setInitialized");
            } catch(error) {
                console.error("Auth init error", error);
                commit("setAuthStatus", "unauthenticated");
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
            console.log("logout action");
            if(getters.isAuthenticated) {
                commit("setAuthStatus", "pending");
                try {
                    await auth.signOut();
                } catch(error) {
                    console.error("Error logging out, forcing logout");
                }
            }
            commit("setAuthStatus", "unauthenticated");
            commit("setUser", null);
        }
    };

    mutations: Vuex.MutationTree<IAuthState> = {
        setAuthStatus: (state:IAuthState, authStatus: string) => {
            state.authStatus = authStatus;
        },

        setUser: (state:IAuthState, user: IUser | null) => {
            state.user = user;
        },

        setInitialized: (state:IAuthState) => {
            state.initialized = true;
        }
    };
}
