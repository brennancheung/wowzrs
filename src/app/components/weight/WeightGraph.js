import React from 'react'
import Section from 'core/common/Section'
import moment from 'moment'
import { max, min, path, pluck, reduce } from 'ramda'
import {
  CartesianGrid, Line, LineChart,
  Tooltip, XAxis, YAxis,
} from 'recharts'

const toDate = d => moment(d).format('MM/DD')
const renderTooltip = (input) => {
  const data = path(['payload', 0, 'payload'])(input)
  if (!data) { return null }
  const weight = data.weight.toFixed(1)
  const date = moment(data.date).format('MM/DD')
  return (
    <span>{date} {weight}</span>
  )
}

const WeightGraph = ({ data }) => {
  const weights = pluck('weight', data)
  const lower = Math.floor(reduce(min, Infinity, weights)) - 1.0
  const upper = Math.floor(reduce(max, -Infinity, weights)) + 1.0

  return (
    <Section title="Weight History">
      <LineChart width={1000} height={200} data={data}>
        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" tickFormatter={toDate} />
        <YAxis type="number" domain={[lower, upper]} allowDecimals={false} />
        <Tooltip content={renderTooltip} />
      </LineChart>
    </Section>
  )
}

export default WeightGraph
