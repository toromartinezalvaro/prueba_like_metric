import React from "react";
import { ResponsivePie } from "@nivo/pie";
import styles from "../pie/pie.module.scss";
import RadialLabel from "../radialLabel/radialLabel"

const pie = props => {
  var items = []
  items = areas => {
    console.log(areas)
    return areas.map(area => {
      return  { id: area.id,
        label: area.areaType.name,
        value: area.measure,
        price: "$" + area.unitPrice }
    })
  }

  const data = items(props.areas)

  const margin = { top: 0, right: 100, bottom: 35, left: 80 };

  const styles = {
    root: {
      fontFamily: "Roboto",
      textAlign: "center",
      position: "relative",
      width: 450,
      height: 450
    },
    overlay: {
      position: "absolute",
      top: 0,
      right: margin.right,
      bottom: 30,
      left: margin.left,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 40,
      // background: "#FFFFFF33",
      textAlign: "center",
      // This is important to preserve the chart interactivity
      pointerEvents: "none"
    },
    totalLabel: {
      fontSize: 24
    }
  };

  //? for Legends
  // const legends = [
  //   {
  //     anchor: "right",
  //     direction: "column",
  //     justify: false,
  //     translateX: 140,
  //     translateY: 0,
  //     itemsSpacing: 2,
  //     itemWidth: 100,
  //     itemHeight: 20,
  //     itemDirection: "left-to-right",
  //     itemOpacity: 0.85,
  //     itemTextColor: "#ffffff",
  //     symbolSize: 20,
  //     effects: [
  //       {
  //         on: "hover",
  //         style: {
  //           itemOpacity: 1
  //         }
  //       }
  //     ]
  //   }
  // ];


  return (
    <div style={styles.root}>
      <ResponsivePie
        margin={margin}
        data={data}
        innerRadius={0.5}
        enableRadialLabels={true}
        enableSlicesLabels={true}
        defs={[
          {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              size: 4,
              padding: 1,
              stagger: true
          },
          {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
          }
      ]}
        fill={[
          {
              match: {
                  id: 'Prima'
              },
              id: 'dots'
          }]}
        radialLabel={d => (
          <RadialLabel object={d} print={true}></RadialLabel>
        )} />
      <div style={styles.overlay}>
        <span>{props.nomenclature}</span>
      </div>
    </div>
  );
};

export default pie;
