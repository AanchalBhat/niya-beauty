import React from 'react'
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
} from 'victory'

export default function EarningsChart(props) {
  const { data } = props
  return (
    <div>
      <VictoryChart
        height={225}
        width={400}
        domainPadding={25}
        // theme={VictoryTheme.material}
      >
        <VictoryAxis
          // fixLabelOverlap={true}
          tickFormat={(tick) => {
            console.log(tick)
            return `${Math.round(tick)}`
          }}
          tickLabelComponent={
            <VictoryLabel
              style={{ textAnchor: 'end', fontSize: '9px', paddingLeft: 10, marginTop: 10, }}
              domainPadding={25}
              angle={-35}
            />
          }
        />
        <VictoryAxis
          dependentAxis
          style={{
            grid: { stroke: '#818e99', strokeWidth: 0.5 },
          }}
          tickFormat={(tick) => `$${Math.round(tick)}`}
          tickLabelComponent={
            <VictoryLabel
              style={{ textAnchor: 'end', fontSize: '10px', paddingLeft: 10 }}
            />
          }
          
        />
        <VictoryBar
          data={data}
          style={{
            data: {
              fill: (datum) => {
                return datum.index % 2 ? '#25263a' : '#81d8d0'
              },
              stroke: 'black',
              strokeWidth: 0.5,
            },
          }}
          // barWidth={25}
        />
      </VictoryChart>
    </div>
  )
}
