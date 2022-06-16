import { HiDownload } from 'react-icons/hi';

const WelcomePage = () => {
  return (
    <div className="bg-black">
      welcome page
      <button className="bg-white bg-opacity-70 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
        <HiDownload className="fill-current w-4 h-4 mr-2" />
        <span>Download</span>
      </button>
    </div>
  );
}

export default WelcomePage;
