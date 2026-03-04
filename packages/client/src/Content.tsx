import ChatBot from './components/chat/ChatBot';
import ReviewList from './components/reviews/ReviewList';
import { useMenu } from './hooks/MenuContext';

const Content = () => {
  const { activeMenu } = useMenu();

  return (
    <div className="grow">
      {activeMenu === '1' && <ChatBot />}
      {activeMenu === '2' && <ReviewList productId={1} />}
    </div>
  );
};

export default Content;
