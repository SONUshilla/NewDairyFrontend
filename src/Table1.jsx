import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const Table1 = ({ work, timing }) => {
  const [loadingStates, setLoadingStates] = useState(new Array(work.length).fill(false));
  const [sentStates, setSentStates] = useState(new Array(work.length).fill(false));
  const classes = useStyles();

  async function handleClick(e, index, timeOfDay) {
    e.preventDefault();
    const newLoadingStates = [...loadingStates];
    newLoadingStates[index] = true;
    setLoadingStates(newLoadingStates);
    const formData = new FormData(e.target);

    try {
      const response = await axios.post(`/entries/${timeOfDay}`, {
        date: formData.get("date"),
        weight: formData.get("weight"),
        fat: formData.get("fat"),
        price: formData.get("price"),
      });
      console.log(response.data);
      const newSentStates = [...sentStates];
      newSentStates[index] = true;
      setSentStates(newSentStates);
    } catch (error) {
      console.error("Error sending request:", error);
    } finally {
      newLoadingStates[index] = false;
      setLoadingStates(newLoadingStates);
    }
  }

  return (
    <div className="Table1c">
      <div className="Header">
        <p>Date</p>
        <p>Weight</p>
        <p>Fat</p>
        <p>Price</p>
        <p>Action</p>
      </div>
      <div className="Rows">
        {work.map((item, index) => (
          <div key={`row-${index}`}>
            <form className="formTable" onSubmit={(e) => handleClick(e, index, timing)}>
              <input name="date" key={`date-${index}`} value={item} readOnly />
              <input
                name="weight"
                key={`weight-${index}`}
                placeholder="Kg"
                required
                pattern="[0-9]+(\.[0-9]+)?"
              />
              <input
                name="fat"
                key={`fat-${index}`}
                required
                pattern="[0-9]+(\.[0-9]+)?"
              />
              <input
                name="price"
                key={`price-${index}`}
                value="75"
                style={{ color: "purple" }}
                pattern="[0-9]+(\.[0-9]+)?"
              />
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: sentStates[index] ? "green" : loadingStates[index] ? "gray" : "blue",
                  color: "white",
                  position: "relative",
                }}
                disabled={loadingStates[index] || sentStates[index]}
              >
                {loadingStates[index] ? (
                  <CircularProgress size={20} color="inherit" className={classes.buttonProgress} />
                ) : sentStates[index] ? (
                  "Sent"
                ) : (
                  <>
                    Send
                    <span style={{ marginLeft: '5px' }}>{">"}</span>
                  </>
                )}
              </Button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table1;
