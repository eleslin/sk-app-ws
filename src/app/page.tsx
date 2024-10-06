import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";

export default async function Home() {


  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="min-h-screen flex flex-col gap-2 items-center justify-center sm:items-start">
        {/* Logo */}
        <p className='logo'>SK</p>

        {/* Login */}
        <Link href={'/login'} className="bg-white rounded-md p-2">
          <IoChevronForward size='30px' className="text-gray-800" />
        </Link>
      </main>
    </div>
  );
}
