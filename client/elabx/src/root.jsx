import {Link} from 'react-router-dom'

export default function Root() {
    return (
      <>
        <div>
            <h1>This is our Landing Page</h1>
            <Link to={"/login"}>Login</Link>
            <br/>
            <Link to={"/register"}>Create a new Account</Link>
            <br />
            <Link to={"/homepage"}>Go to Homepage</Link>
            <br />

            <p>
               Go to Course: <Link to={"/course/cpp"}>C++</Link>
            </p>
        </div>
        <div id="detail"></div>
      </>
    );
  }