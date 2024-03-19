import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import Link from "next/link";

export default async function Index() {
  

  return (
    <div className="mt-6">
      <Link href={'/add'} className="border p-2 rounded-lg">ADD MEAL</Link>

    </div>
  );
}

