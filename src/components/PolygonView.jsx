import { Popup, Polygon } from 'react-leaflet';

export const PolygonView = ({ props }) => {
  const { _id, coords, color, name, mouseOverColor, info } = props;

  return (
    <Polygon
      key={_id}
      pathOptions={{
        fillColor: color,
        fillOpacity: 0.3,
        weight: 2,
        opacity: 1,
        dashArray: 3,
        color: 'white',
      }}
      positions={coords}
      eventHandlers={{
        mouseover: (e) => {
          const layer = e.target;
          layer.setStyle({
            fillOpacity: 0.7,
            weight: 5,
            dashArray: '',
            color: '#666',
            fillColor: mouseOverColor,
          });
        },
        mouseout: (e) => {
          const layer = e.target;
          layer.setStyle({
            fillOpacity: 0.3,
            weight: 2,
            dashArray: '3',
            color: 'white',
            fillColor: color,
          });
        },
      }}
    >
      <Popup>
        <div>
          <p>{`Municipio: ${name}`}</p>
          <p>{`Presión del agua: ${info}`}</p>
        </div>
      </Popup>
    </Polygon>
  );
};
