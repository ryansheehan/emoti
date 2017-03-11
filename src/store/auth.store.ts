import { auth as fbAuth, User as fbUser } from 'firebase';
import { auth } from '../server/firebase.config';
import router from '../router';
import Vuex from 'vuex';

type Provider = "google";

const authenticationStatus:string = "authenticationStatus";
type AuthenticationState = "undetermined" | "authenticated" | "logging-out" | "anonymous";

interface IUser {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    providerId: string;
    uid: string;
}

interface IAuthState {
    authenticationStatus: AuthenticationState;
    currentUser: IUser | null;
}

class AuthModule<RootState> implements Vuex.Module<IAuthState, RootState> {
    static readonly login = "login";
    static readonly logout = "logout";

    static readonly provider = {
        get google():string { return "google"; }
    };

    namespaced:boolean = true;
    state: IAuthState;

    getters: Vuex.GetterTree<IAuthState, RootState> = {
        isAuthenticated: (state:IAuthState):boolean => state.authenticationStatus === "authenticated",
        isAnonymous: (state:IAuthState):boolean => state.authenticationStatus === "anonymous",
    }

    actions: Vuex.ActionTree<IAuthState, RootState> = {
        [AuthModule.login]: (context: Vuex.ActionContext<IAuthState, RootState>, provider: Provider|string|IUser) => {
            if(typeof provider === "string") {
                context.commit(authenticationStatus, "undetermined");
                return auth
                .signInWithRedirect(this._authProviders[provider])
                .then(() => {
                    console.log(`Redirecting to login for ${provider}`);
                })
                .catch((error: Error) => {
                    console.error("Sign-In Error!");
                    console.error(error.message);
                });
            } else {
                if(provider) {
                    context.commit(AuthModule.login, provider);
                    context.commit(authenticationStatus, "authenticated");
                }
            }
        },

        [AuthModule.logout]: (context: Vuex.ActionContext<IAuthState, RootState>) => {
            context.commit(authenticationStatus, "logging-out");
            return auth
            .signOut()
            .then(() => {
                context.commit(AuthModule.logout);
                context.commit(authenticationStatus, "anonymous");
                router.push({name: "login"});
            })
            .catch(error => console.log(`Logout Error: ${error.message}`));
        }
    };

    mutations: Vuex.MutationTree<IAuthState> = {
        [authenticationStatus]: (state: IAuthState, authStatus:AuthenticationState) => state.authenticationStatus = authStatus,
        [AuthModule.login]: (state: IAuthState, user: IUser) => state.currentUser = user,
        [AuthModule.logout]: (state: IAuthState) => state.currentUser = null,
    };

    private _authProviders = {
        [AuthModule.provider.google]: new fbAuth.GoogleAuthProvider(),
    };

    constructor(store: Vuex.Store<RootState>, ns: string[] = [], defaultState: IAuthState = { currentUser: null, authenticationStatus: "undetermined" }) {
        this.state = defaultState;

        auth.onAuthStateChanged((user:fbUser)=> {
            if(user) {
                store.commit([...ns, AuthModule.login].join("/"), user);
            } else {
                store.commit([...ns, AuthModule.logout].join("/"));
            }
        });

        auth.getRedirectResult();
    }
}

export {AuthModule, IAuthState, IUser, Provider};
