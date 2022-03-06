import { Auth } from "@supabase/ui";
import { supabase } from "../lib/initSupabase";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Component {...pageProps} />
    </Auth.UserContextProvider>
  );
}
export default MyApp;
