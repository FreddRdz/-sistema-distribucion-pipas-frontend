import axios from 'axios';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export const TableBodyAdd = ({ props }) => {
  const { cityId, listCityPipes, pipes, setPipes, setListCityPipes } = props;

  const alertSuccesful = (pipeId) => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Pipa añadida correctamente!',
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      setPipes(pipes.filter((pipe) => pipe._id !== pipeId));
      const pipeFiltered = pipes.find((pipe) => pipe._id === pipeId);
      setListCityPipes([...listCityPipes, pipeFiltered]);
    });
  };

  const handleAddPipe = async (pipeId) => {
    const res = await axios.put(
      'http://localhost:5050/api/v1/cities/add/pipe/' + cityId + '/' + pipeId,
      {
        headers: { Authorization: localStorage.getItem('TokenKey') },
      }
    );
    if (res.status === 200) {
      alertSuccesful(pipeId);
    }
  };
  return (
    <>
      {pipes.map(({ _id, placas, percentageWater, capacity }) => {
        return (
          <tr key={_id}>
            <th>{placas}</th>
            <th>{capacity}</th>
            <th>{percentageWater}</th>
            <th>
              <Button variant='primary' onClick={() => handleAddPipe(_id)}>
                Agregar
              </Button>
            </th>
          </tr>
        );
      })}
    </>
  );
};
