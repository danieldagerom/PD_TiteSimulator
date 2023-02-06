import { useState, useEffect } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";

const PlayersTable = (props) => {
  const { players, setPlayers } = props;
  const [headerCheckbox, setHeaderCheckbox] = useState(true);
  const [selectedColumn, setSelectedColumn] = useState('value');
  const [sortOrder, setSortOrder] = useState('asc');

  const columns = [
    { key: "name", label: "Nome" },
    { key: "overall", label: "Geral" },
    { key: "value", label: "Valor" },
  ]

  // sorting

  useEffect(() => {
    // TODO
    // setPlayers(newList);
  }, [selectedColumn, sortOrder]);

  const getIconClassName = (column) => column === selectedColumn ? `icon-${sortOrder}` : `icon-off`;

  const handleSortingChange = (column) => {
    let order = 'asc';

    if (column === selectedColumn) order = sortOrder === 'asc' ? 'desc' : 'asc';
    else setSelectedColumn(column);

    order !== sortOrder && setSortOrder(order);
  }

  // select player

  useEffect(() => {
    let allSelected = true;
    players?.forEach(player => { if (!player.selected) allSelected = false });

    !allSelected && headerCheckbox && setHeaderCheckbox(false);
    allSelected && !headerCheckbox && setHeaderCheckbox(true);
  }, [players, headerCheckbox]);

  const setPlayerSelected = (value) => {
    const newList = players.map(player => ({ ...player, selected: value }));
    setPlayers(newList);
  }

  const handleHeaderCheckbox = () => {
    setPlayerSelected(!headerCheckbox);
    setHeaderCheckbox(!headerCheckbox);
  };

  const handlePlayerCheckbox = (playerId) => {
    const newList = players.map(player => {
      return player.id === playerId ? { ...player, selected: !player.selected } : player
    })
    setPlayers(newList);
  };

  // renders

  const renderHeader = columns.map(({ key, label }) => (
    <th key={key} onClick={() => handleSortingChange(key)}>
      {label}
      <BsFillCaretDownFill className={`sort-icon ${getIconClassName(key)}`} />
    </th>
  ));

  const renderPlayers = players?.map((player, index) => (
    <tr key={`player-${index}`}>
      <td>
        <div className="form-check">
          <input className="form-check-input position-static" type="checkbox" checked={player.selected} onChange={() => handlePlayerCheckbox(player.id)} />
        </div>
      </td>
      <td className="col-6">{player.name}</td>
      <td className="col-3">{player.overall}</td>
      <td className="col-3">{player.value}</td>
    </tr>
  ));

  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <div className="form-check">
              <input className="form-check-input position-static" type="checkbox" checked={headerCheckbox} onChange={handleHeaderCheckbox} />
            </div>
          </th>
          {renderHeader}
        </tr>
      </thead>
      <tbody>
        {renderPlayers}
      </tbody>
    </table>
  )
}

export default PlayersTable;