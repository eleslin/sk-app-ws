import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";
import { createClient } from "./utils/supabase/server";

export default async function Home() {
  const supabase = createClient()

  const { data } = await supabase.auth.getUser()


  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="min-h-screen w-full flex flex-col gap-2 items-center justify-center">
        {/* Logo */}
        <p className='logo'>SK</p>

        {/* Login */}
        <Link href={`${data?.user ? '/routines' : '/login'}`} className="bg-white rounded-md p-2">
          <IoChevronForward size='30px' className="text-gray-800" />
        </Link>

      </main>
    </div>
  );
}
