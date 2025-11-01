import Link from 'next/link';
import { Music } from 'lucide-react';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <header className='sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-xs'>
      <div className='flex items-center justify-between h-16 px-4'>
        <div className="flex items-center gap-2">
          <Music className="w-8 h-8 text-blue-600" />
          <Link href="/">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white cursor-pointer">
              MusicStream
            </h1>
          </Link>
        </div>

        <div className="hidden md:block flex-1 max-w-xl mx-8">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}

export default Header;