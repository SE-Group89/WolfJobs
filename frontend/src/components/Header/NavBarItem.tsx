// Importing Link component from react-router-dom for navigation
import { Link } from "react-router-dom";

// Defining a functional component called NavBarItem with props
// The props include 'link' (the URL to navigate to) and 'text' (the text to display for the link)
const NavBarItem = (props: { link: string; text: string }) => {
  let { link, text } = props; // Destructuring the 'link' and 'text' from props

  return (
    <>
      {/* Rendering a list item (li) with a Link component */}
      <li>
        {/* The Link component is used to navigate to the 'link' prop when clicked */}
        <Link to={link} className="hover:text-slate-500">
          {/* Displaying the 'text' prop inside the link */}
          {text}
        </Link>
      </li>
    </>
  );
};

// Exporting NavBarItem to be used in other parts of the app (like the navigation bar)
export default NavBarItem;
