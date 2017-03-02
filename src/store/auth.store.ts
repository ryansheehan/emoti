import { auth as fbAuth, User as fbUser } from 'firebase';
import { auth } from '../server/firebase.config';
import * as Vuex from 'vuex';

type Provider = "google";

interface IUser {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
}

class User implements IUser {
    get displayName() { return this._user.displayName; }
    get email() { return this._user.email; }
    get photoURL() { return this._user.photoURL; }
    constructor(private _user: fbUser) {

    }
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
        isAuthenticated: (state: IAuthState):boolean => state.currentUser != null,
    }

    actions: Vuex.ActionTree<IAuthState, RootState> = {
        [AuthModule.login]: (context: Vuex.ActionContext<IAuthState, RootState>, provider: Provider) => {
            return auth
            .signInWithRedirect(this._authProviders[provider])
            .then(() => {
                console.log(`Redirecting to login for ${provider}`);
            })
            .catch((error: Error) => {
                console.log("Sign-In Error!");
                console.log(error.message);
            });
        },

        [AuthModule.logout]: (context: Vuex.ActionContext<IAuthState, RootState>) => {
            return auth
            .signOut()
            .then(() => context.commit(AuthModule.logout))
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

    constructor(store: Vuex.Store<RootState>, ns: string, defaultState: IAuthState = { currentUser: null }) {        
        auth.onAuthStateChanged((user:fbUser)=>{
            store.commit(`${AuthModule.login}`, user ? new User(user) : null);
        });
        auth.getRedirectResult();
    }
}

export {AuthModule, IAuthState, IUser, Provider};