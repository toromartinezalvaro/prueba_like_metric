import React from 'react';
import { ResponsiveBubble } from '@nivo/circle-packing';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import styles from './PropertiesGraph.module.scss';

const propertiesGraph = ({ ...rest }) => {
  const root = {
    name: 'Total',
    children: [
      {
        name: 'Tipo 1',
        children: [
          {
            id: 271,
            name: '1101',
            location: 1,
            floor: 11,
            typeArea: 'Tipo 2',
            typePrice: 'Tipo 4',
            createdAt: '2019-06-03T20:42:45.379Z',
            updatedAt: '2019-06-08T00:08:25.223Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 278,
            name: '1203',
            location: 3,
            floor: 12,
            typeArea: 'Tipo 2',
            typePrice: 'Tipo 4',
            createdAt: '2019-06-03T20:42:58.200Z',
            updatedAt: '2019-06-08T00:08:25.223Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 266,
            name: '903',
            location: 3,
            floor: 9,
            typeArea: 'Tipo 2',
            typePrice: 'Tipo 4',
            createdAt: '2019-06-03T20:42:14.736Z',
            updatedAt: '2019-06-08T00:08:25.223Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 270,
            name: '1002',
            location: 2,
            floor: 10,
            typeArea: 'Tipo 2',
            typePrice: 'Tipo 4',
            createdAt: '2019-06-03T20:42:30.837Z',
            updatedAt: '2019-06-08T00:08:25.223Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 273,
            name: '1103',
            location: 3,
            floor: 11,
            typeArea: 'Tipo 2',
            typePrice: 'Tipo 4',
            createdAt: '2019-06-03T20:42:47.676Z',
            updatedAt: '2019-06-08T00:08:25.223Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 269,
            name: '1001',
            location: 1,
            floor: 10,
            typeArea: 'Tipo 2',
            typePrice: 'Tipo 4',
            createdAt: '2019-06-03T20:42:21.833Z',
            updatedAt: '2019-06-08T00:08:25.223Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 246,
            name: '204',
            location: 4,
            floor: 2,
            typeArea: 'Tipo 2',
            typePrice: 'Tipo 1',
            createdAt: '2019-06-03T20:41:26.219Z',
            updatedAt: '2019-06-08T00:08:25.223Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 245,
            name: '203',
            location: 3,
            floor: 2,
            typeArea: 'Tipo 2',
            typePrice: 'Tipo 4',
            createdAt: '2019-06-03T20:41:23.905Z',
            updatedAt: '2019-06-08T00:08:25.223Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 249,
            name: '303',
            location: 3,
            floor: 3,
            typeArea: 'Tipo 2',
            typePrice: 'Tipo 4',
            createdAt: '2019-06-03T20:41:31.266Z',
            updatedAt: '2019-06-08T00:08:25.223Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 250,
            name: '304',
            location: 4,
            floor: 3,
            typeArea: 'Tipo 2',
            typePrice: 'Tipo 4',
            createdAt: '2019-06-03T20:41:32.661Z',
            updatedAt: '2019-06-08T00:08:25.223Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 253,
            name: '403',
            location: 3,
            floor: 4,
            typeArea: 'Tipo 2',
            typePrice: 'Tipo 4',
            createdAt: '2019-06-03T20:41:37.947Z',
            updatedAt: '2019-06-08T00:08:25.223Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 254,
            name: '404',
            location: 4,
            floor: 4,
            typeArea: 'Tipo 2',
            typePrice: 'Tipo 4',
            createdAt: '2019-06-03T20:41:38.621Z',
            updatedAt: '2019-06-08T00:08:25.223Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 264,
            name: '901',
            location: 1,
            floor: 9,
            typeArea: 'Tipo 2',
            typePrice: 'Tipo 4',
            createdAt: '2019-06-03T20:42:13.022Z',
            updatedAt: '2019-06-08T00:08:25.223Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 276,
            name: '1201',
            location: 1,
            floor: 12,
            typeArea: 'Tipo 2',
            typePrice: 'Tipo 4',
            createdAt: '2019-06-03T20:42:55.596Z',
            updatedAt: '2019-06-08T00:08:25.223Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 244,
            name: '202',
            location: 2,
            floor: 2,
            typeArea: 'Tipo 2',
            typePrice: 'Tipo 4',
            createdAt: '2019-06-03T20:41:19.329Z',
            updatedAt: '2019-06-08T00:08:25.223Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 248,
            name: '302',
            location: 2,
            floor: 3,
            typeArea: 'Tipo 2',
            typePrice: 'Tipo 4',
            createdAt: '2019-06-03T20:41:30.466Z',
            updatedAt: '2019-06-08T00:08:25.223Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 252,
            name: '402',
            location: 2,
            floor: 4,
            typeArea: 'Tipo 2',
            typePrice: 'Tipo 4',
            createdAt: '2019-06-03T20:41:37.158Z',
            updatedAt: '2019-06-08T00:08:25.223Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
        ],
      },
      {
        name: 'Tipo 2',
        children: [
          {
            id: 268,
            name: '905',
            location: 5,
            floor: 9,
            typeArea: 'Tipo 3',
            typePrice: 'Tipo 1',
            createdAt: '2019-06-03T20:42:18.287Z',
            updatedAt: '2019-06-08T00:08:25.224Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 255,
            name: '501',
            location: 1,
            floor: 5,
            typeArea: 'Tipo 3',
            typePrice: 'Tipo 3',
            createdAt: '2019-06-03T20:41:45.474Z',
            updatedAt: '2019-06-08T00:08:25.224Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 257,
            name: '601',
            location: 1,
            floor: 6,
            typeArea: 'Tipo 3',
            typePrice: 'Tipo 3',
            createdAt: '2019-06-03T20:41:51.723Z',
            updatedAt: '2019-06-08T00:08:25.224Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 259,
            name: '701',
            location: 1,
            floor: 7,
            typeArea: 'Tipo 3',
            typePrice: 'Tipo 3',
            createdAt: '2019-06-03T20:41:55.094Z',
            updatedAt: '2019-06-08T00:08:25.224Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 262,
            name: '801',
            location: 1,
            floor: 8,
            typeArea: 'Tipo 3',
            typePrice: 'Tipo 3',
            createdAt: '2019-06-03T20:42:05.941Z',
            updatedAt: '2019-06-08T00:08:25.224Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 256,
            name: '502',
            location: 2,
            floor: 5,
            typeArea: 'Tipo 3',
            typePrice: 'Tipo 3',
            createdAt: '2019-06-03T20:41:46.243Z',
            updatedAt: '2019-06-08T00:08:25.224Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 258,
            name: '602',
            location: 2,
            floor: 6,
            typeArea: 'Tipo 3',
            typePrice: 'Tipo 3',
            createdAt: '2019-06-03T20:41:52.836Z',
            updatedAt: '2019-06-08T00:08:25.224Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 260,
            name: '702',
            location: 2,
            floor: 7,
            typeArea: 'Tipo 3',
            typePrice: 'Tipo 3',
            createdAt: '2019-06-03T20:41:56.345Z',
            updatedAt: '2019-06-08T00:08:25.224Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 263,
            name: '802',
            location: 2,
            floor: 8,
            typeArea: 'Tipo 3',
            typePrice: 'Tipo 3',
            createdAt: '2019-06-03T20:42:07.741Z',
            updatedAt: '2019-06-08T00:08:25.224Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 265,
            name: '902',
            location: 2,
            floor: 9,
            typeArea: 'Tipo 3',
            typePrice: 'Tipo 3',
            createdAt: '2019-06-03T20:42:13.607Z',
            updatedAt: '2019-06-08T00:08:25.224Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 279,
            name: '1301',
            location: 1,
            floor: 13,
            typeArea: 'Tipo 3',
            typePrice: 'Tipo 3',
            createdAt: '2019-06-03T20:43:04.120Z',
            updatedAt: '2019-06-08T00:08:25.224Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 275,
            name: '1105',
            location: 5,
            floor: 11,
            typeArea: 'Tipo 3',
            typePrice: 'Tipo 1',
            createdAt: '2019-06-03T20:42:51.453Z',
            updatedAt: '2019-06-08T00:08:25.224Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 282,
            name: '1402',
            location: 2,
            floor: 14,
            typeArea: 'Tipo 3',
            typePrice: 'Tipo 1',
            createdAt: '2019-06-03T20:43:12.350Z',
            updatedAt: '2019-06-08T00:08:25.224Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 280,
            name: '1302',
            location: 2,
            floor: 13,
            typeArea: 'Tipo 3',
            typePrice: 'Tipo 3',
            createdAt: '2019-06-03T20:43:05.576Z',
            updatedAt: '2019-06-08T00:08:25.224Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 281,
            name: '1401',
            location: 1,
            floor: 14,
            typeArea: 'Tipo 3',
            typePrice: 'Tipo 3',
            createdAt: '2019-06-03T20:43:07.363Z',
            updatedAt: '2019-06-08T00:08:25.224Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
        ],
      },
      {
        name: 'Tipo 3',
        children: [
          {
            id: 277,
            name: '1202',
            location: 2,
            floor: 12,
            typeArea: 'Tipo 1',
            typePrice: 'Tipo 1',
            createdAt: '2019-06-03T20:42:57.038Z',
            updatedAt: '2019-06-08T00:08:25.222Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 267,
            name: '904',
            location: 4,
            floor: 9,
            typeArea: 'Tipo 1',
            typePrice: 'Tipo 4',
            createdAt: '2019-06-03T20:42:15.786Z',
            updatedAt: '2019-06-08T00:08:25.222Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 274,
            name: '1104',
            location: 4,
            floor: 11,
            typeArea: 'Tipo 1',
            typePrice: 'Tipo 4',
            createdAt: '2019-06-03T20:42:48.836Z',
            updatedAt: '2019-06-08T00:08:25.222Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 247,
            name: '301',
            location: 1,
            floor: 3,
            typeArea: 'Tipo 1',
            typePrice: 'Tipo 4',
            createdAt: '2019-06-03T20:41:29.792Z',
            updatedAt: '2019-06-08T00:08:25.222Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 251,
            name: '401',
            location: 1,
            floor: 4,
            typeArea: 'Tipo 1',
            typePrice: 'Tipo 4',
            createdAt: '2019-06-03T20:41:35.441Z',
            updatedAt: '2019-06-08T00:08:25.222Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 243,
            name: '20001',
            location: 1,
            floor: 2,
            typeArea: 'Tipo 1',
            typePrice: 'Tipo 1',
            createdAt: '2019-06-03T20:41:18.250Z',
            updatedAt: '2019-06-08T00:36:05.901Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
          {
            id: 272,
            name: '1102',
            location: 2,
            floor: 11,
            typeArea: 'Tipo 1',
            typePrice: 'Tipo 4',
            createdAt: '2019-06-03T20:42:46.559Z',
            updatedAt: '2019-06-08T00:08:25.222Z',
            towerId: 'a6018590-863f-11e9-a12e-bb3415b486a8',
          },
        ],
      },
      {name: "Tipo", children:[  {
        "id": 261,
        "name": "703",
        "location": 1,
        "floor": 8,
        "typeArea": "Tipo 4",
        "typePrice": "Tipo 2",
        "createdAt": "2019-06-03T20:41:59.546Z",
        "updatedAt": "2019-06-08T00:08:25.224Z",
        "towerId": "a6018590-863f-11e9-a12e-bb3415b486a8"
      },
      {
        "id": 287,
        "name": "",
        "location": 3,
        "floor": 8,
        "typeArea": "Tipo 4",
        "typePrice": "Tipo 2",
        "createdAt": "2019-06-04T16:06:08.822Z",
        "updatedAt": "2019-06-08T00:08:25.224Z",
        "towerId": "a6018590-863f-11e9-a12e-bb3415b486a8"
      },
      {
        "id": 288,
        "name": "",
        "location": 4,
        "floor": 8,
        "typeArea": "Tipo 4",
        "typePrice": "Tipo 2",
        "createdAt": "2019-06-04T16:06:15.451Z",
        "updatedAt": "2019-06-08T00:08:25.224Z",
        "towerId": "a6018590-863f-11e9-a12e-bb3415b486a8"
      },
      {
        "id": 286,
        "name": " ",
        "location": 3,
        "floor": 8,
        "typeArea": "Tipo 4",
        "typePrice": "Tipo 2",
        "createdAt": "2019-06-04T16:06:06.165Z",
        "updatedAt": "2019-06-08T00:08:25.224Z",
        "towerId": "a6018590-863f-11e9-a12e-bb3415b486a8"
      }]}
    ],
  };

  return (
    <Card>
      <CardHeader>
        <span>Gráfica de propiedades</span>
      </CardHeader>
      <CardBody>
        <div className={styles.GraphContainer}>
          <div className={styles.root}>
            <div>Agrupamiento por area</div>
            <ResponsiveBubble
              root={root}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              identity="name"
              value="floor"
              colors={{ scheme: 'blues' }}
              width={300}
              height={300}
              padding={6}
              labelTextColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
              borderWidth={2}
              borderColor={{ from: 'color' }}
              defs={[
                {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'none',
                  color: 'inherit',
                  rotation: -45,
                  lineWidth: 5,
                  spacing: 8,
                },
              ]}
              fill={[{ match: { depth: 1 }, id: 'lines' }]}
              animate={true}
              motionStiffness={90}
              motionDamping={12}
            />
          </div>
          <div className={styles.root}>
            <div>Agrupamiento por precio</div>
            <ResponsiveBubble
              root={root}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              identity="name"
              value="area"
              colors={{ scheme: 'blues' }}
              width={300}
              height={300}
              padding={6}
              labelTextColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
              borderWidth={2}
              borderColor={{ from: 'color' }}
              defs={[
                {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'none',
                  color: 'inherit',
                  rotation: -45,
                  lineWidth: 5,
                  spacing: 8,
                },
              ]}
              fill={[{ match: { depth: 1 }, id: 'lines' }]}
              animate={true}
              motionStiffness={90}
              motionDamping={12}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default propertiesGraph;
