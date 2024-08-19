import { createContext, useContext, useState } from "react";
import axios from 'axios'

const GlobalContext = createContext();

const BASE_URL = "http://localhost:5050/api/v1/"


// eslint-disable-next-line react/prop-types
export const GlobalProvider = ({ children }) => {
        const [incomes, setIncomes ] = useState([])
        const [expense, setexpense ] = useState([])
        const [error, seterror ] = useState(null)

        const addIncome = async (income) => {
            const response = await axios.post(` ${BASE_URL}add-income`, income )
            .catch((error)=> {
                seterror(error.response.data.message)
            })
            getIncomes()
        }

        const getIncomes = async () => {
            const response = await axios.get(`${BASE_URL}get-incomes`)
            setIncomes(response.data)
            console.log(response.data);
        }

        const deleteIncome = async (id) => {
            const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
            getIncomes()
        }
    

        const totalIncome = () => {
            let sum = 0;
            incomes.forEach((income)=>{
                sum += income.amount
            })
            return sum
        }

        // calculate incomes
        const addExpense = async (income) =>{
            const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((error)=>{
                seterror(error.response.data.message)
            })
            getExpense()
        }
        const getExpense = async () => {
            const response = await axios.get(`${BASE_URL}get-expenses`)
            setexpense(response.data)
        }

        const deleteExpense = async (id) => {
            const response = await axios.delete(`${BASE_URL}delete-expense/${id}`)
            .catch((error)=>{
                seterror(error.response.data.message)
                })
                getExpense()
        }

        const totalExpenses = () => {
            let sum = 0;
            expense.forEach((income)=>{
                sum += income.amount
            })
            return sum
        }

        const totalBalance = () => {
            return totalIncome() - totalExpenses()
        }

        const transactionHistory = () => {
            const history = [...incomes, ...expense];
            history.sort((a,b)=> {
                return new Date(b.createdAt) - new Date(a.createdAt)
            })

            return history.slice(0,3)
        }

        return (
            <GlobalContext.Provider value={{
                incomes,
                addIncome,
                getIncomes,
                deleteIncome,
                totalIncome,
                expense,
                addExpense,
                getExpense,
                deleteExpense,
                totalExpenses,
                totalBalance,
                transactionHistory,
                error,
                seterror
            }}>
                {children}
            </GlobalContext.Provider>
        )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}

