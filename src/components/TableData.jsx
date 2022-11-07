import axios from 'axios';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export const TableData = ({ props }) => {
  const { cityId, listCityPipes, pipes, setPipes, setListCityPipes } = props;
  const pipesList = props.listCityPipes;

  const alertSuccesful = (pipeId) => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Pipa eliminada correctamente!',
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      setListCityPipes(listCityPipes.filter((pipe) => pipe._id !== pipeId));
      const pipeFiltered = listCityPipes.find((pipe) => pipe._id === pipeId);
      setPipes([...pipes, pipeFiltered]);
    });
  };

  const handleDeletePipe = async (pipeId) => {
    const res = await axios.delete(
      'https://sistema-nl-agua.herokuapp.com/api/v1/cities/delete/pipe/' +
        cityId +
        '/' +
        pipeId,
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
      {pipesList.map(({ _id, placas, percentageWater, capacity }) => {
        return (
          <tr key={_id}>
            <th>{placas}</th>
            <th>{capacity}</th>
            <th>{percentageWater}</th>
            <th>
              <Button variant='danger' onClick={() => handleDeletePipe(_id)}>
                Eliminar
              </Button>
            </th>
          </tr>
        );
      })}
    </>
  );
};
