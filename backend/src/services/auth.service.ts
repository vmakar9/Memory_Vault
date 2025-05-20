import { ISignInCredentials } from "../interface/sign-in-credentials.interface";
import { ISignUpCredentials } from "../interface/sign-up-credentials.interface";
import { supabase } from "../utils/supabase";

class AuthService {
  public async signUp({ email, password }: ISignUpCredentials) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    return {
      user: data.user,
    };
  }

  public async signIn({ email, password }: ISignInCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    return {
      user: data.user,
      session: data.session,
    };
  }

  public async signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    return true;
  }
}

export const authService = new AuthService();
