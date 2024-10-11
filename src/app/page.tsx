
import { createClient } from "./utils/supabase/server";
import HomeLink from "@/components/HomeLink";
export default async function Home() {
  const supabase = createClient()

  const { data } = await supabase.auth.getUser()


  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="min-h-screen w-full flex flex-col gap-2 items-center justify-center animate-fadeIn">
        {/* Logo */}
        <p className='logo'>SK</p>

        {/* Login */}
        <HomeLink user={data?.user} />
      </main>
    </div>
  );
}
