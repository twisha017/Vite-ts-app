import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, IconButton, Checkbox } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Department } from '../types';

interface DepartmentListProps {
  departments: Department[];
}

const DepartmentList: React.FC<DepartmentListProps> = ({ departments }) => {
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({});

  const handleClick = (id: number) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id],
    }));
  };

  const handleToggle = (id: string, subDepartmentIds?: string[]) => () => {
    const newChecked = { ...checked, [id]: !checked[id] };

    // Toggle all sub-departments when the parent department is toggled
    if (subDepartmentIds) {
      subDepartmentIds.forEach(subDeptId => {
        newChecked[subDeptId] = !checked[id];
      });
    }

    // Check if all sub-departments of a department are selected
    if (!subDepartmentIds) {
      const parentId = id.split('-')[1];
      const parentDept = departments.find(dept => dept.id.toString() === parentId);
      if (parentDept) {
        const allSelected = parentDept.subDepartments.every(subDept => newChecked[`sub-${subDept.id}`]);
        newChecked[`dept-${parentId}`] = allSelected;
      }
    }

    setChecked(newChecked);
  };

  return (
    <List>
      {departments.map((department) => (
        <div key={department.id}>
          <ListItem button onClick={() => handleClick(department.id)}>
            <Checkbox
              edge="start"
              checked={checked[`dept-${department.id}`] || false}
              tabIndex={-1}
              disableRipple
              onChange={handleToggle(`dept-${department.id}`, department.subDepartments.map(subDept => `sub-${subDept.id}`))}
            />
            <ListItemText primary={department.name} />
            <IconButton edge="end">
              {open[department.id] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          <Collapse in={open[department.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments.map((subDept) => (
                <ListItem key={subDept.id} style={{ paddingLeft: 32 }}>
                  <Checkbox
                    edge="start"
                    checked={checked[`sub-${subDept.id}`] || false}
                    tabIndex={-1}
                    disableRipple
                    onChange={handleToggle(`sub-${subDept.id}`)}
                  />
                  <ListItemText primary={subDept.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;
