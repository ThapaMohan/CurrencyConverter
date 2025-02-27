import { useState } from 'react';
import useCurrencyInfo from './hooks/useCurrencyInfo';
import { InputBox } from './components'

function App() {

  //maintaining the state that get change by the user
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("npr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  //taking the information of currency that need to be converted
  const currencyInfo = useCurrencyInfo(from)

  //taking the objects keys
  const options = Object.keys(currencyInfo)


  //swap funtionality
  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  // converting currency
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center bg-cover bg-no-repeat relative"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/4386373/pexels-photo-4386373.jpeg?auto=compress&cs=tinysrgb&w=800')`,
      }}
    >
      {/* Gradient Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>

      <div className="relative z-10 w-full max-w-md mx-auto border border-gray-300 rounded-2xl p-6 backdrop-blur-md bg-white/20 shadow-lg">
        <h2 className="text-center text-2xl font-semibold text-white mb-5">
          Currency Converter
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
          className="space-y-4"
        >
          {/* From Currency Input */}
          <div className="w-full">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount)}
              className="bg-white/60 shadow-sm rounded-lg"
            />
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              type="button"
              className="border-2 border-white rounded-full bg-blue-600 text-white px-4 py-2 text-sm shadow-md hover:bg-blue-700 transition"
              onClick={swap}
            >
              🔄 Swap
            </button>
          </div>

          {/* To Currency Input */}
          <div className="w-full">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
              className="bg-white/60 shadow-sm rounded-lg"
            />
          </div>

          {/* Convert Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-3 rounded-xl shadow-md font-semibold text-lg hover:opacity-90 transition"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>

  );

}

export default App
