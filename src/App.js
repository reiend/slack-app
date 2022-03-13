// import React, { useState, createContext, useContext } from "react";
// import {
//   Navigate,
//   useNavigate,
//   useLocation,
//   Routes,
//   Route,
//   Link,
//   Outlet
// } from "react-router-dom";
//
// import "@reiend/quirk";
//
// const fakeAuthProvider = {
//   isAuthenticated: false,
//   signin(callback) {
//     fakeAuthProvider.isAuthenticated = true;
//     setTimeout(callback, 100);
//   },
//   signout(callback) {
//     fakeAuthProvider.isAuthenticated = false;
//     setTimeout(callback, 100);
//   },
// };
//
// const AuthStatus = () => {
//   let auth = useAuth();
//   let navigate = useNavigate();
//
//   if (!auth.user) {
//     return <p>You are not loggin</p>;
//   }
//
//   return (
//     <p>
//       Welcome {auth.user}!{" "}
//       <button
//         clasName="btn--outL-blue-L5"
//         onClick={() => {
//           auth.signout(() => navigate("/"));
//         }}
//       >
//         Sign out
//       </button>
//     </p>
//   );
// };
//
// const Layout = () => {
//   return (
//     <div>
//       <AuthStatus>
//         <ul>
//           <li>
//             <Link to="/">Public Page</Link>
//           </li>
//           <li>
//             <Link to="/protected">Protected Page</Link>
//           </li>
//         </ul>
//       </AuthStatus>
//       <Outlet/>
//     </div>
//   );
// };
//
// let AuthContext = createContext(null);
//
// const AuthProvider = ({ children }) => {
//   let [user, setUser] = useState(null);
//
//   let signin = (newUser, callback) => {
//     return fakeAuthProvider.signin(() => {
//       setUser(newUser);
//       callback();
//     });
//   };
//
//   let signout = (callback) => {
//     return fakeAuthProvider.signout(() => {
//       setUser(null);
//       callback();
//     });
//   };
//
//   let value = [user, signin, signout];
//
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
//
// const useAuth = () => useContext(AuthContext);
//
//
// const RequireAuth = ({ children }) => {
//   let auth = useAuth();
//   let location = useLocation();
//
//   if (!auth.user) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }
//   return children;
// };
//
// const LoginPage = () => {
//   let navigate = useNavigate();
//   let location = useLocation();
//   let auth = useAuth();
//
//   let from = location.state?.from?.pathname || "";
//   const onSubmitForm = (event) => {
//     event.preventDefault();
//     let formData = new FormData(event.currentTarget);
//     let username = formData.get("username");
//
//     auth.signin(username, () => navigate(from, { replace: true }));
//   };
//
//   return (
//     <div>
//       <p>You must login to view the account page {from}</p>
//       <form onSubmit={onSubmitForm}>
//         <label htmlFor="username">
//           Username: <input type="text" name="username" />
//         </label>{" "}
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };
//
// const PublicPage = () => <h3>Public</h3>;
// const ProtectedPage = () => <h3>Protected</h3>;
//
// const App = () => {
//   return (
//     <div>
//       <AuthProvider>
//         <Routes>
//           <Route element={ <Layout/> }>
//             <Route path="/" element={ <PublicPage/>}/>
//             <Route path="/login" element={ <LoginPage/>  }/>
//             <Route path="/protected" element={
//               <RequireAuth>
//                 <ProtectedPage/>
//               </RequireAuth>
//             }/>
//           </Route>
//         </Routes>
//       </AuthProvider>
//     </div>
//   );
// };
//
// export default App;


import * as React from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<div>
            <p>There's nothing here</p>
            </div>} />
          <Route
            path="/protected"
            element={
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100);
  },
  signout(callback) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

function Layout() {
  return (
    <div>
      <AuthStatus />

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

let AuthContext = React.createContext(null);

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username");

    auth.signin(username, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

