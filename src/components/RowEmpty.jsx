export const RowEmpty = ({ props }) => {
  const { text } = props;
  return (
    <tr>
      <th colSpan={4}>
        <h3 className='mt-3 mb-3 text-center'>{text}</h3>
      </th>
    </tr>
  );
};
