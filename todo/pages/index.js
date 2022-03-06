import Head from "next/head";
import Image from "next/image";
import { Auth, Typography, Button } from "@supabase/ui";
import { supabase } from "../lib/initSupabase";
import Container from "../components/Container";
import TodoList from "../components/TodoList";

export default function Home() {
  const { user } = Auth.useUser();
  return (
    <div className="w-full h-full shadow-2xl bg-gradient-to-br from-blue-200 to-purple-400">
      {!user ? (
        <div className="grid items-center justify-center w-full h-full p-4">
          <Auth
            supabaseClient={supabase}
            providers={["google", "github"]}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
          />
        </div>
      ) : (
        <div
          className="w-full h-full flex flex-col justify-center items-center p-4"
          style={{ minWidth: 250, maxWidth: 600, margin: "auto" }}
        >
          <TodoList user={supabase.auth.user()} />
          <button
            className="btn-black w-full mt-12"
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
              if (error) console.log("Error logging out:", error.message);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
