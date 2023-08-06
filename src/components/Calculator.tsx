import React, { useEffect, useReducer, useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import HistoryForUser from "./HistoryForUser";
import { signIn } from "next-auth/react";

const Calculator = ({ userId }: { userId: string | undefined }) => {
  const [currentExpression, setCurrentExpression] = useState<string>("");
  const [previousExpression, setPreviousExpression] = useState<string>("");
  const [mustCreateHistory, setMustCreateHistory] = useState<boolean>(false);
  const { mutate } = api.calculatorHistory.create.useMutation({});

  const createHist = api.calculatorHistory.create.useMutation({});
  useEffect(() => {
    if (mustCreateHistory) {
      createHist.mutate({ content: previousExpression + currentExpression });
      console.log(createHist.isLoading);
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
      <button onClick={() => console.log(previousExpression)}>
        Hi {createHist.isLoading}
      </button>
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
        <button
          onClick={() => handleOpp("AC")}
          className="col-span-1 rounded bg-blue-600 p-4 text-lg text-white shadow-md shadow-slate-400 hover:bg-blue-500 hover:bg-blue-600"
        >
          AC
        </button>
        <button
          onClick={() => handleOpp("DE")}
          className="col-span-1 rounded bg-blue-600 p-4 text-lg text-white shadow-md shadow-slate-400 hover:bg-blue-500 hover:bg-blue-600"
        >
          DE
        </button>
        <button
          onClick={() => handleOpp(".")}
          className="col-span-1 rounded bg-blue-600 p-4 text-lg text-white shadow-md shadow-slate-400 hover:bg-blue-500 hover:bg-blue-600"
        >
          .
        </button>
        <button
          onClick={() => handleOpp("/")}
          className="col-span-1 rounded bg-blue-600 p-4 text-lg text-white shadow-md shadow-slate-400 hover:bg-blue-500 hover:bg-blue-600"
        >
          /
        </button>
      </div>
      <div className="mt-1 grid grid-cols-4 gap-1">
        <button
          onClick={() => handleNum("7")}
          className="col-span-1 rounded bg-blue-500 p-4 text-lg text-white shadow-md shadow-slate-400 hover:bg-blue-600"
        >
          7
        </button>
        <button
          onClick={() => handleNum("8")}
          className="col-span-1 rounded bg-blue-500 p-4 text-lg text-white shadow-md shadow-slate-400 hover:bg-blue-600"
        >
          8
        </button>
        <button
          onClick={() => handleNum("9")}
          className="col-span-1 rounded bg-blue-500 p-4 text-lg text-white shadow-md shadow-slate-400 hover:bg-blue-600"
        >
          9
        </button>
        <button
          onClick={() => handleOpp("+")}
          className="col-span-1 rounded bg-blue-600 p-4 text-lg text-white shadow-md shadow-slate-400 hover:bg-blue-500 hover:bg-blue-600"
        >
          +
        </button>
      </div>
      <div className="mt-1 grid grid-cols-4 gap-1">
        <button
          onClick={() => handleNum("4")}
          className="col-span-1 rounded bg-blue-500 p-4 text-lg text-white shadow-md shadow-slate-400 hover:bg-blue-600"
        >
          4
        </button>
        <button
          onClick={() => handleNum("5")}
          className="col-span-1 rounded bg-blue-500 p-4 text-lg text-white shadow-md shadow-slate-400 hover:bg-blue-600"
        >
          5
        </button>
        <button
          onClick={() => handleNum("6")}
          className="col-span-1 rounded bg-blue-500 p-4 text-lg text-white shadow-md shadow-slate-400 hover:bg-blue-600"
        >
          6
        </button>
        <button
          onClick={() => handleOpp("-")}
          className="col-span-1 rounded bg-blue-600 p-4 text-lg text-white shadow-md shadow-slate-400 hover:bg-blue-500 hover:bg-blue-600"
        >
          -
        </button>
      </div>
      <div className="mt-1 grid grid-cols-4 gap-1">
        <button
          onClick={() => handleNum("1")}
          className="col-span-1 rounded bg-blue-500 p-4 text-lg text-white shadow-md shadow-slate-400 hover:bg-blue-600"
        >
          1
        </button>
        <button
          onClick={() => handleNum("2")}
          className="col-span-1 rounded bg-blue-500 p-4 text-lg text-white shadow-md shadow-slate-400 hover:bg-blue-600"
        >
          2
        </button>
        <button
          onClick={() => handleNum("3")}
          className="col-span-1 rounded bg-blue-500 p-4 text-lg text-white shadow-md shadow-slate-400 hover:bg-blue-600"
        >
          3
        </button>
        <button
          onClick={() => handleOpp("*")}
          className="col-span-1 rounded bg-blue-600 p-4 text-lg text-white shadow-md shadow-slate-400 hover:bg-blue-500 hover:bg-blue-600"
        >
          *
        </button>
      </div>

      <div className="mt-1 grid grid-cols-4 gap-1">
        <button
          onClick={() => handleNum("00")}
          className="col-span-1 rounded bg-blue-500 p-4 text-lg text-white shadow-md shadow-slate-400 hover:bg-blue-600"
        >
          00
        </button>
        <button
          onClick={() => handleNum("0")}
          className="col-span-1 rounded bg-blue-500 p-4 text-lg text-white shadow-md shadow-slate-400 hover:bg-blue-600"
        >
          0
        </button>
        <button
          onClick={() => handleEquals()}
          className="col-span-2 rounded bg-green-500 p-4 text-lg text-white"
        >
          =
        </button>
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
