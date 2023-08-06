import { useState } from "react";
import { toast } from "react-hot-toast";
import { RouterOutputs, api } from "~/utils/api";

// type PostWithUser = RouterOutputs["calculatorHistory"]["getHistByUserId"][number];
interface abc {
  userId: string;
  setCurrentExpression: React.Dispatch<React.SetStateAction<string>>;
  setPreviousExpression: React.Dispatch<React.SetStateAction<string>>;
}

type Hist = RouterOutputs["calculatorHistory"]["getHistByUserId"][number];

const HistoryForUser = ({
  userId,
  setCurrentExpression,
  setPreviousExpression,
}: abc) => {
  // const { data, isLoading } = api.calculatorHistory.getByUserId.useQuery();
  // console.log("About to get hist for user id!!!!");
  // const { data, isLoading } = api.calculatorHistory.getHistByUserId.useQuery({ userId: userId });
  // const b = api.calculatorHistory.getAll.useQuery();
  // console.log("*^*^*^*^*^* user history for user with id '", userId, "' in HistoryForUser.tsx", data);
  // const { data, isLoading } = api.calculatorHistory.getAll.useQuery({ userId: "user_2SkyEypAywRHAoEYxRkJlaDSDXw" });
  const { data, isLoading, error } =
    api.calculatorHistory.getHistByUserId.useQuery({ userId: userId });
  // const { data, isLoading } = api.calculatorHistory.getAll.useQuery({ userId: userId });
  //   if (isLoading) return <div>loading</div>;

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleHistoryClick = (hist: Hist) => {
    const equation = hist.content;
    const equationParts = hist.content.split("=");
    const expression = equationParts[0];
    const result = equationParts[1];
    if (result && expression) {
      setCurrentExpression(result);
      setPreviousExpression(expression + "=");
    } else {
      toast.error(equation + " is not a valid equation.");
    }
  };

  return (
    <div>
      <button onClick={toggleDropdown}>
        {(isOpen ? "Close" : "Open") + " History"}
      </button>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        isOpen && (
          <ul>
            {data?.map((hist) => (
              <li
                className="hover:bg-slate-200"
                key={hist.id}
                onClick={() => handleHistoryClick(hist)}
              >
                {hist.content}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default HistoryForUser;
