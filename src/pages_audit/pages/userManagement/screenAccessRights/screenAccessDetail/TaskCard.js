import { makeStyles } from "@mui/styles";
import { Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles((theme) => ({
  TaskInformation: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "0 15px",
    minHeight: "45px",
    cursor: "pointer",
    borderRadius: "5px",
    // maxWidth: "311px",
    background: "rgb(84 34 34)",
    // background: "rgb(169 53 53)",
    marginBottom: "8px",
    color: "White",
  },
}));

const TaskCard = ({
  item,
  index,
  withOutDraggble,
  setColumns,
  productData,
  setProductData,
  columnsFromBackend,
  setFilteredColumns,
  setSearchQuery,
}) => {
  const classes = useStyles();

  return (
    <>
      {withOutDraggble ? (
        <div
          onClick={() => {
            setProductData({
              ...productData,
              CODE: item.CODE,
            });
            const data = productData.data[item.CODE];
            let setCol = {
              ...columnsFromBackend,
              PENDING_ACCESS: {
                ...columnsFromBackend.PENDING_ACCESS,
                items: data.PENDING_ACCESS,
              },
              CURRENT_ACCESS: {
                ...columnsFromBackend.CURRENT_ACCESS,
                items: data.CURRENT_ACCESS,
              },
            };

            setColumns(setCol);

            setFilteredColumns(setCol);
            //Remove Search Values
            setSearchQuery({
              PENDING_ACCESS: "",
              CURRENT_ACCESS: "",
            });
          }}
        >
          <div className={classes.TaskInformation}>
            <p>{item.NAME}</p>
          </div>
        </div>
      ) : (
        <Draggable
          key={item.CODE}
          draggableId={item.CODE}
          index={index}
          data={item}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div
                className={classes.TaskInformation}
                style={{ background: item.COLOR }}
              >
                <p>{item.CODE + "-" + item.NAME}</p>
              </div>
            </div>
          )}
        </Draggable>
      )}
    </>
  );
};

export default TaskCard;

// <span className="priority">
// {item.Priority === 'High' ? (<RedArrow />) : item.Priority === 'Medium' ? (<YellowArrow />) : (<BlueArrow />)}
// </span>
// <div><CustomAvatar name={item.Assignee} isTable={false} size={16} /></div>
