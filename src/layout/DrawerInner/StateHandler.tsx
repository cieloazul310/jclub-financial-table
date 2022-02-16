import * as React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Switch from '@mui/material/Switch';
import { useAppState, useDispatch } from '../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';

function StateHandler() {
  const { displayFullAttd, listMode } = useAppState();
  const dispatch = useDispatch();
  const toggleListMode = () => {
    dispatch({ type: 'TOGGLE_LISTMODE' });
  };
  const toggleFullAttd = () => {
    dispatch({ type: 'TOGGLE_FULL_ATTD' });
  };
  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <List subheader={<ListSubheader>設定</ListSubheader>}>
      <ListItem>
        <ListItemText primary="リストモード" />
        <ListItemSecondaryAction>
          <Switch edge="end" checked={listMode} onChange={toggleListMode} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemText primary="詳細な観客数を表示" />
        <ListItemSecondaryAction>
          <Switch edge="end" checked={displayFullAttd} onChange={toggleFullAttd} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button onClick={reset}>
        <ListItemText primary="設定をリセット" />
      </ListItem>
    </List>
  );
}

export default StateHandler;
