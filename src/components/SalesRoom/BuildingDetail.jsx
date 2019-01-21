import React from 'react'

export const BuildingDetails = ({ buildings }) => {

    function cellOnClick(property) {
        
        console.log("testing--- "+property)
    }

    const cells = buildings.map(floors => {
        return (<table className="cash-flow">
            <thead>
                <tr>
                    {floors["name"]}
                </tr>
            </thead>
            <tbody>
                {
                    floors["floors"].map(floor => {
                        return (<tr>
                            <td>{floor["floor"]}</td>
                            {
                                floor["properties"].map(property => {
                                    return (
                                        <td key={property+"_"+floor["floor"]}>
                                           <a href={property} >{property}</a> 
                                        </td>
                                    )
                                })
                            }
                        </tr>)
                    })
                }
            </tbody>
        </table>)
    });

    return (
        <div className=''>
            {
                cells
            }
        </div>
    )
}

