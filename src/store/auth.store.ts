import { auth as fbAuth, User as fbUser } from 'firebase';
import { auth } from '../server/firebase.config';
import router from '../router';
import Vuex from 'vuex';;

type Provider = "google";

interface IUser {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    providerId: string;
    uid: string;
}

interface IAuthState {
    currentUser: IUser | null;
}

class AuthModule<RootState> implements Vuex.Module<IAuthState, RootState> {
    static readonly login = "login";
    static readonly logout = "logout";

    static readonly provider = {
        get google() { return "google"; }
    }

    namespaced: true;
    state: IAuthState;

    getters: Vuex.GetterTree<IAuthState, RootState> = {
        isAuthenticated: (state: IAuthState):Promise<boolean> => this._authStatePromise.then(()=> state.currentUser != null),
    }

    actions: Vuex.ActionTree<IAuthState, RootState> = {
        [AuthModule.login]: (context: Vuex.ActionContext<IAuthState, RootState>, provider: Provider|string|IUser|null) => {
            if(typeof provider === 'string') {
                return auth
                .signInWithRedirect(this._authProviders[provider])
                .then(() => {
                    console.log(`Redirecting to login for ${provider}`);
                })
                .catch((error: Error) => {
                    console.log("Sign-In Error!");
                    console.log(error.message);
                });
            } else {
                if(provider !== null) {
                    context.commit(AuthModule.login, provider);
                } //else ignore
            }
        },

        [AuthModule.logout]: (context: Vuex.ActionContext<IAuthState, RootState>) => {
            return auth
            .signOut()
            .then(() => {
                context.commit(AuthModule.logout);
                router.push({name: 'login'});
            })
            .catch(error => console.log(`Logout Error: ${error.message}`));
        }
    };

    mutations: Vuex.MutationTree<IAuthState> = {
        [AuthModule.login]: (state: IAuthState, user: IUser) => state.currentUser = user,
        [AuthModule.logout]: (state: IAuthState) => state.currentUser = null,
    }

    private _authProviders = {
        [AuthModule.provider.google]: new fbAuth.GoogleAuthProvider(),
    }

    private _authStatePromise:Promise<any>;

    constructor(store: Vuex.Store<RootState>, defaultState: IAuthState = { currentUser: null }) {
        this.state = defaultState;
        this._authStatePromise = new Promise<any>((resolve, reject)=> {
            auth.onAuthStateChanged((user:fbUser)=>{
                store.dispatch(AuthModule.login, user);
                resolve(user);
            });
        })

        auth.getRedirectResult();
    }
}

export {AuthModule, IAuthState, IUser, Provider};
