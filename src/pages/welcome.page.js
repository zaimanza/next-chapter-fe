import { HiDownload } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const peopleProvider = useSelector((state) => state.people.value);
  const handleGetStartedButton = async () => {
    if (peopleProvider.access_token !== "") {
      navigate("/events");
    } else {
      navigate("/auth");
    }
  }
  return (
    <div className="bg-black">
      welcome page
      <div
        onClick={handleGetStartedButton}
        className="bg-white bg-opacity-70 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
        <HiDownload className="fill-current w-4 h-4 mr-2" />
        <span>Get started</span>
      </div>
    </div>
  );
}

export default WelcomePage;
