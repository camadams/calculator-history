import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import HistoryForUser from "./HistoryForUser";
import { signIn } from "next-auth/react";

const Calculator = ({ userId }: { userId: string | undefined }) => {
  const [currentExpression, setCurrentExpression] = useState<string>("");
  const [previousExpression, setPreviousExpression] = useState<string>("");
  const [mustCreateHistory, setMustCreateHistory] = useState<boolean>(false);
  const createHist = api.calculatorHistory.create.useMutation({});

  useEffect(() => {
    if (mustCreateHistory) {
      createHist.mutate({ content: previousExpression + currentExpression });
      setMustCreateHistory(false);
    }
  }, [mustCreateHistory]);

  const handleEquals = () => {
    // if not only digits, return
    if (!currentExpression || /^\d+$/.test(currentExpression)) return;
    try {
      const ans: unknown = eval(currentExpression);
      setCurrentExpression(String(ans));
      setPreviousExpression(currentExpression + "=");
      setMustCreateHistory(true);
    } catch (error) {
      toast.error("Invalid previousExpression");
    }
  };

  const handleNum = (num: string) => {
    setCurrentExpression((prevValue) => prevValue + num);
    setPreviousExpression("");
  };

  const handleOpp = (opp: string) => {
    if (opp === "AC") {
      setCurrentExpression("");
      setPreviousExpression("");
    } else if (opp === "DE") {
      setCurrentExpression((cur) => cur.slice(0, -1));
    } else {
      setCurrentExpression((prevValue) => prevValue + opp);
      setPreviousExpression("");
    }
  };

  return (
    <div className="max-w-lg bg-gray-100 p-4">
      <input
        type="text"
        id="previousExpression"
        value={previousExpression}
        readOnly
        className="w-full rounded bg-white p-2 text-right text-gray-500"
      />
      <input
        type="text"
        id="currentExpression"
        value={currentExpression}
        readOnly
        className="w-full rounded bg-white p-2 text-right text-4xl"
      />
      <div className="mt-1 grid grid-cols-4 gap-1">
        <Button buttonFunction={handleOpp} displayValue={"AC"} />
        <Button buttonFunction={handleOpp} displayValue={"DE"} />
        <Button buttonFunction={handleOpp} displayValue={"."} />
        <Button buttonFunction={handleOpp} displayValue={"/"} />
      </div>
      <div className="mt-1 grid grid-cols-4 gap-1">
        <Button buttonFunction={handleNum} displayValue={"7"} />
        <Button buttonFunction={handleNum} displayValue={"8"} />
        <Button buttonFunction={handleNum} displayValue={"9"} />
        <Button buttonFunction={handleOpp} displayValue={"+"} />
      </div>
      <div className="mt-1 grid grid-cols-4 gap-1">
        <Button buttonFunction={handleNum} displayValue={"4"} />
        <Button buttonFunction={handleNum} displayValue={"5"} />
        <Button buttonFunction={handleNum} displayValue={"6"} />
        <Button buttonFunction={handleOpp} displayValue={"-"} />
      </div>
      <div className="mt-1 grid grid-cols-4 gap-1">
        <Button buttonFunction={handleNum} displayValue={"1"} />
        <Button buttonFunction={handleNum} displayValue={"2"} />
        <Button buttonFunction={handleNum} displayValue={"3"} />
        <Button buttonFunction={handleOpp} displayValue={"*"} />
      </div>

      <div className="mt-1 grid grid-cols-4 gap-1">
        <Button buttonFunction={handleNum} displayValue={"00"} />
        <Button buttonFunction={handleNum} displayValue={"0"} />
        <Button buttonFunction={handleEquals} displayValue={"="} />
      </div>
      {userId && (
        <HistoryForUser
          userId={userId}
          setCurrentExpression={setCurrentExpression}
          setPreviousExpression={setPreviousExpression}
        />
      )}
      {!userId && (
        <div className="mt-3 grid w-2/3 grid-cols-2 ">
          <div className="flex items-center">To see history, please</div>{" "}
          <button
            className="w-2/5 rounded-full bg-white/10 p-1 no-underline transition hover:bg-blue-700/20"
            onClick={() => void signIn()}
          >
            {"sign in"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Calculator;

interface ButtonProps {
  buttonFunction: (buttonFunction: string) => void;
  displayValue: string;
}

const Button = ({ buttonFunction, displayValue }: ButtonProps) => {
  let style;
  if (buttonFunction.name === "handleEquals") {
    style =
      "col-span-2 rounded bg-green-500 hover:bg-green-600 p-4 text-lg text-white";
  } else {
    style = `col-span-1 rounded p-4 text-lg shadow-md shadow-slate-400
      ${
        buttonFunction.name === "handleOpp"
          ? "hover:bg-blue-500 bg-blue-600"
          : "hover:bg-blue-600 bg-blue-500"
      }
      text-white `;
  }

  return (
    <button onClick={() => buttonFunction(displayValue)} className={style}>
      {displayValue}
    </button>
  );
};

/*
const initialState: State = {
    currentExpression: "",
    previousExpression: "",
    mustCreateHistory: false,
  };
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  interface State {
    currentExpression: string;
    previousExpression: string;
    mustCreateHistory: boolean;
  }

  type Action =
    | { type: "APPEND"; payload: string }
    | { type: "EQUALS" }
    | { type: "NUM"; payload: string }
    | { type: "OPP"; payload: string };

  function calculatorReducer(state: State, action: Action): State {
    switch (action.type) {
      case "APPEND":
        return {
          ...state,
          currentExpression: state.currentExpression + action.payload,
        };
      case "EQUALS":
        try {
          const ans: unknown = eval(state.currentExpression);
          return {
            ...state,
            currentExpression: String(ans),
            previousExpression: state.currentExpression + "=",
            mustCreateHistory: true,
          };
        } catch (error) {
          // Handle error
          return state;
        }
      case "NUM":
        return {
          ...state,
          currentExpression: state.currentExpression + action.payload,
          previousExpression: "",
        };
      case "OPP":
        if (action.payload === "AC") {
          return {
            currentExpression: "",
            previousExpression: "",
            mustCreateHistory: false,
          };
        } else if (action.payload === "DE") {
          return {
            ...state,
            currentExpression: state.currentExpression.slice(0, -1),
          };
        } else {
          return {
            ...state,
            currentExpression: state.currentExpression + action.payload,
            previousExpression: "",
          };
        }
      default:
        return state;
         
    }
  }
*/
