import { useState } from "react";
import { toast } from "react-hot-toast";
import { RouterOutputs, api } from "~/utils/api";

interface CalculatorProps {
  userId: string;
  setCurrentExpression: React.Dispatch<React.SetStateAction<string>>;
  setPreviousExpression: React.Dispatch<React.SetStateAction<string>>;
}

type Hist = RouterOutputs["calculatorHistory"]["getHistByUserId"][number];

const HistoryForUser = ({
  userId,
  setCurrentExpression,
  setPreviousExpression,
}: CalculatorProps) => {
  const { data, isLoading, error } =
    api.calculatorHistory.getHistByUserId.useQuery({ userId: userId });
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
