import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Dahsboard } from './pages/dashboard';
import { Auth } from './pages/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
// import { SignInButton, SignUpButton } from '@clerk/clerk-react';

function App() {
  return (
    <Router>
      <ToastContainer />
      {/* <AppContent /> */}
      <Routes>
      <Route path="/" element={<Dahsboard />} />

      </Routes>
    </Router>
  );
}

// function AppContent() {
//   const navigate = useNavigate();

//   Handle sign out
//   const handleSignOut = () => {
//     Sign out logic from Clerk
//     After signing out, navigate to /auth
//     navigate('/auth');
//   };

//   return (
//     <div className="items-center">
//       <SignedIn>
//         <div className="p-1 bg-[#d1a6df] text-white flex justify-end">
//           <UserButton showName afterSignOut={handleSignOut} />
//         </div>
//       </SignedIn>


//       <SignedOut>
//         <div className="mb-4 mt-[50px] text-center text-xl font-semibold">Please sign in.</div>
//         <div className="flex justify-center gap-4 mx-auto">
//           <SignUpButton
//             mode="modal"
//             className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200"
//           />
//           <SignInButton
//             mode="modal"
//             className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
//           />
//         </div>
//       </SignedOut>

//       <Routes>
//         <Route path="/" element={<SignedIn><Dahsboard /></SignedIn>} />
//       </Routes>
//     </div>
//   );
// }

export default App;



