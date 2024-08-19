import { useGlobalContext } from "../../context/globalContext"
import styled from "styled-components"
import {Line} from 'react-chartjs-2'
import { dateFormat } from '../../utils/dateFormat'
import "chart.js/auto";
import {Chart as ChartJs, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'


ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
)

const Chart = () => {
  const { incomes, expense } = useGlobalContext();

  const data = {
    labels: incomes.map((inc)=> {
      const { date } = inc
      return dateFormat(date)
     }),
     datasets: [
      {
        labels : 'Income',
        data : [
          ...incomes.map((income)=> {
            const { amount } = income;
            return amount
          })
        ],
        backgroundColor : 'green',
        tension : .2
      },
      {
        label: 'Expenses',
        data: [
            ...expense.map((expense) => {
                const {amount} = expense
                return amount
            })
        ],
        backgroundColor: 'red',
        tension: .2
      }
     ]
  }


   return (
    <ChartStyled>
      <Line data={data}/>
    </ChartStyled>
  )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart
