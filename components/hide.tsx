import { User } from "../types/common";
import { getByUsername, retakeScreenshot } from "../utils/exports";
import { updateValue } from "../utils/supabase";

interface IProps {
  stat: keyof User;
  user: User;
  hidden: any[];
  setHidden: any;
}

function Hide({ stat, user, hidden, setHidden }: IProps) {
  // Toggle hide
  function toggleHide() {
    // Add stat to hidden array
    setHidden([...hidden, stat]);

    // Check if user's data is already written to Supabase
    let checkUser = getByUsername(user.username);
    if (checkUser) {
      // Retake screenshot for link preview
      retakeScreenshot(user);

      // For the Highlight component, there are multiple props to be deleted
      if (stat == "commits") {
        ["commits", "pulls", "contributions", "repos", "reviews"].map(
          (column: keyof User) =>
            updateValue("users", column, null, user.username)
        );
      } else updateValue("users", stat, null, user.username);
    }
  }

  return (
    <div>
      <button
        className="invisible group-hover:visible absolute p-2 hover:bg-gray-800/90 text-gray-100 rounded focus:outline-none"
        onClick={toggleHide}
      >
        Hide
      </button>
    </div>
  );
}

export default Hide;
