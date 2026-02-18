import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      // .then(data => setMessage((data as any).message));
  },[])

  return (
    <p className='p-4 font-bold text-3xl'>
      Hiiiiiii {message}
    </p>
  )
}

export default App
