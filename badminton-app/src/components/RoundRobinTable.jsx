import PropTypes from 'prop-types';
import { Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';

const RoundRobinTable = ({ participants }) => {
  const renderMatches = () => {
    const matches = [];
    for (let i = 0; i < participants.length; i++) {
      for (let j = i + 1; j < participants.length; j++) {
        matches.push(
          <TableRow key={`${i}-${j}`}>
            <TableCell>{participants[i]}</TableCell>
            <TableCell>vs</TableCell>
            <TableCell>{participants[j]}</TableCell>
          </TableRow>
        );
      }
    }
    return matches;
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Participant 1</TableCell>
          <TableCell></TableCell>
          <TableCell>Participant 2</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{renderMatches()}</TableBody>
    </Table>
  );
};

RoundRobinTable.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RoundRobinTable;
