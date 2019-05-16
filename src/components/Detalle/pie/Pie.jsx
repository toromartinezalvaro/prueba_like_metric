import React from "react";
import { ResponsivePieCanvas } from "@nivo/pie";
import styles from "../pie/pie.module.scss"

const pie = props => {
  const data = [
    {
      id: "sass",
      label: "101",
      value: 318,
      color: "hsl(7, 70%, 50%)"
    },
    {
      id: "elixir",
      label: "elixir",
      value: 347,
      color: "hsl(122, 70%, 50%)"
    },
    {
      id: "scala",
      label: "scala",
      value: 594,
      color: "hsl(141, 70%, 50%)"
    },
    {
      id: "make",
      label: "make",
      value: 155,
      color: "hsl(220, 70%, 50%)"
    },
    {
      id: "rust",
      label: "rust",
      value: 562,
      color: "hsl(356, 70%, 50%)"
    },
    {
      id: "ruby",
      label: "ruby",
      value: 81,
      color: "hsl(291, 70%, 50%)"
    },
    {
      id: "hack",
      label: "hack",
      value: 300,
      color: "hsl(65, 70%, 50%)"
    },
    {
      id: "go",
      label: "go",
      value: 421,
      color: "hsl(241, 70%, 50%)"
    },
    {
      id: "erlang",
      label: "erlang",
      value: 319,
      color: "hsl(307, 70%, 50%)"
    },
    {
      id: "haskell",
      label: "haskell",
      value: 55,
      color: "hsl(231, 70%, 50%)"
    },
    {
      id: "stylus",
      label: "stylus",
      value: 5,
      color: "hsl(139, 70%, 50%)"
    },
    {
      id: "php",
      label: "php",
      value: 363,
      color: "hsl(324, 70%, 50%)"
    },
    {
      id: "lisp",
      label: "lisp",
      value: 282,
      color: "hsl(206, 70%, 50%)"
    },
    {
      id: "java",
      label: "java",
      value: 349,
      color: "hsl(44, 70%, 50%)"
    },
    {
      id: "Interior",
      label: "Interior",
      value: 584,
      color: "hsl(322, 70%, 50%)"
    },
    {
      id: "css",
      label: "css",
      value: 90,
      color: "hsl(283, 70%, 50%)"
    },
    {
      id: "c",
      label: "c",
      value: 25,
      color: "hsl(332, 70%, 50%)"
    },
    {
      id: "python",
      label: "python",
      value: 485,
      color: "hsl(149, 70%, 50%)"
    }
  ];

  const MyResponsivePieCanvas = props => {
    return (
      <ResponsivePieCanvas
        data={props.data}
        width={500}
        height={500}
        sortByValue={true}
        margin={{ top: 40, right: 125, bottom: 40, left: 125 }}
        pixelRatio={1.25}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "paired" }}
        borderColor={{ from: "color", modifiers: [["darker", 0.6]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        sliceLabel={function(e){return e.id+" ("+e.value+")"}}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: "color" }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        fill={[
          {
            match: {
              id: "ruby"
            },
            id: "dots"
          },
          {
            match: {
              id: "c"
            },
            id: "dots"
          },
          {
            match: {
              id: "go"
            },
            id: "dots"
          },
          {
            match: {
              id: "python"
            },
            id: "dots"
          },
          {
            match: {
              id: "scala"
            },
            id: "lines"
          },
          {
            match: {
              id: "lisp"
            },
            id: "lines"
          },
          {
            match: {
              id: "elixir"
            },
            id: "lines"
          },
          {
            match: {
              id: "javascript"
            },
            id: "lines"
          }
        ]}
        legends={[
          {
            anchor: "right",
            direction: "column",
            translateX: 140,
            itemWidth: 60,
            itemHeight: 14,
            itemsSpacing: 2,
            symbolSize: 15,
            symbolShape: "circle"
          }
        ]}
      />
    );
  };

  return (
    <div style={{ height: "505px", width: "500px" }} className={styles.Container} >
      <MyResponsivePieCanvas data={data} className={styles.Row}/>
    </div>
  );
};

export default pie;
