import React from 'react'
import ReactHighcharts from 'react-highcharts'

export const SalesReport = () => {
  return (
    <div className='sales-report'>
      <div className='totals'>
        <div className='item'>
          <div className='item-title'>
            Ventas estimadas
          </div>
          <div className='item-value'>
            $ 27.254.940
          </div>
        </div>
        <div className='item'>
          <div className='item-title'>
            Unidades estimadas
          </div>
          <div className='item-value'>
            80
          </div>
        </div>
      </div>
      <div className='table-report'>
        <div className='report-container'>
          <div className='report-content'>
            <div className='report-title'>
              Velocidad de ventas
            </div>
            <table>
              <thead>
                <tr>
                  <td />
                  <td>Meses</td>
                  <td>Unidades</td>
                  <td>Velocidad</td>
                  <td>Precio</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Preventas</td>
                  <td>6</td>
                  <td>40</td>
                  <td>8,0</td>
                  <td>328.092</td>
                </tr>
                <tr>
                  <td>Construcción</td>
                  <td>8</td>
                  <td>30</td>
                  <td>4.4</td>
                  <td>336.600</td>
                </tr>
                <tr>
                  <td>Liquidación</td>
                  <td>8</td>
                  <td>10</td>
                  <td>4.4</td>
                  <td>336.600</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>22</td>
                  <td>80</td>
                  <td>5,7</td>
                  <td>340.687</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='report-graph'>
            <ReactHighcharts
              config={{
                chart: {
                  type: 'pie'
                },
                title: {
                  text: 'Ventas'
                },
                series: [
                  {
                    name: 'Ventas',
                    data: [
                      {
                        name: 'Preventas',
                        y: 40
                      },
                      {
                        name: 'Construcción',
                        y: 30
                      },
                      {
                        name: 'Liquidación',
                        y: 10
                      }
                    ]
                  }
                ]
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
