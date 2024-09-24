import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// Special design for Todos component.
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function TodoFormComponent(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TextField
                label="Task"
                variant="outlined"
                value={props.task}
                onChange={(e) => props.onTaskChange(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={props.onSubmit}>
                Add Task
            </Button>
        </div>
    );
}

export default TodoFormComponent;
